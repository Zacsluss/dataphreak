# DATAPHREAK - Enterprise Data Analysis

## Overview

DATAPHREAK is an **enterprise-grade data analysis tool** that processes **1M+ rows entirely in your browser**. The application provides privacy-first data quality assessment, fuzzy duplicate detection, and pattern recognition—all running 100% offline without ever uploading your data to a server.

## Key Features

- **Fuzzy Duplicate Detection** — Finds near-matches like "IBM Corp" vs "I.B.M. Corporation" using Levenshtein distance with spatial indexing (O(n log n) complexity)
- **A-F Quality Scoring** — Automatic quality grades for each column based on completeness, consistency, and validity
- **Pattern Recognition** — Auto-detects emails, phones, dates, URLs with regex validation
- **Statistical Profiling** — Distribution analysis, outlier detection, missing value heatmaps
- **100% Private** — Zero network requests. All processing happens locally in your browser

## Technology Stack

The application leverages:
- **Vanilla JavaScript (ES6+)** for core logic
- **Canvas API** for data visualizations
- **SheetJS** (embedded) for Excel file support
- **Web Workers** for background processing
- **LRU caching** for gradient calculations
- Single-file architecture—no external dependencies

## Performance Specifications

**Small Datasets (10K rows)**: < 1s load time, ~50MB memory usage
**Large Datasets (100K rows)**: 2-3s load time, ~400MB memory usage
**Bundle Size**: 1.40MB single HTML file (11,661 lines)

Processes **100,000 rows in under 5 seconds**. Handles datasets with **1M+ rows** without freezing through chunked processing and virtual scrolling.

## Quick Start

```bash
# Try online (no installation)
https://zacsluss.github.io/dataphreak/dataphreak.html

# Or download for offline use
curl -O https://github.com/Zacsluss/dataphreak/raw/main/dataphreak.html
# Then open dataphreak.html in any modern browser
```

For development:

```bash
git clone https://github.com/Zacsluss/dataphreak.git
cd dataphreak && npm install && npm test
```

Available commands: `npm run lint`, `npm run test:coverage`, `npm run validate`

## Architecture

The project includes modular source code demonstrating enterprise-level organization:

```
src/
├── js/
│   ├── algorithms/
│   │   ├── fuzzyMatcher.js    # Levenshtein distance with spatial indexing
│   │   └── qualityScorer.js   # A-F quality scoring engine
│   └── utils/
│       ├── browserCompat.js   # Cross-browser compatibility
│       ├── errorHandler.js    # Error handling utilities
│       ├── logger.js          # Logging system
│       └── performance.js     # Performance monitoring
tests/
└── unit/                      # Comprehensive test suite (100% passing)
```

**Single-File Architecture**: The entire application bundles into one HTML file for true offline capability, future-proof portability, and zero dependency risk.

## Use Cases

Ideal for data quality assessment, duplicate detection across large datasets, pattern validation for emails/phones/dates/URLs, data profiling with distribution analysis, and privacy-sensitive analysis without cloud uploads.

## Browser Compatibility

Requires modern browser: **Chrome 80+**, **Firefox 75+**, **Safari 13+**, **Edge 80+**

## Security

All processing happens locally in your browser. DATAPHREAK makes **zero network requests** during operation.

**Known Limitations**: CSV injection risk (formulas in cells), 500MB file size maximum, modern browser requirement. See [SECURITY.md](SECURITY.md) for details.

## Project Stats

- **11,661 lines of code** (70% JavaScript, 26% CSS, 4% HTML)
- **65 passing tests** with comprehensive coverage
- **Zero runtime dependencies**
- **~200ms initial load time**

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines. Check [CHANGELOG.md](CHANGELOG.md) for version history.

**License**: MIT — see [LICENSE](LICENSE) for details.
