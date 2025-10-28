/**
 * Logger Utility
 * Provides controlled logging with levels and production safety
 */

const LogLevel = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  NONE: 4
}

class Logger {
  constructor(options = {}) {
    this.level = options.level || (process.env.NODE_ENV === 'production' ? LogLevel.WARN : LogLevel.DEBUG)
    this.prefix = options.prefix || '[DATAPHREAK]'
    this.enableTimestamp = options.timestamp !== false
  }

  _log(level, levelName, args) {
    if (level < this.level) return

    const timestamp = this.enableTimestamp ? `[${new Date().toISOString()}]` : ''
    const prefix = `${timestamp} ${this.prefix} [${levelName}]`

    console[levelName.toLowerCase()](prefix, ...args)
  }

  debug(...args) {
    this._log(LogLevel.DEBUG, 'DEBUG', args)
  }

  info(...args) {
    this._log(LogLevel.INFO, 'INFO', args)
  }

  warn(...args) {
    this._log(LogLevel.WARN, 'WARN', args)
  }

  error(...args) {
    this._log(LogLevel.ERROR, 'ERROR', args)
  }

  setLevel(level) {
    this.level = level
  }
}

// Export singleton instance
export const logger = new Logger()
export { Logger, LogLevel }
