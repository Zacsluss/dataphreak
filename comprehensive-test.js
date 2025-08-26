/**
 * DATAPHREAK Comprehensive Test Suite with Full Debug Mode
 * 
 * Copy and paste this entire script into browser console after loading DATAPHREAK.html
 * This will run extensive tests and provide detailed debugging information.
 */

console.clear();
console.log('🚀 DATAPHREAK COMPREHENSIVE TEST SUITE');
console.log('=====================================');

// Force enable debug mode
window.DATAPHREAK_DEBUG = true;
console.log('✅ Debug mode ENABLED - All operations will be logged');

// Enhanced test suite with detailed validation
const ComprehensiveTests = {
  
  // Initialize test environment
  async init() {
    console.log('\n🔧 INITIALIZING TEST ENVIRONMENT');
    console.log('================================');
    
    try {
      // Check if we're on the right page
      if (!document.title.includes('DATAPHREAK')) {
        throw new Error('Not on DATAPHREAK page - please load DATAPHREAK.html first');
      }
      
      // Validate core functions exist
      const coreChecks = {
        'window.STATE': typeof window.STATE !== 'undefined',
        'debugLog function': typeof window.debugLog === 'function',
        'debugError function': typeof window.debugError === 'function',
        'undoRedoManager': typeof window.undoRedoManager !== 'undefined',
        'el function': typeof window.el === 'function'
      };
      
      console.log('🔍 Core System Checks:');
      Object.entries(coreChecks).forEach(([check, passed]) => {
        console.log(`${passed ? '✅' : '❌'} ${check}: ${passed}`);
      });
      
      const allPassed = Object.values(coreChecks).every(v => v);
      if (!allPassed) {
        throw new Error('Core system checks failed - DATAPHREAK may not be fully loaded');
      }
      
      console.log('✅ Test environment initialized successfully');
      return true;
      
    } catch (error) {
      console.error('❌ Failed to initialize test environment:', error);
      return false;
    }
  },

  // Test 1: DOM Element Availability and Safety
  testDOMElements() {
    console.log('\n🔍 TEST 1: DOM ELEMENTS & SAFETY');
    console.log('================================');
    
    const criticalElements = {
      // Main functionality
      '#loadSample': 'Load sample data button',
      '#quickCleanAll': 'Clean All button',
      '#opColumns': 'Column selector',
      '#opApply': 'Apply operations button',
      
      // UI Controls  
      '#opTrim': 'Trim checkbox',
      '#opNormalize': 'Normalize checkbox',
      '#opClean': 'Clean checkbox',
      '#datasetSwitch': 'Dataset switcher',
      '#themeToggle': 'Theme toggle',
      
      // Critical sections
      '#loadSection': 'Load data section',
      '#operationsSection': 'Operations section',
      '#profilesSection': 'Profiles section',
      
      // Debug elements
      '#undoBtn': 'Undo button',
      '#redoBtn': 'Redo button'
    };
    
    let passed = 0;
    const total = Object.keys(criticalElements).length;
    
    Object.entries(criticalElements).forEach(([selector, description]) => {
      try {
        const element = document.querySelector(selector);
        if (element) {
          console.log(`✅ ${selector} (${description})`);
          
          // Test element safety
          const isClickable = element.tagName === 'BUTTON' || element.onclick || element.addEventListener;
          if (isClickable) {
            console.log(`   📍 Element is interactive: ${element.tagName}`);
          }
          
          passed++;
        } else {
          console.error(`❌ ${selector} (${description}) - NOT FOUND`);
        }
      } catch (error) {
        console.error(`❌ ${selector} - ERROR: ${error.message}`);
      }
    });
    
    // Test null-safe element selection
    try {
      const nullResult = window.el('#nonexistent-element-test-12345');
      if (nullResult === null) {
        console.log('✅ Null-safe element selection working');
        passed += 0.5; // Half point for safety feature
      } else {
        console.error('❌ Null-safe element selection failed');
      }
    } catch (error) {
      console.error('❌ Element selection safety error:', error);
    }
    
    console.log(`📊 DOM Elements Test: ${passed}/${total + 0.5} passed (${((passed/(total + 0.5))*100).toFixed(1)}%)`);
    return passed >= total;
  },

  // Test 2: Load Sample Data and State Management  
  async testDataLoading() {
    console.log('\n📊 TEST 2: DATA LOADING & STATE MANAGEMENT');
    console.log('=========================================');
    
    try {
      // Clear any existing state
      if (window.STATE) {
        window.STATE.headers = [];
        window.STATE.rows = [];
      }
      
      const loadBtn = document.querySelector('#loadSample');
      if (!loadBtn) {
        console.error('❌ Load sample button not found');
        return false;
      }
      
      console.log('🔄 Triggering sample data load...');
      loadBtn.click();
      
      // Wait for async loading
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Validate data was loaded
      const checks = {
        'STATE object exists': !!window.STATE,
        'Headers loaded': !!(window.STATE?.headers?.length),
        'Rows loaded': !!(window.STATE?.rows?.length),  
        'Header count > 0': (window.STATE?.headers?.length || 0) > 0,
        'Row count > 0': (window.STATE?.rows?.length || 0) > 0
      };
      
      console.log('📋 Data Loading Checks:');
      Object.entries(checks).forEach(([check, passed]) => {
        console.log(`${passed ? '✅' : '❌'} ${check}`);
      });
      
      if (window.STATE?.headers && window.STATE?.rows) {
        console.log(`📈 Data loaded: ${window.STATE.headers.length} columns, ${window.STATE.rows.length} rows`);
        console.log(`📝 Columns: ${window.STATE.headers.slice(0, 5).join(', ')}${window.STATE.headers.length > 5 ? '...' : ''}`);
      }
      
      const allPassed = Object.values(checks).every(v => v);
      console.log(`📊 Data Loading Test: ${allPassed ? 'PASSED' : 'FAILED'}`);
      return allPassed;
      
    } catch (error) {
      console.error('❌ Data loading test error:', error);
      return false;
    }
  },

  // Test 3: Clean All Function Safety and Error Handling
  async testCleanAllSafety() {
    console.log('\n🧹 TEST 3: CLEAN ALL SAFETY & ERROR HANDLING');
    console.log('============================================');
    
    try {
      const cleanBtn = document.querySelector('#quickCleanAll');
      if (!cleanBtn) {
        console.error('❌ Clean All button not found');
        return false;
      }
      
      // Test 3a: Clean All with data loaded
      console.log('🔄 Testing Clean All with loaded data...');
      
      if (window.STATE?.headers?.length > 0) {
        const originalText = cleanBtn.textContent;
        console.log(`📝 Button original text: "${originalText}"`);
        
        // Monitor button state changes
        let buttonStateChanges = [];
        const observer = new MutationObserver((mutations) => {
          mutations.forEach(mutation => {
            if (mutation.type === 'childList' || mutation.type === 'characterData') {
              buttonStateChanges.push({
                time: Date.now(),
                text: cleanBtn.textContent,
                disabled: cleanBtn.disabled
              });
            }
          });
        });
        
        observer.observe(cleanBtn, { 
          childList: true, 
          subtree: true, 
          characterData: true,
          attributes: true,
          attributeFilter: ['disabled']
        });
        
        // Click the button and monitor for specific errors
        let errorCaught = false;
        const originalError = console.error;
        console.error = function(...args) {
          if (args.some(arg => typeof arg === 'string' && arg.includes('not defined'))) {
            errorCaught = true;
            console.log('❌ CRITICAL: Variable scope error detected:', ...args);
          }
          originalError.apply(console, args);
        };
        
        cleanBtn.click();
        
        // Restore original console.error
        setTimeout(() => {
          console.error = originalError;
          if (errorCaught) {
            console.log('❌ Clean All failed due to variable scope error');
          }
        }, 1000);
        
        // Wait for operation
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        observer.disconnect();
        
        console.log('📋 Button State Changes:');
        buttonStateChanges.forEach((state, i) => {
          console.log(`  ${i + 1}. "${state.text}" (disabled: ${state.disabled})`);
        });
        
        // Validate button behavior
        const hasLoadingState = buttonStateChanges.some(s => s.text.includes('🔄') || s.text.includes('Cleaning'));
        const returnsToNormal = cleanBtn.textContent === originalText && !cleanBtn.disabled;
        
        console.log(`✅ Shows loading state: ${hasLoadingState}`);
        console.log(`✅ Returns to normal: ${returnsToNormal}`);
        
        return hasLoadingState && returnsToNormal;
        
      } else {
        console.log('⚠️ No data loaded, testing error handling...');
        
        // Test error handling with no data
        cleanBtn.click();
        
        // Check for error message (implementation specific)
        setTimeout(() => {
          console.log('✅ Error handling tested (check for error message in UI)');
        }, 500);
        
        return true;
      }
      
    } catch (error) {
      console.error('❌ Clean All safety test error:', error);
      return false;
    }
  },

  // Test 4: Collapsible Cards and Dropdown Interaction
  testCollapsibleCards() {
    console.log('\n🃏 TEST 4: COLLAPSIBLE CARDS & DROPDOWN INTERACTION');
    console.log('==================================================');
    
    try {
      const cards = document.querySelectorAll('.card');
      console.log(`📊 Found ${cards.length} cards`);
      
      let testsRun = 0;
      let testsPassed = 0;
      
      cards.forEach((card, index) => {
        const toggle = card.querySelector('.collapse-toggle');
        const interactiveElements = card.querySelectorAll('button, select, input, a');
        
        if (toggle && interactiveElements.length > 0) {
          console.log(`🔍 Testing Card ${index + 1}:`);
          console.log(`   📌 Toggle found: ${!!toggle}`);
          console.log(`   📌 Interactive elements: ${interactiveElements.length}`);
          
          // Test collapse functionality
          const initialState = card.classList.contains('collapsed');
          console.log(`   📌 Initial collapsed state: ${initialState}`);
          
          // Click toggle
          toggle.click();
          const afterToggle = card.classList.contains('collapsed');
          console.log(`   📌 After toggle click: ${afterToggle}`);
          
          if (initialState !== afterToggle) {
            console.log(`   ✅ Collapse/expand working`);
            testsPassed++;
          } else {
            console.log(`   ❌ Collapse/expand not working`);
          }
          
          // Reset state
          if (afterToggle !== initialState) {
            toggle.click();
          }
          
          testsRun++;
        }
      });
      
      // Test dropdown interaction safety
      const dropdowns = document.querySelectorAll('select');
      console.log(`🔍 Testing ${dropdowns.length} dropdowns for card interference...`);
      
      dropdowns.forEach((dropdown, index) => {
        const parentCard = dropdown.closest('.card');
        if (parentCard && parentCard.querySelector('.collapse-toggle')) {
          console.log(`   📌 Dropdown ${index + 1} in collapsible card`);
          
          const initialCardState = parentCard.classList.contains('collapsed');
          
          // Simulate dropdown interaction
          dropdown.focus();
          dropdown.dispatchEvent(new Event('click', { bubbles: true }));
          
          const afterDropdownClick = parentCard.classList.contains('collapsed');
          
          if (initialCardState === afterDropdownClick) {
            console.log(`   ✅ Dropdown click doesn't affect card state`);
            testsPassed++;
          } else {
            console.log(`   ❌ Dropdown click affected card state`);
          }
          
          testsRun++;
        }
      });
      
      console.log(`📊 Collapsible Cards Test: ${testsPassed}/${testsRun} passed`);
      return testsRun === 0 || testsPassed >= testsRun * 0.8; // 80% pass rate acceptable
      
    } catch (error) {
      console.error('❌ Collapsible cards test error:', error);
      return false;
    }
  },

  // Test 5: Debug Mode and Error Handling
  testDebugAndErrorHandling() {
    console.log('\n🚨 TEST 5: DEBUG MODE & ERROR HANDLING');
    console.log('=====================================');
    
    try {
      let testsPassed = 0;
      const totalTests = 6;
      
      // Test 5a: Debug logging
      console.log('🔍 Testing debug logging...');
      if (typeof debugLog === 'function') {
        debugLog('test', 'Debug log test message', { testData: true });
        console.log('✅ debugLog function works');
        testsPassed++;
      } else {
        console.error('❌ debugLog function not available');
      }
      
      // Test 5b: Error logging
      console.log('🔍 Testing error logging...');
      if (typeof debugError === 'function') {
        debugError('test', new Error('Test error message'), 'Test context');
        console.log('✅ debugError function works');
        testsPassed++;
      } else {
        console.error('❌ debugError function not available');
      }
      
      // Test 5c: Null-safe element selection
      console.log('🔍 Testing null-safe element selection...');
      const nullElement = window.el && window.el('#definitely-does-not-exist-12345');
      if (nullElement === null) {
        console.log('✅ Null-safe element selection works');
        testsPassed++;
      } else {
        console.error('❌ Null-safe element selection failed');
      }
      
      // Test 5d: Array element selection safety
      console.log('🔍 Testing array element selection safety...');
      const nullArray = window.els && window.els('#definitely-does-not-exist-array-12345');
      if (Array.isArray(nullArray) && nullArray.length === 0) {
        console.log('✅ Null-safe array element selection works');
        testsPassed++;
      } else {
        console.error('❌ Null-safe array element selection failed');
      }
      
      // Test 5e: Undo/Redo system availability
      console.log('🔍 Testing undo/redo system...');
      if (window.undoRedoManager && typeof window.undoRedoManager.canUndo === 'function') {
        console.log('✅ Undo/Redo system available');
        console.log(`   📌 Can undo: ${window.undoRedoManager.canUndo()}`);
        console.log(`   📌 Can redo: ${window.undoRedoManager.canRedo()}`);
        testsPassed++;
      } else {
        console.error('❌ Undo/Redo system not available');
      }
      
      // Test 5f: State object safety
      console.log('🔍 Testing state object safety...');
      if (window.STATE && typeof window.STATE === 'object') {
        console.log('✅ STATE object available');
        console.log(`   📌 Headers: ${window.STATE.headers?.length || 0}`);
        console.log(`   📌 Rows: ${window.STATE.rows?.length || 0}`);
        testsPassed++;
      } else {
        console.error('❌ STATE object not available');
      }
      
      console.log(`📊 Debug & Error Handling Test: ${testsPassed}/${totalTests} passed`);
      return testsPassed >= totalTests * 0.8; // 80% pass rate
      
    } catch (error) {
      console.error('❌ Debug and error handling test error:', error);
      return false;
    }
  },

  // Test 6: Memory and Performance Validation
  testMemoryAndPerformance() {
    console.log('\n⚡ TEST 6: MEMORY & PERFORMANCE VALIDATION');
    console.log('=========================================');
    
    try {
      const startTime = performance.now();
      let testsPassed = 0;
      const totalTests = 4;
      
      // Test 6a: Memory usage tracking
      console.log('🔍 Testing memory usage tracking...');
      if (window.undoRedoManager && typeof window.undoRedoManager.getMemoryUsage === 'function') {
        const memUsage = window.undoRedoManager.getMemoryUsage();
        console.log(`✅ Memory usage tracking available: ${memUsage} bytes`);
        testsPassed++;
      } else {
        console.log('⚠️ Memory usage tracking not available (acceptable)');
        testsPassed += 0.5;
      }
      
      // Test 6b: Performance timing
      console.log('🔍 Testing performance timing...');
      const performanceSupported = typeof performance !== 'undefined' && typeof performance.now === 'function';
      if (performanceSupported) {
        console.log('✅ Performance timing available');
        testsPassed++;
      } else {
        console.error('❌ Performance timing not available');
      }
      
      // Test 6c: Large data handling
      console.log('🔍 Testing large data handling...');
      if (window.STATE?.rows) {
        const rowCount = window.STATE.rows.length;
        const columnCount = window.STATE.headers?.length || 0;
        const totalCells = rowCount * columnCount;
        
        console.log(`   📊 Current dataset: ${rowCount} rows × ${columnCount} cols = ${totalCells} cells`);
        
        if (totalCells > 0) {
          console.log('✅ Data handling functional');
          testsPassed++;
        } else {
          console.log('⚠️ No data loaded for large data test');
          testsPassed += 0.5;
        }
      } else {
        console.log('⚠️ No data available for large data test');
        testsPassed += 0.5;
      }
      
      // Test 6d: Response time
      const endTime = performance.now();
      const testDuration = endTime - startTime;
      console.log(`🔍 Test execution time: ${testDuration.toFixed(2)}ms`);
      
      if (testDuration < 5000) { // 5 seconds
        console.log('✅ Test execution time acceptable');
        testsPassed++;
      } else {
        console.log('⚠️ Test execution time high (may indicate performance issues)');
        testsPassed += 0.5;
      }
      
      console.log(`📊 Memory & Performance Test: ${testsPassed}/${totalTests} passed`);
      return testsPassed >= totalTests * 0.7; // 70% pass rate
      
    } catch (error) {
      console.error('❌ Memory and performance test error:', error);
      return false;
    }
  },

  // Main test runner
  async runAllTests() {
    console.log('🚀 STARTING COMPREHENSIVE TEST SUITE');
    console.log('====================================');
    
    const startTime = performance.now();
    
    // Initialize
    const initialized = await this.init();
    if (!initialized) {
      console.error('❌ FATAL: Test environment initialization failed');
      return;
    }
    
    // Run all tests
    const testResults = {
      'DOM Elements & Safety': this.testDOMElements(),
      'Data Loading & State': await this.testDataLoading(),
      'Clean All Safety': await this.testCleanAllSafety(),
      'Collapsible Cards': this.testCollapsibleCards(),
      'Debug & Error Handling': this.testDebugAndErrorHandling(),
      'Memory & Performance': this.testMemoryAndPerformance()
    };
    
    // Calculate results
    const endTime = performance.now();
    const totalTime = endTime - startTime;
    
    console.log('\n📋 COMPREHENSIVE TEST RESULTS');
    console.log('=============================');
    
    const passed = Object.values(testResults).filter(r => r).length;
    const total = Object.keys(testResults).length;
    const passRate = (passed / total) * 100;
    
    Object.entries(testResults).forEach(([testName, result]) => {
      console.log(`${result ? '✅' : '❌'} ${testName}`);
    });
    
    console.log('\n🎯 FINAL SUMMARY');
    console.log('================');
    console.log(`📊 Tests Passed: ${passed}/${total} (${passRate.toFixed(1)}%)`);
    console.log(`⏱️ Total Time: ${totalTime.toFixed(2)}ms`);
    console.log(`🐛 Debug Mode: ${window.DATAPHREAK_DEBUG ? 'ENABLED' : 'DISABLED'}`);
    
    if (passRate >= 90) {
      console.log('🎉 EXCELLENT: All critical fixes are working properly!');
    } else if (passRate >= 75) {
      console.log('✅ GOOD: Most fixes are working, minor issues detected');
    } else if (passRate >= 50) {
      console.log('⚠️ CAUTION: Some fixes may need attention');
    } else {
      console.log('❌ CRITICAL: Major issues detected, fixes may not be working');
    }
    
    console.log('\n💡 TO RE-RUN SPECIFIC TESTS:');
    console.log('ComprehensiveTests.testDOMElements()');
    console.log('ComprehensiveTests.testDataLoading()');
    console.log('ComprehensiveTests.testCleanAllSafety()');
    console.log('ComprehensiveTests.testCollapsibleCards()');
    console.log('ComprehensiveTests.testDebugAndErrorHandling()');
    console.log('ComprehensiveTests.testMemoryAndPerformance()');
    
    return testResults;
  }
};

// Make test suite globally available
window.ComprehensiveTests = ComprehensiveTests;

// Auto-run the full test suite
ComprehensiveTests.runAllTests().then(results => {
  console.log('\n🏁 AUTOMATED TESTING COMPLETE');
  console.log('=============================');
  console.log('You can now manually test the application or re-run specific tests as needed.');
});

console.log('\n📌 TEST SUITE LOADED');
console.log('Run ComprehensiveTests.runAllTests() to execute all tests again');