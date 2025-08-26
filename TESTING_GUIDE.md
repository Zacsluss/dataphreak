# DATAPHREAK Testing Guide

## Critical Bug Fixes Applied

### 1. "Clean All" Button Breaking Webpage ✅ FIXED
- **Root Cause**: Missing error handling and validation in data operations
- **Fix Applied**: 
  - Added comprehensive error handling around `quickCleanAll` function
  - Added state validation before operations
  - Added button disable/enable logic to prevent double-clicks
  - Added memory constraint warnings for large datasets
  - Enhanced undo/redo system error handling

### 2. Tiles Disappearing on Dropdown Click ✅ FIXED  
- **Root Cause**: Event bubbling conflicts between dropdown interactions and collapsible card toggles
- **Fix Applied**:
  - Added `stopPropagation()` to collapse toggle events
  - Enhanced interactive element detection (buttons, selects, inputs)
  - Added safeguards to prevent collapse when clicking on dropdowns
  - Improved event handler specificity

### 3. Enhanced Error Handling & Debugging ✅ ADDED
- **Added**: Debug mode with detailed console logging
- **Added**: Null-safe DOM element selection
- **Added**: Comprehensive error logging with context
- **Added**: Memory management warnings

## Manual Testing Instructions

### Prerequisites
1. Open `DATAPHREAK.html` in a modern browser (Chrome, Firefox, Edge)
2. Open browser Developer Tools (F12)
3. Navigate to Console tab

### Quick Test Suite (Automated)
1. Copy and paste contents of `test-script.js` into browser console
2. Press Enter to run automated tests
3. Check console output for test results

### Manual Testing Steps

#### Test 1: Basic Functionality
1. **Load Sample Data**:
   - Click "✨ Try Sample Data" button
   - Verify data loads (400 rows, multiple columns)
   - Check that KPI cards update with row/column counts

2. **Test Dropdown Interactions**:
   - Try clicking dropdowns in different sections
   - Verify tiles/cards don't collapse when using dropdowns
   - Test dataset switcher, field selectors, view mode toggles

#### Test 2: Clean All Function
1. **With Data Loaded**:
   - Enable debug mode: `window.DATAPHREAK_DEBUG = true`
   - Click "🧹 Clean All" button
   - Watch console for debug logs
   - Verify button changes to "🔄 Cleaning..." then back to "🧹 Clean All"
   - Check that operation completes without errors

2. **Without Data Loaded**:
   - Refresh page (clear data)
   - Click "🧹 Clean All" button  
   - Verify error message appears: "Please load data first"

#### Test 3: Collapsible Cards
1. **Test Collapse Toggles**:
   - Click chevron (▼) icons in section headers
   - Verify sections collapse/expand properly
   - Try clicking different areas of headers

2. **Test Interactive Elements**:
   - Click buttons in section headers (should not collapse)
   - Click dropdowns in section headers (should not collapse)
   - Click empty areas of headers (should collapse)

#### Test 4: Error Scenarios
1. **Large File Warning**:
   - Load a large CSV file (>1M cells if available)
   - Try "Clean All" operation
   - Verify warning dialog appears

2. **Invalid Operations**:
   - Load data
   - Uncheck all cleaning operations 
   - Click "Apply Changes"
   - Verify error message: "No operations selected"

## Expected Behavior After Fixes

### ✅ Clean All Function Should:
- Work without breaking the webpage
- Show progress indicator while processing
- Display helpful error messages for invalid states
- Complete successfully with loaded data
- Be preventable from double-clicking

### ✅ Dropdown Interactions Should:
- Not cause tiles/cards to collapse accidentally
- Work normally in all sections
- Maintain their selected values
- Not interfere with page layout

### ✅ Error Handling Should:
- Provide clear, actionable error messages
- Log detailed information when debug mode is enabled
- Gracefully handle edge cases
- Not crash the application

## Debugging Features

### Enable Debug Mode
```javascript
// In browser console:
window.DATAPHREAK_DEBUG = true;
```

### Debug Functions Available
- `debugLog(category, message, data)` - Conditional logging
- `debugError(category, error, context)` - Error logging with context
- Enhanced element selectors with error handling

### Console Commands for Testing
```javascript
// Test individual functions
dataphreak_tests.testDOMElements();
dataphreak_tests.testLoadSample();
dataphreak_tests.testCleanAllSafety();

// Check current state
console.log('STATE:', window.STATE);
console.log('Headers:', window.STATE?.headers);
console.log('Row count:', window.STATE?.rows?.length);
```

## Reporting Issues

If you encounter issues after these fixes:

1. **Enable debug mode** and reproduce the issue
2. **Copy console logs** showing the error
3. **Note the exact steps** that caused the problem
4. **Include browser info** (Chrome 120, Firefox 121, etc.)
5. **Describe expected vs actual behavior**

## Test Files
- `TEST.csv` - 400 rows of customer data with intentional issues
- `test-script.js` - Automated testing script
- Use these files to validate the fixes work correctly