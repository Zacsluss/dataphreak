# Contributing to DATAPHREAK

Thank you for your interest in contributing to DATAPHREAK! This document provides guidelines for contributing to the project.

## 🎯 Project Philosophy

DATAPHREAK is designed as a **single-file, zero-dependency data analysis tool** that prioritizes:
- **Privacy First**: 100% offline processing, no data upload
- **Simplicity**: One HTML file, works anywhere
- **Professional Quality**: Enterprise-grade features, free forever
- **Accessibility**: Easy to use, no installation required

## 🤝 How to Contribute

### Reporting Bugs

Found a bug? Help us fix it!

1. **Check existing issues** - Someone may have already reported it
2. **Create a detailed report** - Include:
   - Steps to reproduce the issue
   - Expected behavior vs actual behavior
   - Browser and OS version
   - Sample data if applicable (anonymized)
   - Screenshots if relevant

**File bug reports here**: [GitHub Issues](https://github.com/Zacsluss/DATAPHREAK/issues/new)

### Suggesting Features

Have an idea for improvement?

1. **Check existing issues** - Your idea might already be proposed
2. **Describe the use case** - Why is this feature valuable?
3. **Explain the solution** - How should it work?
4. **Consider alternatives** - What other approaches did you consider?

**Submit feature requests here**: [GitHub Issues](https://github.com/Zacsluss/DATAPHREAK/issues/new)

### Contributing Code

Ready to submit code? Great! Here's how:

#### 1. Fork & Clone

```bash
# Fork the repository on GitHub, then:
git clone https://github.com/YOUR_USERNAME/DATAPHREAK.git
cd DATAPHREAK
```

#### 2. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

#### 3. Make Your Changes

**Important**: DATAPHREAK is a single-file application (`DATAPHREAK.html`). All changes must:
- ✅ Preserve the single-file architecture
- ✅ Maintain 100% offline functionality
- ✅ Include no external dependencies (except embedded SheetJS)
- ✅ Work in all modern browsers (Chrome 80+, Firefox 75+, Safari 13+, Edge 80+)
- ✅ Follow existing code style and conventions
- ✅ Include appropriate comments for complex logic

#### 4. Test Thoroughly

Before submitting, test your changes with:
- **Small files** (< 1,000 rows)
- **Medium files** (10,000 - 100,000 rows)
- **Large files** (500,000+ rows if applicable)
- **Edge cases** (empty files, malformed data, special characters)
- **All three themes** (Dark, Light, Matrix)
- **Multiple browsers** (Chrome, Firefox, Safari, Edge)

#### 5. Commit with Clear Messages

```bash
git add DATAPHREAK.html
git commit -m "Add fuzzy matching threshold adjustment UI

- Added slider control for similarity threshold (0.5-1.0)
- Updated UI to show current threshold value
- Preserves user preference in localStorage
- Tested with 100K row dataset"
```

Good commit messages:
- Use present tense ("Add feature" not "Added feature")
- Describe what and why, not just what
- Reference issue numbers if applicable (#123)

#### 6. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub with:
- **Clear title** - Summarize the change
- **Detailed description** - What does it do? Why is it needed?
- **Testing notes** - How did you test it?
- **Screenshots** - If UI changes, include before/after images

## 📋 Code Style Guidelines

### JavaScript
- Use `const` for constants, `let` for variables (never `var`)
- Use arrow functions for callbacks and short functions
- Use template literals for string interpolation
- Use meaningful variable names (no single letters except loop counters)
- Add comments for complex algorithms or non-obvious logic
- Wrap code in try/catch blocks where appropriate

### CSS
- Use CSS variables (defined in `:root`) for colors and shared values
- Follow existing naming conventions
- Ensure styles work in all three themes (Dark, Light, Matrix)
- Use flexbox/grid for layouts (avoid floats)
- Mobile-first responsive design

### HTML
- Use semantic HTML5 elements
- Include `aria-*` attributes for accessibility
- Add `title` attributes to buttons and controls
- Ensure proper nesting and indentation

## 🔍 What We're Looking For

### High Priority
- 🐛 **Bug fixes** - Especially for edge cases or browser compatibility
- ♿ **Accessibility improvements** - WCAG 2.1 AA compliance
- 📊 **Performance optimizations** - Faster processing for large datasets
- 🎨 **UI/UX enhancements** - Better user experience, clearer workflows
- 📖 **Documentation improvements** - Clearer explanations, more examples

### Medium Priority
- ✨ **New data cleaning features** - Additional pattern detection, transformations
- 📈 **Visualization enhancements** - Better charts, more chart types
- 🔧 **Quality of life improvements** - Keyboard shortcuts, better defaults
- 🌐 **Internationalization** - Multi-language support

### Lower Priority (But Still Welcome!)
- 🎨 **New themes** - Additional color schemes
- 🎯 **Advanced features** - Complex transformations, custom scripting
- 🔌 **Integration options** - Export to more formats

## ❌ What We Won't Accept

To maintain DATAPHREAK's core philosophy, we cannot accept:

- ❌ **External dependencies** (except embedding libraries like SheetJS)
- ❌ **Multi-file architecture** (breaks single-file distribution model)
- ❌ **Cloud/server features** (violates privacy guarantee)
- ❌ **Tracking/analytics** (violates privacy policy)
- ❌ **Login/authentication** (not needed for offline tool)
- ❌ **Breaking changes** without strong justification
- ❌ **Code that only works in one browser**

## 📜 License

By contributing to DATAPHREAK, you agree that your contributions will be licensed under the [MIT License](LICENSE).

## 💬 Questions?

- **Technical questions**: [Open a discussion](https://github.com/Zacsluss/DATAPHREAK/discussions)
- **Bug reports**: [File an issue](https://github.com/Zacsluss/DATAPHREAK/issues/new)
- **General inquiries**: [Email zacsluss@yahoo.com](mailto:zacsluss@yahoo.com)

## 🙏 Thank You

Every contribution, whether it's code, documentation, bug reports, or feature suggestions, helps make DATAPHREAK better for everyone. We appreciate your time and effort!

---

**Built with ❤️ by the DATAPHREAK community**

[⬅️ Back to README](README.md)
