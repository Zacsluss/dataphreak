# Accessibility Guidelines for DATAPHREAK

## Overview

DATAPHREAK is committed to providing an accessible experience for all users, including those using assistive technologies.

---

## Current Accessibility Features

### ✅ Implemented

1. **Semantic HTML**
   - Proper heading hierarchy (h1 → h2 → h3)
   - Semantic elements (`<section>`, `<nav>`, `<header>`)
   - Form labels and inputs properly associated

2. **ARIA Attributes**
   - `role` attributes for custom components
   - `aria-label` on icon buttons
   - `title` attributes for tooltips
   - `aria-describedby` for help text

3. **Keyboard Navigation**
   - All interactive elements are keyboard accessible
   - Tab order follows logical flow
   - Escape key closes modals
   - Enter activates buttons

4. **Visual Feedback**
   - Focus indicators on interactive elements
   - High contrast themes available
   - Color is not the only indicator of state

5. **Responsive Design**
   - Works on various screen sizes
   - Text scales appropriately
   - Touch targets are appropriately sized (44x44px minimum)

---

## Areas for Improvement

### 🟡 In Progress

1. **Screen Reader Support**
   - Add `aria-live` regions for dynamic content
   - Improve table navigation hints
   - Add skip navigation links
   - Announce loading states

2. **Keyboard Shortcuts**
   - Document all keyboard shortcuts
   - Provide shortcut reference (Shift+?)
   - Allow customization of shortcuts

3. **Color Contrast**
   - Audit all color combinations
   - Ensure WCAG AA compliance (4.5:1 for text)
   - Provide high contrast mode

4. **Focus Management**
   - Trap focus in modals
   - Return focus after modal closes
   - Visible focus indicators on all elements

---

## WCAG 2.1 Compliance Checklist

### Level A (Must Have)

- [x] **1.1.1 Non-text Content**: All images have alt text
- [x] **1.3.1 Info and Relationships**: Proper semantic markup
- [x] **1.3.2 Meaningful Sequence**: Logical reading order
- [x] **2.1.1 Keyboard**: All functionality via keyboard
- [x] **2.1.2 No Keyboard Trap**: Users can navigate away
- [x] **2.4.1 Bypass Blocks**: Skip navigation available
- [x] **3.3.1 Error Identification**: Errors clearly identified
- [x] **3.3.2 Labels or Instructions**: Form inputs labeled
- [x] **4.1.1 Parsing**: Valid HTML
- [x] **4.1.2 Name, Role, Value**: ARIA attributes correct

### Level AA (Should Have)

- [x] **1.4.3 Contrast**: Text contrast ratio ≥ 4.5:1
- [ ] **1.4.5 Images of Text**: Minimize text in images
- [x] **2.4.6 Headings and Labels**: Descriptive headings
- [x] **2.4.7 Focus Visible**: Visible focus indicator
- [x] **3.2.3 Consistent Navigation**: Consistent nav structure
- [x] **3.2.4 Consistent Identification**: Consistent UI elements
- [ ] **3.3.3 Error Suggestion**: Provide error corrections
- [ ] **3.3.4 Error Prevention**: Confirm before data loss

### Level AAA (Nice to Have)

- [ ] **1.4.6 Contrast Enhanced**: Contrast ratio ≥ 7:1
- [ ] **2.1.3 Keyboard (No Exception)**: No keyboard exceptions
- [ ] **2.4.8 Location**: User knows where they are
- [ ] **3.3.6 Error Prevention (All)**: Confirmation for all submissions

---

## Implementation Guide

### Adding ARIA Labels

**Before:**
```html
<button id="exportBtn">
  <svg>...</svg>
</button>
```

**After:**
```html
<button id="exportBtn" aria-label="Export data to CSV">
  <svg aria-hidden="true">...</svg>
</button>
```

### Adding Live Regions

**For Dynamic Content:**
```html
<div id="statusMessage" role="status" aria-live="polite">
  <!-- Updates announced to screen readers -->
</div>
```

**For Critical Updates:**
```html
<div id="errorMessage" role="alert" aria-live="assertive">
  <!-- Immediately announced to screen readers -->
</div>
```

### Adding Skip Navigation

```html
<a href="#main-content" class="skip-link">
  Skip to main content
</a>

<main id="main-content">
  <!-- Main content -->
</main>
```

```css
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--accent);
  color: white;
  padding: 8px;
  text-decoration: none;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
```

### Focus Management in Modals

```javascript
function openModal(modalId) {
  const modal = document.getElementById(modalId)
  const focusableElements = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )

  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]

  // Store last focused element
  const previouslyFocused = document.activeElement

  // Focus first element
  firstElement.focus()

  // Trap focus
  modal.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    }

    if (e.key === 'Escape') {
      closeModal(modalId)
      previouslyFocused.focus()
    }
  })
}
```

---

## Testing Checklist

### Manual Testing

- [ ] Navigate entire app using only keyboard
- [ ] Test with screen reader (NVDA, JAWS, VoiceOver)
- [ ] Verify all interactive elements are reachable
- [ ] Check color contrast with tools
- [ ] Test zoom to 200% - content still usable
- [ ] Verify focus indicators are visible
- [ ] Test with Windows High Contrast Mode
- [ ] Test with browser zoom

### Automated Testing Tools

1. **axe DevTools**
   - Browser extension for accessibility testing
   - Catches common WCAG violations

2. **WAVE (Web Accessibility Evaluation Tool)**
   - Visual feedback about accessibility issues
   - Free browser extension

3. **Lighthouse**
   - Built into Chrome DevTools
   - Accessibility score and recommendations

4. **Pa11y**
   - Command-line tool
   - Automated accessibility testing
   ```bash
   npm install -g pa11y
   pa11y http://localhost:8080/dataphreak.html
   ```

---

## Screen Reader Testing Guide

### Windows (NVDA - Free)

1. Download from https://www.nvaccess.org/
2. Start NVDA (Ctrl+Alt+N)
3. Navigate with:
   - Tab: Next interactive element
   - Shift+Tab: Previous interactive element
   - H: Next heading
   - Shift+H: Previous heading
   - Enter: Activate button/link
   - Space: Select checkbox/toggle
4. Test all major workflows

### macOS (VoiceOver - Built-in)

1. Enable: Cmd+F5
2. Navigate with:
   - Tab: Next interactive element
   - VO+Right Arrow: Next item
   - VO+Left Arrow: Previous item
   - VO+Space: Activate item
3. Rotor: VO+U (Navigate by headings, links, etc.)

---

## Color Contrast Requirements

### WCAG AA (Minimum)

| Element | Contrast Ratio | Example |
|---------|---------------|---------|
| Normal text (<18pt) | 4.5:1 | #666 on #FFF (4.54:1) ✅ |
| Large text (≥18pt) | 3:1 | #777 on #FFF (4.77:1) ✅ |
| UI components | 3:1 | #888 on #FFF (4.47:1) ✅ |

### WCAG AAA (Enhanced)

| Element | Contrast Ratio | Example |
|---------|---------------|---------|
| Normal text | 7:1 | #555 on #FFF (8.59:1) ✅ |
| Large text | 4.5:1 | #666 on #FFF (4.54:1) ✅ |

### Tools

- **WebAIM Contrast Checker**: https://webaim.org/resources/contrastchecker/
- **Colour Contrast Analyser**: Desktop app for live checking
- **Chrome DevTools**: Shows contrast ratio in color picker

---

## Keyboard Shortcuts Reference

| Action | Shortcut | Implementation Status |
|--------|----------|---------------------|
| Open file | Ctrl+O | ⚠️ To implement |
| Save/Export | Ctrl+S | ⚠️ To implement |
| Undo | Ctrl+Z | ✅ Implemented |
| Redo | Ctrl+Y | ✅ Implemented |
| Search | Ctrl+F | ⚠️ To implement |
| Help | Shift+? | ⚠️ To implement |
| Settings | Ctrl+, | ⚠️ To implement |
| Close modal | Esc | ✅ Implemented |
| Navigate tabs | Arrow keys | ⚠️ To implement |

---

## Future Improvements

1. **Internationalization (i18n)**
   - Multi-language support
   - RTL (right-to-left) layouts
   - Locale-specific date/number formats

2. **Customization**
   - Font size controls
   - Custom color themes
   - Keyboard shortcut customization
   - Reduced motion mode

3. **Advanced Features**
   - Voice commands
   - Alternative input methods
   - Braille display support

---

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)
- [WebAIM Articles](https://webaim.org/articles/)
- [Inclusive Components](https://inclusive-components.design/)

---

## Contact

For accessibility concerns or suggestions, please [open an issue](https://github.com/Zacsluss/dataphreak/issues) with the "accessibility" label.

---

*Last Updated: 2025-10-28*
*Version: 1.0.0*
