/**
 * Performance Monitoring Utility
 * Tracks and reports performance metrics
 */

import { logger } from './logger.js'

export class PerformanceMonitor {
  constructor() {
    this.marks = new Map()
    this.measures = []
    this.enabled = typeof performance !== 'undefined'
  }

  start(label) {
    if (!this.enabled) return

    const markName = `${label}-start`
    performance.mark(markName)
    this.marks.set(label, markName)
    logger.debug(`Performance: Started ${label}`)
  }

  end(label) {
    if (!this.enabled || !this.marks.has(label)) return

    const markName = `${label}-end`
    performance.mark(markName)

    const startMark = this.marks.get(label)
    const measureName = `${label}-duration`

    try {
      performance.measure(measureName, startMark, markName)
      const measure = performance.getEntriesByName(measureName)[0]

      this.measures.push({
        label,
        duration: measure.duration,
        timestamp: Date.now()
      })

      logger.info(`Performance: ${label} completed in ${measure.duration.toFixed(2)}ms`)

      // Clean up marks
      performance.clearMarks(startMark)
      performance.clearMarks(markName)
      performance.clearMeasures(measureName)
      this.marks.delete(label)

      return measure.duration
    } catch (error) {
      logger.warn(`Performance: Failed to measure ${label}`, error)
      return null
    }
  }

  async measure(label, fn) {
    this.start(label)
    try {
      const result = await fn()
      this.end(label)
      return result
    } catch (error) {
      this.end(label)
      throw error
    }
  }

  getMetrics() {
    return {
      measures: [...this.measures],
      summary: this.getSummary()
    }
  }

  getSummary() {
    const grouped = {}

    this.measures.forEach(({ label, duration }) => {
      if (!grouped[label]) {
        grouped[label] = {
          count: 0,
          total: 0,
          min: Infinity,
          max: -Infinity,
          avg: 0
        }
      }

      const stats = grouped[label]
      stats.count++
      stats.total += duration
      stats.min = Math.min(stats.min, duration)
      stats.max = Math.max(stats.max, duration)
      stats.avg = stats.total / stats.count
    })

    return grouped
  }

  clear() {
    this.measures = []
    this.marks.clear()
    if (this.enabled) {
      performance.clearMarks()
      performance.clearMeasures()
    }
  }

  report() {
    const summary = this.getSummary()
    console.table(summary)
    return summary
  }
}

// Export singleton
export const perfMonitor = new PerformanceMonitor()
