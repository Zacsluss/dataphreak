/**
 * Global Error Handling Utility
 * Centralized error management with user-friendly messages
 */

import { logger } from './logger.js'

export class DataphreakError extends Error {
  constructor(message, code, details = {}) {
    super(message)
    this.name = 'DataphreakError'
    this.code = code
    this.details = details
    this.timestamp = new Date().toISOString()
  }
}

export const ErrorCodes = {
  FILE_TOO_LARGE: 'FILE_TOO_LARGE',
  INVALID_FORMAT: 'INVALID_FORMAT',
  PARSE_ERROR: 'PARSE_ERROR',
  MEMORY_ERROR: 'MEMORY_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR'
}

export class ErrorHandler {
  static handle(error, context = {}) {
    // Log error with context
    logger.error('Error occurred:', {
      message: error.message,
      code: error.code || 'UNKNOWN',
      context,
      stack: error.stack
    })

    // Get user-friendly message
    const userMessage = this.getUserMessage(error)

    // Show toast notification if available
    if (typeof window !== 'undefined' && window.toast) {
      window.toast(userMessage, 'error')
    }

    // Return structured error info
    return {
      message: userMessage,
      code: error.code || ErrorCodes.UNKNOWN_ERROR,
      originalError: error,
      context
    }
  }

  static getUserMessage(error) {
    const messages = {
      [ErrorCodes.FILE_TOO_LARGE]: 'File is too large. Maximum size is 100MB.',
      [ErrorCodes.INVALID_FORMAT]: 'Invalid file format. Please upload CSV, TSV, or Excel files.',
      [ErrorCodes.PARSE_ERROR]: 'Unable to parse file. Please check the file format.',
      [ErrorCodes.MEMORY_ERROR]: 'Not enough memory to process this file. Try a smaller dataset.',
      [ErrorCodes.NETWORK_ERROR]: 'Network error occurred. Please check your connection.',
      [ErrorCodes.VALIDATION_ERROR]: 'Validation failed. Please check your data.',
      [ErrorCodes.UNKNOWN_ERROR]: 'An unexpected error occurred. Please try again.'
    }

    return messages[error.code] || error.message || messages[ErrorCodes.UNKNOWN_ERROR]
  }

  static async wrapAsync(fn, context = {}) {
    try {
      return await fn()
    } catch (error) {
      return this.handle(error, context)
    }
  }

  static wrap(fn, context = {}) {
    try {
      return fn()
    } catch (error) {
      return this.handle(error, context)
    }
  }
}

// Global error handler
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    ErrorHandler.handle(event.error, { type: 'global', event })
  })

  window.addEventListener('unhandledrejection', (event) => {
    ErrorHandler.handle(event.reason, { type: 'unhandledPromise', event })
  })
}
