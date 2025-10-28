import { describe, it, expect, beforeEach, vi } from 'vitest'
import { ErrorHandler, DataphreakError, ErrorCodes } from '../../src/js/utils/errorHandler.js'

describe('ErrorHandler', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('DataphreakError', () => {
    it('should create error with code and details', () => {
      const error = new DataphreakError('Test error', ErrorCodes.PARSE_ERROR, { file: 'test.csv' })

      expect(error).toBeInstanceOf(Error)
      expect(error.message).toBe('Test error')
      expect(error.code).toBe(ErrorCodes.PARSE_ERROR)
      expect(error.details).toEqual({ file: 'test.csv' })
      expect(error.timestamp).toBeDefined()
    })
  })

  describe('getUserMessage', () => {
    it('should return user-friendly message for known error codes', () => {
      const error = new DataphreakError('', ErrorCodes.FILE_TOO_LARGE)
      const message = ErrorHandler.getUserMessage(error)

      expect(message).toContain('too large')
      expect(message).toContain('100MB')
    })

    it('should return default message for unknown error codes', () => {
      const error = new Error('Technical error')
      const message = ErrorHandler.getUserMessage(error)

      expect(message).toBe('Technical error')
    })

    it('should handle all error codes', () => {
      Object.values(ErrorCodes).forEach(code => {
        const error = new DataphreakError('', code)
        const message = ErrorHandler.getUserMessage(error)

        expect(message).toBeTruthy()
        expect(typeof message).toBe('string')
      })
    })
  })

  describe('handle', () => {
    it('should return structured error info', () => {
      const error = new DataphreakError('Test', ErrorCodes.VALIDATION_ERROR)
      const result = ErrorHandler.handle(error, { field: 'email' })

      expect(result).toHaveProperty('message')
      expect(result).toHaveProperty('code')
      expect(result).toHaveProperty('originalError')
      expect(result).toHaveProperty('context')
      expect(result.context).toEqual({ field: 'email' })
    })
  })

  describe('wrapAsync', () => {
    it('should execute async function successfully', async () => {
      const fn = async () => 'success'
      const result = await ErrorHandler.wrapAsync(fn)

      expect(result).toBe('success')
    })

    it('should handle async errors', async () => {
      const fn = async () => {
        throw new DataphreakError('Async error', ErrorCodes.NETWORK_ERROR)
      }
      const result = await ErrorHandler.wrapAsync(fn, { api: 'test' })

      expect(result).toHaveProperty('code', ErrorCodes.NETWORK_ERROR)
      expect(result).toHaveProperty('context')
    })
  })

  describe('wrap', () => {
    it('should execute sync function successfully', () => {
      const fn = () => 'success'
      const result = ErrorHandler.wrap(fn)

      expect(result).toBe('success')
    })

    it('should handle sync errors', () => {
      const fn = () => {
        throw new DataphreakError('Sync error', ErrorCodes.VALIDATION_ERROR)
      }
      const result = ErrorHandler.wrap(fn, { field: 'name' })

      expect(result).toHaveProperty('code', ErrorCodes.VALIDATION_ERROR)
      expect(result).toHaveProperty('context', { field: 'name' })
    })
  })
})
