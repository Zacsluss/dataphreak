/**
 * Logger Utility
 * Provides controlled logging with levels and production safety
 */

/**
 * Log levels for controlling verbosity
 * @enum {number}
 */
const LogLevel = {
  /** All messages including debug */
  DEBUG: 0,
  /** Info, warnings, and errors */
  INFO: 1,
  /** Warnings and errors only */
  WARN: 2,
  /** Errors only */
  ERROR: 3,
  /** No logging */
  NONE: 4
}

/**
 * Logger class for controlled, leveled logging
 */
class Logger {
  /**
   * Create a new logger instance
   * @param {Object} options - Configuration options
   * @param {number} [options.level] - Initial log level (defaults to DEBUG in dev, WARN in production)
   * @param {string} [options.prefix='[DATAPHREAK]'] - Prefix for log messages
   * @param {boolean} [options.timestamp=true] - Whether to include timestamps
   */
  constructor (options = {}) {
    // Check if running in production (safe check for browser and node)
    const isProduction = typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'production'
    this.level = options.level ?? (isProduction ? LogLevel.WARN : LogLevel.DEBUG)
    this.prefix = options.prefix || '[DATAPHREAK]'
    this.enableTimestamp = options.timestamp !== false
  }

  /**
   * Internal logging method
   * @private
   * @param {number} level - Log level number
   * @param {string} levelName - Log level name
   * @param {Array} args - Arguments to log
   */
  _log (level, levelName, args) {
    if (level < this.level) return

    const timestamp = this.enableTimestamp ? `[${new Date().toISOString()}]` : ''
    const prefix = `${timestamp} ${this.prefix} [${levelName}]`

    // Safe console access - necessary for logging utility
    const consoleMethod = console[levelName.toLowerCase()]
    if (typeof consoleMethod === 'function') {
      consoleMethod.call(console, prefix, ...args)
    }
  }

  /**
   * Log debug message (only in DEBUG level)
   * @param {...*} args - Values to log
   */
  debug (...args) {
    this._log(LogLevel.DEBUG, 'DEBUG', args)
  }

  /**
   * Log info message (DEBUG and INFO levels)
   * @param {...*} args - Values to log
   */
  info (...args) {
    this._log(LogLevel.INFO, 'INFO', args)
  }

  /**
   * Log warning message (DEBUG, INFO, and WARN levels)
   * @param {...*} args - Values to log
   */
  warn (...args) {
    this._log(LogLevel.WARN, 'WARN', args)
  }

  /**
   * Log error message (all levels except NONE)
   * @param {...*} args - Values to log
   */
  error (...args) {
    this._log(LogLevel.ERROR, 'ERROR', args)
  }

  /**
   * Set the minimum log level
   * @param {number} level - LogLevel value
   */
  setLevel (level) {
    this.level = level
  }
}

// Export singleton instance
export const logger = new Logger()
export { Logger, LogLevel }
