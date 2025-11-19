/**
 * Browser Compatibility Checks and Fallbacks
 * Detects browser features and provides compatibility information
 */

/**
 * Check if browser supports required features
 * @returns {Object} Object with supported features and compatibility info
 */
export function checkBrowserCompatibility () {
  const features = {
    // Core JavaScript features
    es6: checkES6Support(),
    promises: typeof Promise !== 'undefined',
    async: checkAsyncAwaitSupport(),
    modules: checkModuleSupport(),

    // Web APIs
    fileReader: typeof FileReader !== 'undefined',
    performance: typeof performance !== 'undefined' && typeof performance.mark === 'function',
    localStorage: checkLocalStorageSupport(),
    console: typeof console !== 'undefined',

    // Array methods
    arrayMethods: checkArrayMethods(),

    // String methods
    stringMethods: checkStringMethods(),

    // Modern features
    bigInt: typeof BigInt !== 'undefined',
    intl: typeof Intl !== 'undefined'
  }

  const compatibility = {
    isCompatible: features.es6 && features.promises && features.fileReader,
    missingFeatures: [],
    warnings: [],
    browserInfo: getBrowserInfo()
  }

  // Check for critical missing features
  if (!features.es6) compatibility.missingFeatures.push('ES6 syntax')
  if (!features.promises) compatibility.missingFeatures.push('Promises')
  if (!features.fileReader) compatibility.missingFeatures.push('FileReader API')

  // Check for non-critical missing features
  if (!features.performance) compatibility.warnings.push('Performance API unavailable')
  if (!features.localStorage) compatibility.warnings.push('LocalStorage unavailable')

  return { features, compatibility }
}

/**
 * Check ES6 support
 * @returns {boolean} True if ES6 is supported
 */
function checkES6Support () {
  try {
    // Test arrow functions
    const arrowFn = () => true
    // Test let/const
    let testLet = true
    const testConst = true
    // Test template literals
    const template = `test ${testLet}`
    // Test destructuring
    const { a } = { a: 1 }
    // Test spread operator
    const arr = [1, 2, 3]
    const spread = [...arr]

    return arrowFn() && testLet && testConst && template && a === 1 && spread.length === 3
  } catch (e) {
    return false
  }
}

/**
 * Check async/await support
 * @returns {boolean} True if async/await is supported
 */
function checkAsyncAwaitSupport () {
  try {
    // Use eval to avoid syntax errors in non-supporting browsers
    // eslint-disable-next-line no-eval
    eval('(async () => {})()')
    return true
  } catch (e) {
    return false
  }
}

/**
 * Check ES6 module support
 * @returns {boolean} True if modules are supported
 */
function checkModuleSupport () {
  const script = document.createElement('script')
  return 'noModule' in script
}

/**
 * Check localStorage availability and functionality
 * @returns {boolean} True if localStorage works
 */
function checkLocalStorageSupport () {
  try {
    const test = '__storage_test__'
    localStorage.setItem(test, test)
    localStorage.removeItem(test)
    return true
  } catch (e) {
    return false
  }
}

/**
 * Check modern array methods
 * @returns {boolean} True if all methods are supported
 */
function checkArrayMethods () {
  const arr = []
  return (
    typeof arr.map === 'function' &&
    typeof arr.filter === 'function' &&
    typeof arr.reduce === 'function' &&
    typeof arr.find === 'function' &&
    typeof arr.findIndex === 'function' &&
    typeof arr.includes === 'function' &&
    typeof arr.some === 'function' &&
    typeof arr.every === 'function' &&
    typeof Array.from === 'function' &&
    typeof Array.isArray === 'function'
  )
}

/**
 * Check modern string methods
 * @returns {boolean} True if all methods are supported
 */
function checkStringMethods () {
  const str = ''
  return (
    typeof str.includes === 'function' &&
    typeof str.startsWith === 'function' &&
    typeof str.endsWith === 'function' &&
    typeof str.repeat === 'function' &&
    typeof str.trim === 'function' &&
    typeof str.padStart === 'function' &&
    typeof str.padEnd === 'function'
  )
}

/**
 * Get browser information
 * @returns {Object} Browser name, version, and platform
 */
function getBrowserInfo () {
  const ua = navigator.userAgent
  let browserName = 'Unknown'
  let browserVersion = 'Unknown'
  let platform = navigator.platform || 'Unknown'

  // Detect browser
  if (ua.indexOf('Firefox') > -1) {
    browserName = 'Firefox'
    browserVersion = ua.match(/Firefox\/(\d+\.\d+)/)?.[1] || 'Unknown'
  } else if (ua.indexOf('Edg') > -1) {
    browserName = 'Edge'
    browserVersion = ua.match(/Edg\/(\d+\.\d+)/)?.[1] || 'Unknown'
  } else if (ua.indexOf('Chrome') > -1) {
    browserName = 'Chrome'
    browserVersion = ua.match(/Chrome\/(\d+\.\d+)/)?.[1] || 'Unknown'
  } else if (ua.indexOf('Safari') > -1) {
    browserName = 'Safari'
    browserVersion = ua.match(/Version\/(\d+\.\d+)/)?.[1] || 'Unknown'
  } else if (ua.indexOf('MSIE') > -1 || ua.indexOf('Trident') > -1) {
    browserName = 'Internet Explorer'
    browserVersion = ua.match(/(MSIE |rv:)(\d+\.\d+)/)?.[2] || 'Unknown'
  }

  return {
    name: browserName,
    version: browserVersion,
    platform,
    userAgent: ua,
    isMobile: /Mobile|Android|iPhone|iPad|iPod/i.test(ua)
  }
}

/**
 * Get a human-readable compatibility report
 * @returns {string} Formatted compatibility report
 */
export function getCompatibilityReport () {
  const { features, compatibility } = checkBrowserCompatibility()

  let report = `Browser Compatibility Report\n`
  report += `==============================\n\n`

  report += `Browser: ${compatibility.browserInfo.name} ${compatibility.browserInfo.version}\n`
  report += `Platform: ${compatibility.browserInfo.platform}\n`
  report += `Mobile: ${compatibility.browserInfo.isMobile ? 'Yes' : 'No'}\n\n`

  report += `Compatibility: ${compatibility.isCompatible ? 'COMPATIBLE ✓' : 'NOT COMPATIBLE ✗'}\n\n`

  if (compatibility.missingFeatures.length > 0) {
    report += `Missing Critical Features:\n`
    compatibility.missingFeatures.forEach(feature => {
      report += `  ✗ ${feature}\n`
    })
    report += `\n`
  }

  if (compatibility.warnings.length > 0) {
    report += `Warnings:\n`
    compatibility.warnings.forEach(warning => {
      report += `  ⚠ ${warning}\n`
    })
    report += `\n`
  }

  report += `Feature Support:\n`
  Object.entries(features).forEach(([key, value]) => {
    report += `  ${value ? '✓' : '✗'} ${key}\n`
  })

  return report
}

/**
 * Log compatibility report to console
 */
export function logCompatibilityReport () {
  // eslint-disable-next-line no-console
  if (typeof console !== 'undefined' && typeof console.log === 'function') {
    // eslint-disable-next-line no-console
    console.log(getCompatibilityReport())
  }
}

/**
 * Check if current browser is supported
 * @returns {boolean} True if browser is supported
 */
export function isBrowserSupported () {
  const { compatibility } = checkBrowserCompatibility()
  return compatibility.isCompatible
}
