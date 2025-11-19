/**
 * Global Error Handling Utility
 * Centralized error management with user-friendly messages
 */

import { logger } from './logger.js'

/**
 * Custom error class for DATAPHREAK-specific errors
 * @extends Error
 */
export class DataphreakError extends Error {
  /**
   * Create a DATAPHREAK error
   * @param {string} message - Error message
   * @param {string} code - Error code from ErrorCodes
   * @param {Object} [details={}] - Additional error details
   */
  constructor (message, code, details = {}) {
    super(message)
    this.name = 'DataphreakError'
    this.code = code
    this.details = details
    this.timestamp = new Date().toISOString()
  }
}

/**
 * Standard error codes used throughout the application
 * @enum {string}
 */
export const ErrorCodes = {
  /** File exceeds maximum allowed size */
  FILE_TOO_LARGE: 'FILE_TOO_LARGE',
  /** File format not supported */
  INVALID_FORMAT: 'INVALID_FORMAT',
  /** Error parsing file contents */
  PARSE_ERROR: 'PARSE_ERROR',
  /** Insufficient memory to complete operation */
  MEMORY_ERROR: 'MEMORY_ERROR',
  /** Network request failed */
  NETWORK_ERROR: 'NETWORK_ERROR',
  /** Data validation failed */
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  /** Unknown or unexpected error */
  UNKNOWN_ERROR: 'UNKNOWN_ERROR'
}

/**
 * Centralized error handling with logging and user-friendly messages
 */
export class ErrorHandler {
  /**
   * Handle an error with logging and user notification
   * @param {Error} error - The error to handle
   * @param {Object} [context={}] - Additional context about the error
   * @returns {Object} Structured error information
   */
  static handle (error, context = {}) {
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

  /**
   * Get user-friendly error message for an error code
   * @param {Error} error - Error with code property
   * @returns {string} User-friendly error message
   */
  static getUserMessage (error) {
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

  /**
   * Wrap an async function with error handling
   * @param {Function} fn - Async function to wrap
   * @param {Object} [context={}] - Context for error handling
   * @returns {Promise<*>} Result of function or error info
   */
  static async wrapAsync (fn, context = {}) {
    try {
      return await fn()
    } catch (error) {
      return this.handle(error, context)
    }
  }

  /**
   * Wrap a sync function with error handling
   * @param {Function} fn - Function to wrap
   * @param {Object} [context={}] - Context for error handling
   * @returns {*} Result of function or error info
   */
  static wrap (fn, context = {}) {
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
