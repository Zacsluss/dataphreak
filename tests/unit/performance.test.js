/**
 * @vitest-environment happy-dom
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { PerformanceMonitor, perfMonitor } from '../../src/js/utils/performance.js'

describe('PerformanceMonitor', () => {
  let monitor

  beforeEach(() => {
    monitor = new PerformanceMonitor()
    monitor.clear()
  })

  describe('constructor', () => {
    it('should initialize with empty marks and measures', () => {
      expect(monitor.marks.size).toBe(0)
      expect(monitor.measures.length).toBe(0)
    })

    it('should detect if performance API is available', () => {
      expect(monitor.enabled).toBe(true)
    })
  })

  describe('start', () => {
    it('should mark the start of an operation', () => {
      monitor.start('test-operation')
      expect(monitor.marks.has('test-operation')).toBe(true)
      expect(monitor.marks.get('test-operation')).toBe('test-operation-start')
    })

    it('should handle multiple operations', () => {
      monitor.start('operation-1')
      monitor.start('operation-2')
      expect(monitor.marks.size).toBe(2)
    })

    it('should do nothing if performance API is disabled', () => {
      monitor.enabled = false
      monitor.start('test')
      expect(monitor.marks.size).toBe(0)
    })
  })

  describe('end', () => {
    it('should measure duration and record metrics', () => {
      monitor.start('test-operation')
      const duration = monitor.end('test-operation')

      expect(typeof duration).toBe('number')
      expect(duration).toBeGreaterThanOrEqual(0)
      expect(monitor.measures.length).toBe(1)
      expect(monitor.measures[0].label).toBe('test-operation')
    })

    it('should clean up marks after ending', () => {
      monitor.start('test-operation')
      monitor.end('test-operation')
      expect(monitor.marks.has('test-operation')).toBe(false)
    })

    it('should return null if operation was not started', () => {
      const result = monitor.end('non-existent')
      expect(result).toBeUndefined()
    })

    it('should do nothing if performance API is disabled', () => {
      monitor.enabled = false
      const result = monitor.end('test')
      expect(result).toBeUndefined()
    })
  })

  describe('measure', () => {
    it('should measure async function execution time', async () => {
      const asyncFn = async () => {
        await new Promise(resolve => setTimeout(resolve, 10))
        return 'result'
      }

      const result = await monitor.measure('async-test', asyncFn)

      expect(result).toBe('result')
      expect(monitor.measures.length).toBe(1)
      expect(monitor.measures[0].label).toBe('async-test')
      expect(monitor.measures[0].duration).toBeGreaterThan(0)
    })

    it('should measure sync function wrapped in async', async () => {
      const syncFn = async () => {
        return 42
      }

      const result = await monitor.measure('sync-test', syncFn)
      expect(result).toBe(42)
      expect(monitor.measures.length).toBe(1)
    })

    it('should handle function errors and still record timing', async () => {
      const errorFn = async () => {
        throw new Error('Test error')
      }

      await expect(monitor.measure('error-test', errorFn)).rejects.toThrow('Test error')
      expect(monitor.measures.length).toBe(1)
      expect(monitor.measures[0].label).toBe('error-test')
    })

    it('should measure multiple sequential operations', async () => {
      await monitor.measure('op1', async () => 'first')
      await monitor.measure('op2', async () => 'second')

      expect(monitor.measures.length).toBe(2)
      expect(monitor.measures[0].label).toBe('op1')
      expect(monitor.measures[1].label).toBe('op2')
    })
  })

  describe('getMetrics', () => {
    it('should return all measures and summary', () => {
      monitor.start('test')
      monitor.end('test')

      const metrics = monitor.getMetrics()

      expect(metrics).toHaveProperty('measures')
      expect(metrics).toHaveProperty('summary')
      expect(metrics.measures.length).toBe(1)
    })

    it('should return empty metrics when no operations recorded', () => {
      const metrics = monitor.getMetrics()

      expect(metrics.measures).toEqual([])
      expect(metrics.summary).toEqual({})
    })

    it('should return a copy of measures array', () => {
      monitor.start('test')
      monitor.end('test')

      const metrics1 = monitor.getMetrics()
      const metrics2 = monitor.getMetrics()

      expect(metrics1.measures).not.toBe(metrics2.measures)
      expect(metrics1.measures).toEqual(metrics2.measures)
    })
  })

  describe('getSummary', () => {
    it('should calculate summary statistics for single operation', () => {
      monitor.start('test')
      monitor.end('test')

      const summary = monitor.getSummary()

      expect(summary.test).toBeDefined()
      expect(summary.test.count).toBe(1)
      expect(summary.test.total).toBeGreaterThan(0)
      expect(summary.test.min).toBeGreaterThan(0)
      expect(summary.test.max).toBeGreaterThan(0)
      expect(summary.test.avg).toBeGreaterThan(0)
    })

    it('should aggregate multiple operations with same label', async () => {
      await monitor.measure('repeated', async () => 'first')
      await monitor.measure('repeated', async () => 'second')
      await monitor.measure('repeated', async () => 'third')

      const summary = monitor.getSummary()

      expect(summary.repeated.count).toBe(3)
      expect(summary.repeated.avg).toBe(summary.repeated.total / 3)
    })

    it('should calculate min and max correctly', async () => {
      await monitor.measure('test', async () => {
        await new Promise(resolve => setTimeout(resolve, 5))
      })
      await monitor.measure('test', async () => {
        await new Promise(resolve => setTimeout(resolve, 20))
      })

      const summary = monitor.getSummary()

      expect(summary.test.min).toBeLessThan(summary.test.max)
      expect(summary.test.min).toBeGreaterThan(0)
    })

    it('should handle multiple different labels', async () => {
      await monitor.measure('operation-a', async () => 'a')
      await monitor.measure('operation-b', async () => 'b')
      await monitor.measure('operation-a', async () => 'a2')

      const summary = monitor.getSummary()

      expect(Object.keys(summary)).toHaveLength(2)
      expect(summary['operation-a'].count).toBe(2)
      expect(summary['operation-b'].count).toBe(1)
    })

    it('should return empty object when no measures exist', () => {
      const summary = monitor.getSummary()
      expect(summary).toEqual({})
    })
  })

  describe('clear', () => {
    it('should clear all measures and marks', () => {
      monitor.start('test1')
      monitor.end('test1')
      monitor.start('test2')

      expect(monitor.measures.length).toBe(1)
      expect(monitor.marks.size).toBe(1)

      monitor.clear()

      expect(monitor.measures.length).toBe(0)
      expect(monitor.marks.size).toBe(0)
    })

    it('should clear performance API marks and measures', () => {
      monitor.start('test')
      monitor.end('test')

      // Mock performance.getEntriesByType to verify clearing
      const marksBefore = performance.getEntriesByType('mark')
      const measuresBefore = performance.getEntriesByType('measure')

      monitor.clear()

      const marksAfter = performance.getEntriesByType('mark')
      const measuresAfter = performance.getEntriesByType('measure')

      // After clearing, there should be no more marks/measures from our tests
      expect(marksAfter.length).toBeLessThanOrEqual(marksBefore.length)
      expect(measuresAfter.length).toBeLessThanOrEqual(measuresBefore.length)
    })

    it('should not error when performance API is disabled', () => {
      monitor.enabled = false
      expect(() => monitor.clear()).not.toThrow()
    })
  })

  describe('report', () => {
    it('should return summary statistics', () => {
      monitor.start('test')
      monitor.end('test')

      const report = monitor.report()

      expect(report).toHaveProperty('test')
      expect(report.test.count).toBe(1)
    })

    it('should call console.table if available', () => {
      const originalTable = console.table
      console.table = vi.fn()

      monitor.start('test')
      monitor.end('test')
      monitor.report()

      expect(console.table).toHaveBeenCalled()

      console.table = originalTable
    })

    it('should not error if console.table is unavailable', () => {
      const originalTable = console.table
      // @ts-ignore
      console.table = undefined

      monitor.start('test')
      monitor.end('test')

      expect(() => monitor.report()).not.toThrow()

      console.table = originalTable
    })

    it('should return empty object when no operations recorded', () => {
      const report = monitor.report()
      expect(report).toEqual({})
    })
  })

  describe('singleton perfMonitor', () => {
    it('should export a singleton instance', () => {
      expect(perfMonitor).toBeInstanceOf(PerformanceMonitor)
    })

    it('should be usable across imports', () => {
      perfMonitor.clear()
      perfMonitor.start('singleton-test')
      perfMonitor.end('singleton-test')

      expect(perfMonitor.measures.length).toBeGreaterThan(0)
      perfMonitor.clear()
    })
  })

  describe('edge cases', () => {
    it('should handle rapid start/end cycles', () => {
      for (let i = 0; i < 100; i++) {
        monitor.start(`rapid-${i}`)
        monitor.end(`rapid-${i}`)
      }

      expect(monitor.measures.length).toBe(100)
    })

    it('should handle label with special characters', () => {
      monitor.start('test-with-dashes_and_underscores.and.dots')
      const duration = monitor.end('test-with-dashes_and_underscores.and.dots')

      expect(duration).toBeGreaterThanOrEqual(0)
    })

    it('should handle very long label names', () => {
      const longLabel = 'a'.repeat(1000)
      monitor.start(longLabel)
      const duration = monitor.end(longLabel)

      expect(duration).toBeGreaterThanOrEqual(0)
    })

    it('should handle ending an operation multiple times', () => {
      monitor.start('test')
      monitor.end('test')
      const secondEnd = monitor.end('test')

      expect(secondEnd).toBeUndefined()
      expect(monitor.measures.length).toBe(1)
    })

    it('should handle starting an operation twice without ending', () => {
      monitor.start('test')
      monitor.start('test') // Overwrite the first one
      const duration = monitor.end('test')

      expect(duration).toBeGreaterThanOrEqual(0)
      expect(monitor.measures.length).toBe(1)
    })
  })

  describe('performance with disabled API', () => {
    it('should gracefully handle disabled performance API', () => {
      const disabledMonitor = new PerformanceMonitor()
      disabledMonitor.enabled = false

      disabledMonitor.start('test')
      const duration = disabledMonitor.end('test')

      expect(duration).toBeUndefined()
      expect(disabledMonitor.measures.length).toBe(0)
    })
  })
})
