import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { Logger, LogLevel } from '../../src/js/utils/logger.js'

describe('Logger', () => {
  let logger
  let consoleDebugSpy
  let consoleInfoSpy
  let consoleWarnSpy
  let consoleErrorSpy

  beforeEach(() => {
    logger = new Logger({ timestamp: false })
    consoleDebugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {})
    consoleInfoSpy = vi.spyOn(console, 'info').mockImplementation(() => {})
    consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.clearAllMocks()
    consoleDebugSpy.mockRestore()
    consoleInfoSpy.mockRestore()
    consoleWarnSpy.mockRestore()
    consoleErrorSpy.mockRestore()
  })

  describe('Log Levels', () => {
    it('should log debug messages when level is DEBUG', () => {
      logger.setLevel(LogLevel.DEBUG)
      logger.debug('test message')
      expect(consoleDebugSpy).toHaveBeenCalled()
    })

    it('should not log debug messages when level is INFO', () => {
      logger.setLevel(LogLevel.INFO)
      logger.debug('test message')
      expect(consoleDebugSpy).not.toHaveBeenCalled()
    })

    it('should log info messages when level is INFO', () => {
      logger.setLevel(LogLevel.INFO)
      logger.info('test message')
      expect(consoleInfoSpy).toHaveBeenCalled()
    })

    it('should log warnings when level is WARN', () => {
      logger.setLevel(LogLevel.WARN)
      logger.warn('test warning')
      expect(consoleWarnSpy).toHaveBeenCalled()
    })

    it('should log errors when level is ERROR', () => {
      logger.setLevel(LogLevel.ERROR)
      logger.error('test error')
      expect(consoleErrorSpy).toHaveBeenCalled()
    })

    it('should not log anything when level is NONE', () => {
      logger.setLevel(LogLevel.NONE)
      logger.debug('debug')
      logger.info('info')
      logger.warn('warn')
      logger.error('error')

      expect(consoleDebugSpy).not.toHaveBeenCalled()
      expect(consoleInfoSpy).not.toHaveBeenCalled()
      expect(consoleWarnSpy).not.toHaveBeenCalled()
      expect(consoleErrorSpy).not.toHaveBeenCalled()
    })
  })

  describe('Message Formatting', () => {
    it('should include prefix in log messages', () => {
      logger.info('test')
      expect(consoleInfoSpy).toHaveBeenCalledWith(
        expect.stringContaining('[DATAPHREAK]'),
        'test'
      )
    })

    it('should include level in log messages', () => {
      logger.info('test')
      expect(consoleInfoSpy).toHaveBeenCalledWith(
        expect.stringContaining('[INFO]'),
        'test'
      )
    })

    it('should support custom prefix', () => {
      const customLogger = new Logger({ prefix: '[CUSTOM]', timestamp: false })
      customLogger.info('test')
      expect(consoleInfoSpy).toHaveBeenCalledWith(
        expect.stringContaining('[CUSTOM]'),
        'test'
      )
    })
  })

  describe('Multiple Arguments', () => {
    it('should log multiple arguments', () => {
      logger.info('message', { data: 'test' }, [1, 2, 3])
      expect(consoleInfoSpy).toHaveBeenCalledWith(
        expect.any(String),
        'message',
        { data: 'test' },
        [1, 2, 3]
      )
    })
  })
})
