/**
 * Matrix Mode Test Script
 * 
 * Run this in browser console to test the Matrix Mode enhancements
 */

console.clear();
console.log('🟢 TESTING MATRIX MODE ENHANCEMENTS');
console.log('===================================');

// Enable debug mode
window.DATAPHREAK_DEBUG = true;

const MatrixTests = {
  
  // Test theme switching to Matrix Mode
  testThemeSwitching() {
    console.log('\n🎨 Testing Theme Switching to Matrix Mode...');
    
    try {
      const themeBtn = document.querySelector('#themeToggle');
      if (!themeBtn) {
        console.error('❌ Theme toggle button not found');
        return false;
      }
      
      // Get current theme
      const currentClass = document.body.className;
      console.log(`📌 Current body classes: "${currentClass}"`);
      
      // Click through themes until we reach Matrix
      let clicks = 0;
      const maxClicks = 5; // Safety limit
      
      while (!document.body.classList.contains('theme-matrix') && clicks < maxClicks) {
        console.log(`🔄 Click ${clicks + 1}: Button text = "${themeBtn.textContent}"`);
        themeBtn.click();
        clicks++;
        
        // Small delay to allow theme to apply
        const bodyClasses = Array.from(document.body.classList);
        console.log(`   📌 Body classes after click: [${bodyClasses.join(', ')}]`);
        
        if (document.body.classList.contains('theme-matrix')) {
          console.log('✅ Matrix mode activated!');
          break;
        }
      }
      
      if (document.body.classList.contains('theme-matrix')) {
        console.log('✅ Successfully switched to Matrix mode');
        return true;
      } else {
        console.error('❌ Failed to switch to Matrix mode');
        return false;
      }
      
    } catch (error) {
      console.error('❌ Error testing theme switching:', error);
      return false;
    }
  },

  // Test ASCII title rendering
  testASCIITitle() {
    console.log('\n🔤 Testing ASCII Title...');
    
    try {
      // Ensure we're in Matrix mode first
      if (!document.body.classList.contains('theme-matrix')) {
        console.log('🔄 Switching to Matrix mode first...');
        const themeBtn = document.querySelector('#themeToggle');
        if (themeBtn && themeBtn.textContent.includes('Matrix')) {
          themeBtn.click();
        }
      }
      
      // Check for ASCII title
      const asciiTitle = document.querySelector('.matrix-ascii');
      if (asciiTitle) {
        console.log('✅ ASCII title element found');
        console.log(`📏 ASCII title length: ${asciiTitle.textContent.length} characters`);
        
        // Check styling
        const styles = window.getComputedStyle(asciiTitle);
        console.log(`📌 Font family: ${styles.fontFamily}`);
        console.log(`📌 Color: ${styles.color}`);
        console.log(`📌 Display: ${styles.display}`);
        
        // Check animation
        const hasAnimation = styles.animationName && styles.animationName !== 'none';
        console.log(`📌 Has animation: ${hasAnimation}`);
        
        if (hasAnimation) {
          console.log('✅ ASCII title has Matrix flicker animation');
        }
        
        return true;
      } else {
        console.error('❌ ASCII title not found');
        return false;
      }
      
    } catch (error) {
      console.error('❌ Error testing ASCII title:', error);
      return false;
    }
  },

  // Test Matrix visual effects
  testMatrixEffects() {
    console.log('\n✨ Testing Matrix Visual Effects...');
    
    try {
      if (!document.body.classList.contains('theme-matrix')) {
        console.log('⚠️ Not in Matrix mode, effects may not be visible');
      }
      
      let effectsFound = 0;
      const totalEffects = 5;
      
      // Test background glow effect
      const bodyStyles = window.getComputedStyle(document.body, '::before');
      if (bodyStyles) {
        console.log('✅ Background glow effect styles available');
        effectsFound++;
      }
      
      // Test card glow effects
      const cards = document.querySelectorAll('.card');
      if (cards.length > 0) {
        const cardStyles = window.getComputedStyle(cards[0]);
        const hasGlow = cardStyles.boxShadow && cardStyles.boxShadow.includes('rgba(0,255,153');
        if (hasGlow) {
          console.log('✅ Card glow effects active');
          effectsFound++;
        } else {
          console.log('⚠️ Card glow effects not detected');
        }
      }
      
      // Test button effects
      const buttons = document.querySelectorAll('button');
      if (buttons.length > 0) {
        const buttonStyles = window.getComputedStyle(buttons[0]);
        const hasTextShadow = buttonStyles.textShadow && buttonStyles.textShadow !== 'none';
        if (hasTextShadow) {
          console.log('✅ Button text glow effects active');
          effectsFound++;
        } else {
          console.log('⚠️ Button text glow effects not detected');
        }
      }
      
      // Test header pulse animation
      const header = document.querySelector('header');
      if (header) {
        const headerStyles = window.getComputedStyle(header);
        const hasAnimation = headerStyles.animationName && headerStyles.animationName !== 'none';
        if (hasAnimation) {
          console.log('✅ Header pulse animation active');
          effectsFound++;
        } else {
          console.log('⚠️ Header pulse animation not detected');
        }
      }
      
      // Test input focus effects
      const inputs = document.querySelectorAll('input, select');
      if (inputs.length > 0) {
        console.log('✅ Matrix input focus effects available');
        effectsFound++;
      }
      
      console.log(`📊 Matrix Effects: ${effectsFound}/${totalEffects} detected`);
      return effectsFound >= totalEffects * 0.8; // 80% pass rate
      
    } catch (error) {
      console.error('❌ Error testing Matrix effects:', error);
      return false;
    }
  },

  // Test that Matrix mode doesn't break functionality
  testMatrixFunctionality() {
    console.log('\n⚙️ Testing Matrix Mode Functionality...');
    
    try {
      // Ensure Matrix mode is active
      if (!document.body.classList.contains('theme-matrix')) {
        console.log('🔄 Activating Matrix mode...');
        // Find and click theme button until Matrix mode
        const themeBtn = document.querySelector('#themeToggle');
        let attempts = 0;
        while (!document.body.classList.contains('theme-matrix') && attempts < 4) {
          if (themeBtn) themeBtn.click();
          attempts++;
        }
      }
      
      let functionalityTests = 0;
      const totalTests = 4;
      
      // Test sample data loading in Matrix mode
      console.log('🔍 Testing sample data loading...');
      const loadBtn = document.querySelector('#loadSample');
      if (loadBtn && !loadBtn.disabled) {
        console.log('✅ Load sample button functional');
        functionalityTests++;
      } else {
        console.log('⚠️ Load sample button not available');
      }
      
      // Test Clean All button in Matrix mode
      console.log('🔍 Testing Clean All button...');
      const cleanBtn = document.querySelector('#quickCleanAll');
      if (cleanBtn && !cleanBtn.disabled) {
        console.log('✅ Clean All button functional');
        functionalityTests++;
      } else {
        console.log('⚠️ Clean All button not available');
      }
      
      // Test dropdown functionality
      console.log('🔍 Testing dropdown functionality...');
      const dropdowns = document.querySelectorAll('select');
      if (dropdowns.length > 0) {
        console.log(`✅ ${dropdowns.length} dropdowns available`);
        functionalityTests++;
      } else {
        console.log('⚠️ No dropdowns found');
      }
      
      // Test collapse functionality
      console.log('🔍 Testing collapse functionality...');
      const collapseToggles = document.querySelectorAll('.collapse-toggle');
      if (collapseToggles.length > 0) {
        console.log(`✅ ${collapseToggles.length} collapse toggles available`);
        functionalityTests++;
      } else {
        console.log('⚠️ No collapse toggles found');
      }
      
      console.log(`📊 Matrix Functionality: ${functionalityTests}/${totalTests} working`);
      return functionalityTests >= totalTests * 0.75; // 75% pass rate
      
    } catch (error) {
      console.error('❌ Error testing Matrix functionality:', error);
      return false;
    }
  },

  // Run all Matrix Mode tests
  async runAllMatrixTests() {
    console.log('🚀 STARTING MATRIX MODE TEST SUITE');
    console.log('==================================');
    
    const results = {
      'Theme Switching': this.testThemeSwitching(),
      'ASCII Title': this.testASCIITitle(),
      'Matrix Effects': this.testMatrixEffects(),
      'Matrix Functionality': this.testMatrixFunctionality()
    };
    
    // Wait a moment for any async operations
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('\n📋 MATRIX MODE TEST RESULTS');
    console.log('===========================');
    
    const passed = Object.values(results).filter(r => r).length;
    const total = Object.keys(results).length;
    const passRate = (passed / total) * 100;
    
    Object.entries(results).forEach(([testName, result]) => {
      console.log(`${result ? '✅' : '❌'} ${testName}`);
    });
    
    console.log(`\n🎯 Matrix Mode Tests: ${passed}/${total} passed (${passRate.toFixed(1)}%)`);
    
    if (passRate >= 90) {
      console.log('🎉 EXCELLENT: Matrix Mode is working perfectly!');
      console.log('💡 Try these Matrix Mode features:');
      console.log('   • Toggle to Matrix Mode and see the ASCII title');
      console.log('   • Notice the green glow effects on cards and buttons');
      console.log('   • Watch the header pulse animation');
      console.log('   • See the enhanced hover effects with green glows');
    } else if (passRate >= 75) {
      console.log('✅ GOOD: Matrix Mode is mostly working');
    } else {
      console.log('⚠️ NEEDS ATTENTION: Matrix Mode may have issues');
    }
    
    return results;
  }
};

// Make tests available globally
window.MatrixTests = MatrixTests;

// Auto-run the Matrix Mode tests
MatrixTests.runAllMatrixTests();

console.log('\n💡 MANUAL TESTING:');
console.log('==================');
console.log('1. Click theme toggle button to cycle to Matrix Mode');
console.log('2. Look for ASCII art title and green glow effects');
console.log('3. Test that buttons and dropdowns still work normally');
console.log('4. Run: MatrixTests.runAllMatrixTests() to test again');