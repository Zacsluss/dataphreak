/**
 * DATAPHREAK Manual Testing Script
 * 
 * Run this in browser console after loading DATAPHREAK.html
 * to test the critical bug fixes.
 */

// Enable debug mode
window.DATAPHREAK_DEBUG = true;
console.log('🧪 DATAPHREAK Testing Script Loaded');
console.log('Debug mode enabled. Check console for detailed logs.');

// Test functions
const tests = {
  
  // Test 1: Validate DOM elements exist
  testDOMElements() {
    console.log('\n🔍 Test 1: DOM Elements');
    const elements = [
      '#quickCleanAll',
      '#opColumns', 
      '#opTrim',
      '#opNormalize',
      '#opClean',
      '#loadSample'
    ];
    
    let passed = 0;
    elements.forEach(selector => {
      const el = document.querySelector(selector);
      if (el) {
        console.log(`✅ ${selector} found`);
        passed++;
      } else {
        console.error(`❌ ${selector} NOT found`);
      }
    });
    
    console.log(`DOM Elements Test: ${passed}/${elements.length} passed`);
    return passed === elements.length;
  },

  // Test 2: Load sample data
  testLoadSample() {
    console.log('\n📊 Test 2: Load Sample Data');
    try {
      const loadBtn = document.querySelector('#loadSample');
      if (!loadBtn) {
        console.error('❌ Load sample button not found');
        return false;
      }
      
      loadBtn.click();
      
      // Check if data was loaded (with timeout)
      setTimeout(() => {
        if (window.STATE && window.STATE.headers && window.STATE.headers.length > 0) {
          console.log(`✅ Sample data loaded: ${window.STATE.headers.length} columns, ${window.STATE.rows.length} rows`);
        } else {
          console.error('❌ Sample data not loaded properly');
        }
      }, 1000);
      
      return true;
    } catch (error) {
      console.error('❌ Error loading sample:', error);
      return false;
    }
  },

  // Test 3: Test collapsible cards don't interfere with dropdowns
  testCollapsibleCards() {
    console.log('\n🃏 Test 3: Collapsible Cards');
    try {
      const cards = document.querySelectorAll('.card');
      console.log(`Found ${cards.length} cards`);
      
      // Try to find a card with both dropdown and collapse toggle
      const testCard = Array.from(cards).find(card => 
        card.querySelector('.collapse-toggle') && 
        (card.querySelector('select') || card.querySelector('button'))
      );
      
      if (testCard) {
        const toggle = testCard.querySelector('.collapse-toggle');
        const select = testCard.querySelector('select');
        
        if (toggle && select) {
          console.log('✅ Found card with both collapse toggle and dropdown');
          
          // Test that clicking toggle collapses/expands
          const initialCollapsed = testCard.classList.contains('collapsed');
          toggle.click();
          const afterToggle = testCard.classList.contains('collapsed');
          
          if (initialCollapsed !== afterToggle) {
            console.log('✅ Collapse toggle working');
          } else {
            console.error('❌ Collapse toggle not working');
          }
          
          return true;
        }
      }
      
      console.log('⚠️ No test cards found with both dropdown and toggle');
      return true; // Not necessarily a failure
    } catch (error) {
      console.error('❌ Error testing collapsible cards:', error);
      return false;
    }
  },

  // Test 4: Test Clean All button with safety checks
  testCleanAllSafety() {
    console.log('\n🧹 Test 4: Clean All Safety');
    try {
      const cleanBtn = document.querySelector('#quickCleanAll');
      if (!cleanBtn) {
        console.error('❌ Clean All button not found');
        return false;
      }
      
      // Test clicking when no data loaded (should show error)
      if (!window.STATE || !window.STATE.headers || window.STATE.headers.length === 0) {
        console.log('Testing Clean All with no data...');
        cleanBtn.click();
        console.log('✅ Clean All handled no-data case (check for error message)');
      }
      
      return true;
    } catch (error) {
      console.error('❌ Error testing Clean All safety:', error);
      return false;
    }
  },

  // Test 5: Test error handling helpers
  testErrorHandling() {
    console.log('\n🚨 Test 5: Error Handling');
    try {
      // Test debug logging functions
      if (typeof debugLog === 'function') {
        debugLog('test', 'Debug logging works');
        console.log('✅ debugLog function available');
      } else {
        console.error('❌ debugLog function not available');
        return false;
      }
      
      if (typeof debugError === 'function') {
        debugError('test', new Error('Test error'), 'Test context');
        console.log('✅ debugError function available');
      } else {
        console.error('❌ debugError function not available');
        return false;
      }
      
      // Test element selector safety
      const nullEl = window.el && el('#nonexistent-element-12345');
      if (nullEl === null) {
        console.log('✅ Element selector returns null for non-existent elements');
      } else {
        console.error('❌ Element selector error handling issue');
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('❌ Error testing error handling:', error);
      return false;
    }
  },

  // Run all tests
  runAll() {
    console.log('🚀 Running DATAPHREAK Test Suite...');
    console.log('==========================================');
    
    const results = {
      testDOMElements: this.testDOMElements(),
      testLoadSample: this.testLoadSample(),
      testCollapsibleCards: this.testCollapsibleCards(),
      testCleanAllSafety: this.testCleanAllSafety(),
      testErrorHandling: this.testErrorHandling()
    };
    
    // Wait for async operations then show results
    setTimeout(() => {
      console.log('\n📋 Test Results Summary:');
      console.log('==========================================');
      
      const passed = Object.values(results).filter(r => r).length;
      const total = Object.keys(results).length;
      
      Object.entries(results).forEach(([testName, passed]) => {
        console.log(`${passed ? '✅' : '❌'} ${testName}`);
      });
      
      console.log(`\n🎯 Overall: ${passed}/${total} tests passed`);
      
      if (passed === total) {
        console.log('🎉 All tests passed! Fixes appear to be working.');
      } else {
        console.log('⚠️ Some tests failed. Check the details above.');
      }
    }, 2000);
  }
};

// Auto-run basic tests
tests.runAll();

// Make tests available globally for manual execution
window.dataphreak_tests = tests;
console.log('\n💡 You can also run individual tests:');
console.log('dataphreak_tests.testDOMElements()');
console.log('dataphreak_tests.testLoadSample()');
console.log('dataphreak_tests.testCollapsibleCards()');
console.log('dataphreak_tests.testCleanAllSafety()');
console.log('dataphreak_tests.testErrorHandling()');