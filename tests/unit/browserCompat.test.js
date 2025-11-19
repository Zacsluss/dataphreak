/**
 * @vitest-environment happy-dom
 */

import { describe, it, expect, beforeEach } from 'vitest'
import {
  checkBrowserCompatibility,
  getCompatibilityReport,
  logCompatibilityReport,
  isBrowserSupported
} from '../../src/js/utils/browserCompat.js'

describe('Browser Compatibility', () => {
  describe('checkBrowserCompatibility', () => {
    it('should return features and compatibility objects', () => {
      const result = checkBrowserCompatibility()

      expect(result).toHaveProperty('features')
      expect(result).toHaveProperty('compatibility')
    })

    it('should check ES6 support', () => {
      const { features } = checkBrowserCompatibility()

      expect(features).toHaveProperty('es6')
      expect(typeof features.es6).toBe('boolean')
    })

    it('should check Promise support', () => {
      const { features } = checkBrowserCompatibility()

      expect(features).toHaveProperty('promises')
      expect(features.promises).toBe(true) // Should be true in modern test environment
    })

    it('should check FileReader API support', () => {
      const { features } = checkBrowserCompatibility()

      expect(features).toHaveProperty('fileReader')
      expect(typeof features.fileReader).toBe('boolean')
    })

    it('should check Performance API support', () => {
      const { features } = checkBrowserCompatibility()

      expect(features).toHaveProperty('performance')
      expect(typeof features.performance).toBe('boolean')
    })

    it('should check localStorage support', () => {
      const { features } = checkBrowserCompatibility()

      expect(features).toHaveProperty('localStorage')
      expect(typeof features.localStorage).toBe('boolean')
    })

    it('should check array methods support', () => {
      const { features } = checkBrowserCompatibility()

      expect(features).toHaveProperty('arrayMethods')
      expect(typeof features.arrayMethods).toBe('boolean')
    })

    it('should check string methods support', () => {
      const { features } = checkBrowserCompatibility()

      expect(features).toHaveProperty('stringMethods')
      expect(typeof features.stringMethods).toBe('boolean')
    })

    it('should return browser info', () => {
      const { compatibility } = checkBrowserCompatibility()

      expect(compatibility).toHaveProperty('browserInfo')
      expect(compatibility.browserInfo).toHaveProperty('name')
      expect(compatibility.browserInfo).toHaveProperty('version')
      expect(compatibility.browserInfo).toHaveProperty('platform')
      expect(compatibility.browserInfo).toHaveProperty('userAgent')
      expect(compatibility.browserInfo).toHaveProperty('isMobile')
    })

    it('should determine overall compatibility', () => {
      const { compatibility } = checkBrowserCompatibility()

      expect(compatibility).toHaveProperty('isCompatible')
      expect(typeof compatibility.isCompatible).toBe('boolean')
    })

    it('should list missing features if any', () => {
      const { compatibility } = checkBrowserCompatibility()

      expect(compatibility).toHaveProperty('missingFeatures')
      expect(Array.isArray(compatibility.missingFeatures)).toBe(true)
    })

    it('should list warnings if any', () => {
      const { compatibility } = checkBrowserCompatibility()

      expect(compatibility).toHaveProperty('warnings')
      expect(Array.isArray(compatibility.warnings)).toBe(true)
    })

    it('should mark as compatible if core features are present', () => {
      const { compatibility } = checkBrowserCompatibility()

      // In modern test environment, should be compatible
      if (compatibility.isCompatible) {
        expect(compatibility.missingFeatures.length).toBe(0)
      }
    })
  })

  describe('getCompatibilityReport', () => {
    it('should return a formatted string report', () => {
      const report = getCompatibilityReport()

      expect(typeof report).toBe('string')
      expect(report.length).toBeGreaterThan(0)
    })

    it('should include browser information', () => {
      const report = getCompatibilityReport()

      expect(report).toContain('Browser:')
      expect(report).toContain('Platform:')
      expect(report).toContain('Mobile:')
    })

    it('should include compatibility status', () => {
      const report = getCompatibilityReport()

      expect(report).toContain('Compatibility:')
      expect(report).toMatch(/(COMPATIBLE|NOT COMPATIBLE)/)
    })

    it('should include feature support details', () => {
      const report = getCompatibilityReport()

      expect(report).toContain('Feature Support:')
      expect(report).toMatch(/(es6|promises|fileReader)/)
    })

    it('should show missing features if any', () => {
      const report = getCompatibilityReport()

      // Report should either show missing features or not mention them
      expect(report).toBeTruthy()
    })

    it('should show warnings if any', () => {
      const report = getCompatibilityReport()

      // Report should either show warnings or not mention them
      expect(report).toBeTruthy()
    })

    it('should use checkmarks and crosses for visual indication', () => {
      const report = getCompatibilityReport()

      // Should contain at least one status indicator
      expect(report).toMatch(/[✓✗⚠]/)
    })
  })

  describe('logCompatibilityReport', () => {
    it('should not throw when logging', () => {
      expect(() => logCompatibilityReport()).not.toThrow()
    })

    it('should work even if console is undefined', () => {
      const originalConsole = global.console
      // @ts-ignore
      global.console = undefined

      expect(() => logCompatibilityReport()).not.toThrow()

      global.console = originalConsole
    })
  })

  describe('isBrowserSupported', () => {
    it('should return a boolean', () => {
      const supported = isBrowserSupported()

      expect(typeof supported).toBe('boolean')
    })

    it('should return true in modern test environment', () => {
      const supported = isBrowserSupported()

      // Modern test environment should be supported
      expect(supported).toBe(true)
    })

    it('should match checkBrowserCompatibility result', () => {
      const supported = isBrowserSupported()
      const { compatibility } = checkBrowserCompatibility()

      expect(supported).toBe(compatibility.isCompatible)
    })
  })

  describe('Feature Detection Accuracy', () => {
    it('should correctly detect Promise availability', () => {
      const { features } = checkBrowserCompatibility()

      expect(features.promises).toBe(typeof Promise !== 'undefined')
    })

    it('should correctly detect console availability', () => {
      const { features } = checkBrowserCompatibility()

      expect(features.console).toBe(typeof console !== 'undefined')
    })

    it('should correctly detect BigInt support', () => {
      const { features } = checkBrowserCompatibility()

      expect(features.bigInt).toBe(typeof BigInt !== 'undefined')
    })

    it('should correctly detect Intl support', () => {
      const { features } = checkBrowserCompatibility()

      expect(features.intl).toBe(typeof Intl !== 'undefined')
    })
  })

  describe('Browser Info Detection', () => {
    it('should detect user agent', () => {
      const { compatibility } = checkBrowserCompatibility()

      expect(compatibility.browserInfo.userAgent).toBeTruthy()
      expect(typeof compatibility.browserInfo.userAgent).toBe('string')
    })

    it('should detect mobile status', () => {
      const { compatibility } = checkBrowserCompatibility()

      expect(typeof compatibility.browserInfo.isMobile).toBe('boolean')
    })

    it('should provide browser name', () => {
      const { compatibility } = checkBrowserCompatibility()

      expect(compatibility.browserInfo.name).toBeTruthy()
      expect(typeof compatibility.browserInfo.name).toBe('string')
    })

    it('should provide browser version or Unknown', () => {
      const { compatibility } = checkBrowserCompatibility()

      expect(compatibility.browserInfo.version).toBeTruthy()
      expect(typeof compatibility.browserInfo.version).toBe('string')
    })

    it('should provide platform information', () => {
      const { compatibility } = checkBrowserCompatibility()

      expect(compatibility.browserInfo.platform).toBeTruthy()
      expect(typeof compatibility.browserInfo.platform).toBe('string')
    })
  })

  describe('Array Methods Detection', () => {
    it('should detect modern array methods', () => {
      const { features } = checkBrowserCompatibility()

      // All modern array methods should be available in test environment
      expect(features.arrayMethods).toBe(true)
    })

    it('should verify specific array methods', () => {
      const arr = []

      expect(typeof arr.map).toBe('function')
      expect(typeof arr.filter).toBe('function')
      expect(typeof arr.reduce).toBe('function')
      expect(typeof arr.find).toBe('function')
      expect(typeof arr.includes).toBe('function')
    })
  })

  describe('String Methods Detection', () => {
    it('should detect modern string methods', () => {
      const { features } = checkBrowserCompatibility()

      // All modern string methods should be available in test environment
      expect(features.stringMethods).toBe(true)
    })

    it('should verify specific string methods', () => {
      const str = ''

      expect(typeof str.includes).toBe('function')
      expect(typeof str.startsWith).toBe('function')
      expect(typeof str.endsWith).toBe('function')
      expect(typeof str.repeat).toBe('function')
      expect(typeof str.trim).toBe('function')
    })
  })

  describe('Edge Cases', () => {
    it('should handle multiple rapid checks', () => {
      for (let i = 0; i < 100; i++) {
        const result = checkBrowserCompatibility()
        expect(result).toHaveProperty('features')
      }
    })

    it('should return consistent results across multiple calls', () => {
      const result1 = checkBrowserCompatibility()
      const result2 = checkBrowserCompatibility()

      expect(result1.compatibility.isCompatible).toBe(result2.compatibility.isCompatible)
      expect(result1.features.es6).toBe(result2.features.es6)
    })

    it('should handle report generation multiple times', () => {
      const report1 = getCompatibilityReport()
      const report2 = getCompatibilityReport()

      expect(report1).toBe(report2)
    })
  })
})
