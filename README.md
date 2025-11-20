# DATAPHREAK

**Enterprise-grade data analysis tool that processes 1M+ rows entirely in your browser**

[![CI Status](https://github.com/Zacsluss/dataphreak/actions/workflows/ci.yml/badge.svg)](https://github.com/Zacsluss/dataphreak/actions/workflows/ci.yml)
[![License](https://img.shields.io/github/license/Zacsluss/dataphreak?style=flat-square)](LICENSE)
[![Last Commit](https://img.shields.io/github/last-commit/Zacsluss/dataphreak?style=flat-square)](https://github.com/Zacsluss/dataphreak/commits/main)
[![Code Size](https://img.shields.io/github/languages/code-size/Zacsluss/dataphreak?style=flat-square&color=blue)](https://github.com/Zacsluss/dataphreak)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-0-brightgreen?style=flat-square)](package.json)

<div align="center">

### [🚀 Launch Tool](https://zacsluss.github.io/dataphreak/dataphreak.html) | [⬇️ Download HTML](https://github.com/Zacsluss/dataphreak/raw/main/dataphreak.html)

![DATAPHREAK Demo](dataphreak.gif)

</div>

## Overview

DATAPHREAK is a privacy-first data analysis tool that runs 100% offline in your browser. Upload CSV or Excel files and instantly get quality scores, duplicate detection, pattern recognition, and statistical profiling—without ever sending your data to a server.

### Key Features

- **Fuzzy Duplicate Detection** — Finds near-matches like "IBM Corp" vs "I.B.M. Corporation" using Levenshtein distance with spatial indexing (O(n log n))
- **A-F Quality Scoring** — Automatic quality grades for each column based on completeness, consistency, and validity
- **Pattern Recognition** — Auto-detects emails, phones, dates, URLs with regex validation
- **Statistical Profiling** — Distribution analysis, outlier detection, missing value heatmaps
- **100% Private** — Zero network requests. All processing happens locally in your browser

### Performance

- Processes **100,000 rows in under 5 seconds**
- Handles datasets with **1M+ rows** without freezing
- Fuzzy matching uses **spatial indexing** for O(n log n) complexity vs naive O(n²)
- **Chunked processing** and **virtual scrolling** keep the UI responsive

## Tech Stack

- **Vanilla JavaScript** (ES6+)
- **Canvas API** for data visualizations
- **SheetJS** (embedded) for Excel support
- **Web Workers** for background processing
- **LRU caching** for gradient calculations

**Bundle**: Single 1.40MB HTML file • 11,661 lines of code • Zero external dependencies

## Quick Start

### Online Usage
1. Visit [https://zacsluss.github.io/dataphreak/dataphreak.html](https://zacsluss.github.io/dataphreak/dataphreak.html)
2. Drag and drop your CSV or Excel file
3. Explore quality scores, duplicates, and patterns

### Offline Usage
1. Download [dataphreak.html](https://github.com/Zacsluss/dataphreak/raw/main/dataphreak.html)
2. Open the file in any modern browser
3. No installation or internet connection required

### Development

```bash
# Clone repository
git clone https://github.com/Zacsluss/dataphreak.git
cd dataphreak

# Install dependencies
npm install

# Run tests
npm test

# Run linter
npm run lint

# View test coverage
npm run test:coverage
```

## Architecture

```
DATAPHREAK/
├── dataphreak.html          # Main application (production build)
├── src/
│   ├── js/
│   │   ├── algorithms/
│   │   │   ├── fuzzyMatcher.js    # Levenshtein distance with spatial indexing
│   │   │   └── qualityScorer.js   # A-F quality scoring engine
│   │   └── utils/
│   │       ├── browserCompat.js   # Cross-browser compatibility
│   │       ├── errorHandler.js    # Error handling utilities
│   │       ├── logger.js          # Logging system
│   │       └── performance.js     # Performance monitoring
└── tests/
    └── unit/                # Comprehensive test suite (100% passing)
```

### Design Decisions

**Single-File Architecture**: The entire application is bundled into one HTML file for:
- **True offline capability** — No build tools or server required
- **Future-proof** — Works today, will work 10 years from now
- **Zero dependencies** — No packages to break or become obsolete

**Privacy-First**: All data processing happens in your browser. No uploads, no tracking, no cloud services.

**Performance**: Chunked processing, spatial indexing, and virtual scrolling enable analysis of massive datasets without freezing the UI.

## Use Cases

- **Data Quality Assessment** — Quickly grade data quality before analysis
- **Duplicate Detection** — Find exact and fuzzy duplicates across large datasets
- **Pattern Validation** — Verify email addresses, phone numbers, dates, URLs
- **Data Profiling** — Understand distributions, outliers, and missing values
- **Privacy-Sensitive Analysis** — Analyze confidential data without cloud uploads

## Security

All processing happens locally in your browser. DATAPHREAK makes **zero network requests** during operation.

### Known Limitations
- **CSV Injection**: Formulas in CSV cells could execute in Excel when exported
- **File Size**: Maximum file size is 500MB to prevent browser crashes
- **Browser Compatibility**: Requires modern browser (Chrome 80+, Firefox 75+, Safari 13+, Edge 80+)

See [SECURITY.md](SECURITY.md) for vulnerability reporting and best practices.

## Browser Compatibility

| Browser | Minimum Version | Status |
|---------|----------------|--------|
| Chrome | 80+ | ✅ Fully supported |
| Firefox | 75+ | ✅ Fully supported |
| Safari | 13+ | ✅ Fully supported |
| Edge | 80+ | ✅ Fully supported |
| IE | Any | ❌ Not supported |

## Project Stats

- **Lines of Code**: 11,661 (70% JavaScript, 26% CSS, 4% HTML)
- **Test Coverage**: 100% pass rate (65 tests)
- **File Size**: 1.40MB (self-contained)
- **Dependencies**: 0 (zero runtime dependencies)
- **Load Time**: ~200ms initial load

## License

MIT License - see [LICENSE](LICENSE) for details.

## About

Built by [Zac Sluss](https://github.com/Zacsluss) as a demonstration of high-performance web engineering and privacy-first design.

### Connect

- GitHub: [@Zacsluss](https://github.com/Zacsluss)
- Email: zacharyjsluss@gmail.com
- Resume: [View Resume](public/resume.pdf)

### Technical Interests

WebGL • Particle Systems • Shader Programming • Computer Graphics • 360° Drone Photography

---

<div align="center">

**[Launch Tool](https://zacsluss.github.io/dataphreak/dataphreak.html)** • **[Download HTML](https://github.com/Zacsluss/dataphreak/raw/main/dataphreak.html)** • **[Report Issue](https://github.com/Zacsluss/dataphreak/issues)**

</div>
