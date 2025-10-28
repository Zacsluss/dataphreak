# Development Guide

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn
- Modern web browser
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/Zacsluss/dataphreak.git
cd dataphreak

# Install dependencies
npm install

# Run tests
npm test

# Run linter
npm run lint

# Start development server
npm run serve
# Open http://localhost:8080/dataphreak.html
```

---

## Project Structure

```
dataphreak/
├── .github/
│   └── workflows/
│       └── ci.yml              # GitHub Actions CI
├── docs/
│   ├── API.md                  # API documentation
│   ├── ACCESSIBILITY.md        # Accessibility guidelines
│   └── DEVELOPMENT.md          # This file
├── scripts/
│   └── build.js                # Build system (future)
├── src/
│   └── js/
│       ├── core/               # Core functionality
│       ├── analysis/           # Data analysis modules
│       ├── ui/                 # UI components
│       └── utils/              # Utility functions
│           ├── logger.js       # Logging system
│           ├── errorHandler.js # Error management
│           └── performance.js  # Performance monitoring
├── tests/
│   ├── unit/                   # Unit tests
│   └── integration/            # Integration tests
├── dataphreak.html             # Main application file
├── dataphreak.gif              # Demo animation
├── package.json                # Dependencies
├── vitest.config.js            # Test configuration
├── .eslintrc.json              # Linting rules
├── .gitignore                  # Git ignore rules
├── CHANGELOG.md                # Version history
├── CONTRIBUTING.md             # Contribution guidelines
├── LICENSE                     # MIT License
└── README.md                   # Project overview
```

---

## Development Workflow

### 1. Make Changes

Currently, all code is in `dataphreak.html`. Future versions will support modular development.

### 2. Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

### 3. Check Code Quality

```bash
# Run linter
npm run lint

# Auto-fix linting issues
npm run lint:fix

# Validate everything
npm run validate
```

### 4. Test Manually

```bash
# Start local server
npm run serve

# Open in browser
open http://localhost:8080/dataphreak.html
```

---

## Testing

### Running Tests

```bash
# All tests
npm test

# Specific test file
npm test logger.test.js

# With coverage
npm run test:coverage
```

### Writing Tests

Create test files in `tests/unit/` or `tests/integration/`:

```javascript
// tests/unit/myFeature.test.js
import { describe, it, expect } from 'vitest'
import { myFunction } from '../../src/js/myFeature.js'

describe('myFunction', () => {
  it('should do something', () => {
    const result = myFunction('input')
    expect(result).toBe('expected output')
  })

  it('should handle errors', () => {
    expect(() => myFunction(null)).toThrow()
  })
})
```

### Coverage Requirements

Minimum coverage thresholds (enforced by CI):
- Lines: 70%
- Functions: 70%
- Branches: 70%
- Statements: 70%

---

## Code Style

### JavaScript

Following [Standard JS](https://standardjs.com/) with modifications:

```javascript
// Use const/let, not var
const data = []
let count = 0

// No semicolons
const result = calculate()

// 2-space indentation
function process() {
  if (condition) {
    doSomething()
  }
}

// Single quotes for strings
const name = 'DATAPHREAK'

// Prefer arrow functions
const map = data.map(item => item.value)

// Use template literals
const message = `Processing ${count} rows`
```

### Naming Conventions

```javascript
// Variables and functions: camelCase
const userName = 'John'
function calculateTotal() {}

// Classes: PascalCase
class DataProcessor {}

// Constants: UPPER_SNAKE_CASE
const MAX_FILE_SIZE = 100 * 1024 * 1024

// Private properties: _prefix
class MyClass {
  _privateMethod() {}
}
```

---

## Performance Guidelines

### 1. Use Performance Monitoring

```javascript
import { perfMonitor } from './utils/performance.js'

async function processData(data) {
  return await perfMonitor.measure('processData', async () => {
    // Process data
    return result
  })
}
```

### 2. Chunk Large Operations

```javascript
// Process in chunks to avoid blocking UI
const CHUNK_SIZE = 10000

for (let i = 0; i < data.length; i += CHUNK_SIZE) {
  const chunk = data.slice(i, i + CHUNK_SIZE)
  await processChunk(chunk)

  // Allow UI to update
  await new Promise(resolve => setTimeout(resolve, 0))
}
```

### 3. Avoid Memory Leaks

```javascript
// Clean up event listeners
const handler = () => console.log('click')
element.addEventListener('click', handler)

// Later:
element.removeEventListener('click', handler)

// Clear intervals/timeouts
const intervalId = setInterval(() => {}, 1000)
clearInterval(intervalId)
```

---

## Error Handling

### Use ErrorHandler Utility

```javascript
import { ErrorHandler, DataphreakError, ErrorCodes } from './utils/errorHandler.js'

// Throw custom errors
throw new DataphreakError(
  'Invalid file format',
  ErrorCodes.INVALID_FORMAT,
  { filename: file.name }
)

// Wrap functions
const result = await ErrorHandler.wrapAsync(async () => {
  return await parseFile(file)
}, { operation: 'parseFile' })

// Check for errors
if (result.code) {
  // Handle error
  console.error(result.message)
} else {
  // Use result
  processData(result)
}
```

---

## Logging

### Use Logger Instead of Console

```javascript
import { logger, LogLevel } from './utils/logger.js'

// Development
logger.debug('Detailed debug info', { data })
logger.info('Operation completed', { rows: count })

// Always shown
logger.warn('Potential issue detected', { issue })
logger.error('Operation failed', { error: error.message })

// Set level
logger.setLevel(LogLevel.WARN) // Production
logger.setLevel(LogLevel.DEBUG) // Development
```

---

## Git Workflow

### Branching Strategy

```
main (protected)
  ├── develop (default)
  │   ├── feature/add-csv-export
  │   ├── fix/memory-leak
  │   └── docs/update-readme
  └── release/1.1.0
```

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Format
<type>(<scope>): <description>

# Types
feat:     New feature
fix:      Bug fix
docs:     Documentation only
style:    Formatting, missing semicolons, etc.
refactor: Code change that neither fixes a bug nor adds a feature
perf:     Performance improvement
test:     Adding tests
chore:    Maintenance tasks

# Examples
feat(analysis): add fuzzy matching algorithm
fix(csv): handle malformed CSV files
docs(api): document logger utility
test(utils): add error handler tests
perf(processing): optimize chunk size
```

### Pull Request Process

1. Create feature branch from `develop`
2. Make changes and write tests
3. Run `npm run validate`
4. Push and create PR to `develop`
5. CI must pass (tests, linting, coverage)
6. Request review
7. Squash and merge after approval

---

## Deployment

### GitHub Pages

Automatic deployment on push to `main`:

```bash
# Manually trigger deployment
git push origin main
```

### Local Build

```bash
# Validate build
npm run build

# This checks:
# - File exists
# - HTML structure valid
# - All dependencies embedded
# - File size reasonable
```

---

## Debugging

### Browser DevTools

```javascript
// Add breakpoints
debugger

// Use performance profiler
performance.mark('start')
// ... code ...
performance.mark('end')
performance.measure('operation', 'start', 'end')
```

### Logging

```javascript
// Enable verbose logging
logger.setLevel(LogLevel.DEBUG)

// Monitor performance
perfMonitor.report()
```

---

## Release Process

1. Update version in `dataphreak.html` (line 2884)
2. Update `CHANGELOG.md`
3. Run full test suite: `npm run validate`
4. Create release branch: `git checkout -b release/x.y.z`
5. Create PR to `main`
6. After merge, tag release: `git tag vx.y.z`
7. Push tag: `git push origin vx.y.z`
8. GitHub Actions will deploy

---

## Troubleshooting

### Tests Failing

```bash
# Clear coverage cache
rm -rf coverage/

# Reinstall dependencies
rm -rf node_modules/
npm install

# Run tests with verbose output
npm test -- --reporter=verbose
```

### Linter Errors

```bash
# Auto-fix most issues
npm run lint:fix

# Check what will be fixed
npm run lint -- --fix-dry-run
```

### Build Issues

```bash
# Verify file integrity
npm run build

# Check file size
ls -lh dataphreak.html
```

---

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [ESLint Rules](https://eslint.org/docs/rules/)
- [Standard JS](https://standardjs.com/)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

## Getting Help

- [Issues](https://github.com/Zacsluss/dataphreak/issues)
- [Discussions](https://github.com/Zacsluss/dataphreak/discussions)
- [Contributing Guide](../CONTRIBUTING.md)

---

*Last Updated: 2025-10-28*
*Version: 1.0.0*
