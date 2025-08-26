/**
 * Collapse Functionality Test
 * 
 * Run this in browser console after loading DATAPHREAK.html
 */

console.clear();
console.log('🔍 TESTING COLLAPSE FUNCTIONALITY');
console.log('================================');

// Test each collapsible card
const cards = document.querySelectorAll('.card');
console.log(`Found ${cards.length} cards`);

cards.forEach((card, index) => {
  const h2 = card.querySelector('h2');
  const toggle = card.querySelector('.collapse-toggle');
  const cardId = card.id || `card-${index}`;
  
  if (h2 && toggle) {
    console.log(`\n📋 Testing Card: ${cardId}`);
    console.log(`   Title: "${h2.textContent.split('▼')[0].trim()}"`);
    
    // Test initial state
    const initialCollapsed = card.classList.contains('collapsed');
    console.log(`   Initial state: ${initialCollapsed ? 'COLLAPSED' : 'EXPANDED'}`);
    
    // Test chevron click
    console.log('   🔄 Testing chevron click...');
    toggle.click();
    const afterChevron = card.classList.contains('collapsed');
    console.log(`   After chevron: ${afterChevron ? 'COLLAPSED' : 'EXPANDED'}`);
    
    if (initialCollapsed !== afterChevron) {
      console.log('   ✅ Chevron click WORKS');
    } else {
      console.log('   ❌ Chevron click FAILED');
    }
    
    // Reset and test title click
    if (afterChevron !== initialCollapsed) {
      toggle.click(); // Reset
    }
    
    console.log('   🔄 Testing title click...');
    const titleClickable = h2.style.cursor === 'pointer';
    console.log(`   Title clickable: ${titleClickable}`);
    
    if (titleClickable) {
      h2.click();
      const afterTitle = card.classList.contains('collapsed');
      console.log(`   After title: ${afterTitle ? 'COLLAPSED' : 'EXPANDED'}`);
      
      if (initialCollapsed !== afterTitle) {
        console.log('   ✅ Title click WORKS');
      } else {
        console.log('   ❌ Title click FAILED');
      }
      
      // Reset
      if (afterTitle !== initialCollapsed) {
        toggle.click();
      }
    }
  } else {
    console.log(`\n⚠️ Card ${cardId}: Missing h2 or toggle`);
  }
});

console.log('\n💡 MANUAL TEST:');
console.log('1. Try clicking the chevron arrows (▼)');
console.log('2. Try clicking the tile titles themselves');
console.log('3. Both should collapse/expand the sections');