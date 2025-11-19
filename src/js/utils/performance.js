/**
 * Performance Monitoring Utility
 * Tracks and reports performance metrics using the Performance API
 */

import { logger } from './logger.js'

/**
 * Performance monitoring class for tracking operation timing
 */
export class PerformanceMonitor {
  /**
   * Create a performance monitor
   */
  constructor () {
    this.marks = new Map()
    this.measures = []
    this.enabled = typeof performance !== 'undefined'
  }

  /**
   * Start timing an operation
   * @param {string} label - Unique label for the operation
   */
  start (label) {
    if (!this.enabled) return

    const markName = `${label}-start`
    performance.mark(markName)
    this.marks.set(label, markName)
    logger.debug(`Performance: Started ${label}`)
  }

  /**
   * End timing an operation and record duration
   * @param {string} label - Label of the operation to end
   * @returns {number|null} Duration in milliseconds, or null if failed
   */
  end (label) {
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

  /**
   * Measure the execution time of an async function
   * @param {string} label - Label for the measurement
   * @param {Function} fn - Async function to measure
   * @returns {Promise<*>} Result of the function
   */
  async measure (label, fn) {
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

  /**
   * Get all recorded metrics
   * @returns {Object} Object containing measures array and summary
   */
  getMetrics () {
    return {
      measures: [...this.measures],
      summary: this.getSummary()
    }
  }

  /**
   * Get summary statistics grouped by label
   * @returns {Object} Summary with count, total, min, max, avg for each label
   */
  getSummary () {
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

  /**
   * Clear all recorded measurements
   */
  clear () {
    this.measures = []
    this.marks.clear()
    if (this.enabled) {
      performance.clearMarks()
      performance.clearMeasures()
    }
  }

  /**
   * Generate and display a performance report
   * @returns {Object} Summary statistics
   */
  report () {
    const summary = this.getSummary()
    // Use console.table for performance reporting - intentional for debugging
    // eslint-disable-next-line no-console
    if (typeof console !== 'undefined' && typeof console.table === 'function') {
      // eslint-disable-next-line no-console
      console.table(summary)
    }
    return summary
  }
}

// Export singleton
export const perfMonitor = new PerformanceMonitor()
