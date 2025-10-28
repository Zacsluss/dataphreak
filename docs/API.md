# DATAPHREAK API Documentation

## Table of Contents

- [Utilities](#utilities)
  - [Logger](#logger)
  - [Error Handler](#error-handler)
  - [Performance Monitor](#performance-monitor)
- [Core Functions](#core-functions)
- [Data Analysis](#data-analysis)
- [UI Components](#ui-components)

---

## Utilities

### Logger

Provides controlled logging with levels and production safety.

#### Usage

```javascript
import { logger, LogLevel } from './utils/logger.js'

// Basic logging
logger.debug('Debug message', { data: 'value' })
logger.info('Info message')
logger.warn('Warning message')
logger.error('Error message', error)

// Set log level
logger.setLevel(LogLevel.WARN) // Only warnings and errors

// Available levels
LogLevel.DEBUG  // 0 - All messages
LogLevel.INFO   // 1 - Info, warnings, errors
LogLevel.WARN   // 2 - Warnings and errors only
LogLevel.ERROR  // 3 - Errors only
LogLevel.NONE   // 4 - No logging
```

#### API Reference

**`logger.debug(...args)`**
- Logs debug-level messages
- Only shown when log level is DEBUG
- Parameters: Any number of arguments

**`logger.info(...args)`**
- Logs informational messages
- Shown when log level is INFO or lower

**`logger.warn(...args)`**
- Logs warning messages
- Shown when log level is WARN or lower

**`logger.error(...args)`**
- Logs error messages
- Always shown unless level is NONE

**`logger.setLevel(level)`**
- Sets the minimum log level
- Parameters:
  - `level` (LogLevel): The minimum level to display

---

### Error Handler

Centralized error management with user-friendly messages.

#### Usage

```javascript
import { ErrorHandler, DataphreakError, ErrorCodes } from './utils/errorHandler.js'

// Create custom error
const error = new DataphreakError(
  'File parsing failed',
  ErrorCodes.PARSE_ERROR,
  { file: 'data.csv', line: 42 }
)

// Handle error
const result = ErrorHandler.handle(error, { operation: 'parseCSV' })
// Returns: { message, code, originalError, context }

// Wrap async function
const data = await ErrorHandler.wrapAsync(async () => {
  return await parseFile(file)
}, { file: file.name })

// Wrap sync function
const result = ErrorHandler.wrap(() => {
  return processData(data)
}, { rows: data.length })
```

#### Error Codes

| Code | Description | User Message |
|------|-------------|--------------|
| `FILE_TOO_LARGE` | File exceeds size limit | File is too large. Maximum size is 100MB. |
| `INVALID_FORMAT` | Unsupported file format | Invalid file format. Please upload CSV, TSV, or Excel files. |
| `PARSE_ERROR` | Unable to parse file | Unable to parse file. Please check the file format. |
| `MEMORY_ERROR` | Insufficient memory | Not enough memory to process this file. |
| `NETWORK_ERROR` | Network request failed | Network error occurred. Please check your connection. |
| `VALIDATION_ERROR` | Data validation failed | Validation failed. Please check your data. |
| `UNKNOWN_ERROR` | Unexpected error | An unexpected error occurred. Please try again. |

#### API Reference

**`ErrorHandler.handle(error, context)`**
- Handles and logs errors
- Returns structured error info
- Parameters:
  - `error` (Error): The error object
  - `context` (Object): Additional context

**`ErrorHandler.wrapAsync(fn, context)`**
- Wraps async function with error handling
- Returns function result or error info
- Parameters:
  - `fn` (Function): Async function to execute
  - `context` (Object): Error context

**`ErrorHandler.wrap(fn, context)`**
- Wraps sync function with error handling
- Returns function result or error info

---

### Performance Monitor

Tracks and reports performance metrics.

#### Usage

```javascript
import { perfMonitor } from './utils/performance.js'

// Manual start/end
perfMonitor.start('dataProcessing')
// ... do work ...
const duration = perfMonitor.end('dataProcessing')
console.log(`Took ${duration}ms`)

// Auto-measure async function
const result = await perfMonitor.measure('parseFile', async () => {
  return await parseCSV(file)
})

// Get metrics
const metrics = perfMonitor.getMetrics()
// Returns: { measures: [...], summary: {...} }

// Report summary
perfMonitor.report()
// Outputs table to console

// Clear metrics
perfMonitor.clear()
```

#### API Reference

**`perfMonitor.start(label)`**
- Starts timing for a labeled operation
- Parameters:
  - `label` (String): Unique identifier

**`perfMonitor.end(label)`**
- Ends timing and records duration
- Returns: Duration in milliseconds

**`perfMonitor.measure(label, fn)`**
- Automatically measures async function
- Parameters:
  - `label` (String): Operation identifier
  - `fn` (Function): Function to measure
- Returns: Function result

**`perfMonitor.getMetrics()`**
- Returns all collected metrics
- Returns: `{ measures: Array, summary: Object }`

**`perfMonitor.getSummary()`**
- Returns aggregated statistics
- Returns: Object with min/max/avg for each label

**`perfMonitor.report()`**
- Logs formatted summary table
- Returns: Summary object

**`perfMonitor.clear()`**
- Clears all collected metrics

---

## Core Functions

### Data Processing

(To be documented - extract from dataphreak.html)

### Pattern Detection

(To be documented - extract from dataphreak.html)

### Quality Scoring

(To be documented - extract from dataphreak.html)

---

## Data Analysis

### Fuzzy Matching

(To be documented - extract from dataphreak.html)

### Statistical Analysis

(To be documented - extract from dataphreak.html)

---

## UI Components

### Toast Notifications

(To be documented - extract from dataphreak.html)

### Modal Dialogs

(To be documented - extract from dataphreak.html)

---

## Examples

### Complete Workflow Example

```javascript
import { logger, LogLevel } from './utils/logger.js'
import { ErrorHandler, ErrorCodes, DataphreakError } from './utils/errorHandler.js'
import { perfMonitor } from './utils/performance.js'

// Configure logger
logger.setLevel(LogLevel.INFO)

// Process file with full monitoring
async function processFile(file) {
  logger.info('Starting file processing', { name: file.name, size: file.size })

  return await ErrorHandler.wrapAsync(async () => {
    // Validate file size
    if (file.size > 100 * 1024 * 1024) {
      throw new DataphreakError(
        'File too large',
        ErrorCodes.FILE_TOO_LARGE,
        { size: file.size, limit: 100 * 1024 * 1024 }
      )
    }

    // Parse with performance tracking
    const data = await perfMonitor.measure('parseFile', async () => {
      return await parseCSV(file)
    })

    logger.info('File parsed successfully', { rows: data.length })

    // Analyze with performance tracking
    const analysis = await perfMonitor.measure('analyzeData', async () => {
      return await analyzeDataQuality(data)
    })

    logger.info('Analysis complete', analysis.summary)

    // Report performance
    perfMonitor.report()

    return { data, analysis }
  }, { operation: 'processFile', file: file.name })
}
```

---

## Migration Guide

### From Console to Logger

**Before:**
```javascript
console.log('Loading file:', filename)
console.error('Failed to parse:', error)
```

**After:**
```javascript
logger.info('Loading file', { filename })
logger.error('Failed to parse', { error: error.message, stack: error.stack })
```

### Adding Error Handling

**Before:**
```javascript
function parseData(data) {
  // Direct processing, errors bubble up
  return processRows(data)
}
```

**After:**
```javascript
function parseData(data) {
  return ErrorHandler.wrap(() => {
    return processRows(data)
  }, { rows: data.length })
}
```

---

## Best Practices

1. **Always use logger instead of console**
   - Makes debugging controllable
   - Can be disabled in production
   - Provides consistent formatting

2. **Wrap user-facing operations in ErrorHandler**
   - Provides user-friendly messages
   - Logs errors for debugging
   - Prevents application crashes

3. **Use performance monitoring for slow operations**
   - Track file parsing
   - Monitor data analysis
   - Identify bottlenecks

4. **Set appropriate log levels**
   - Development: `LogLevel.DEBUG`
   - Production: `LogLevel.WARN`
   - Testing: `LogLevel.ERROR`

5. **Include context in errors**
   - Add relevant data to error details
   - Makes debugging easier
   - Helps users understand issues

---

## Future Additions

- Data validation utilities
- CSV parsing helpers
- Excel export functions
- Pattern detection algorithms
- Fuzzy matching implementation
- Quality scoring system
- UI component library

---

*Last Updated: 2025-10-28*
*Version: 1.0.0*
