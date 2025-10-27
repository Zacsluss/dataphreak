<div align="center">

# DATAPHREAK

### Enterprise-grade data analysis tool that runs entirely in your browser

**[Try Live Demo](https://zacsluss.github.io/DATAPHREAK/DATAPHREAK.html)** • **[Download (1.29MB)](https://github.com/Zacsluss/DATAPHREAK/raw/main/DATAPHREAK.html)**

</div>

---

## What This Is

DATAPHREAK is a browser-based data quality and cleaning tool packaged as a single 1.29MB HTML file. Upload CSV or Excel files for instant analysis—fuzzy duplicate detection, pattern recognition, quality scoring, and one-click cleaning—all without sending data to any server.

The technical challenge was building professional-grade data analysis capabilities (fuzzy matching algorithms, statistical profiling, multi-file joins) in pure JavaScript while maintaining performance with datasets exceeding 1 million rows. The result processes 100,000 rows in under 5 seconds using chunked algorithms, Levenshtein distance calculations with smart blocking to achieve O(n log n) complexity, and LRU gradient caching for responsive visualizations.

**Key Stats:**
- 1.29MB single HTML file (8,847 lines: 70% JS, 26% CSS, 4% HTML)
- Processes 1M+ rows with chunked algorithms
- 100K rows analyzed in < 5 seconds
- Fuzzy duplicate detection using Levenshtein distance
- A-F quality scoring based on completeness, consistency, validity
- 100% offline processing—zero network requests
- Embedded SheetJS for native Excel support

## Core Features

**Data Analysis:**
- Fuzzy duplicate detection catches variations ("IBM Corp" vs "I.B.M. Corporation")
- Smart pattern recognition auto-identifies emails, phones, dates, URLs
- Professional A-F quality scoring with actionable fix suggestions
- Statistical profiling with distribution analysis and outlier detection
- Missing value analysis with visual heatmaps

**Data Cleaning:**
- One-click standardization: case formatting, whitespace, special characters
- Phone number and email normalization
- Date format conversion to ISO standard
- Duplicate removal (exact and fuzzy)
- Custom validation rules with regex support
- 50-operation undo/redo history

**File Operations:**
- Multi-format support: CSV, TSV, Excel (.xlsx/.xls)
- Smart encoding detection for any character set
- File merging with multiple join types (inner, left, right, full outer)
- Export to CSV, JSON, Excel
- Data dictionary generation

## Technical Stack

Built with vanilla JavaScript, Canvas API for visualizations, and embedded SheetJS for Excel processing. No external dependencies, build tools, or frameworks.

**Architecture:**
- Single HTML file deployment (no build pipeline, no dependencies)
- Chunked processing for memory-efficient large file handling
- Spatial indexing for O(n log n) fuzzy matching performance
- Content Security Policy protection against XSS and injection attacks
- LocalStorage for user preferences only (zero data persistence)

**Performance Optimizations:**
- Blocked Levenshtein distance calculations to reduce comparisons
- LRU cache for rendered gradients (3x speed improvement)
- Streaming algorithms process files larger than available RAM
- Web Workers for background processing without UI freezes
- Efficient DOM updates using virtual scrolling

**Privacy & Security:**
- All processing occurs locally in the browser
- Zero network requests during data operations
- No data uploaded to servers or stored persistently
- Open source single-file architecture—fully auditable

## Quick Start

**Online:** Visit [zacsluss.github.io/DATAPHREAK/DATAPHREAK.html](https://zacsluss.github.io/DATAPHREAK/DATAPHREAK.html)

**Offline:** [Download the HTML file](https://github.com/Zacsluss/DATAPHREAK/raw/main/DATAPHREAK.html) and open it in any modern browser (Chrome 80+, Firefox 75+, Safari 13+, Edge 80+)—no server required.

**Development:**
```bash
git clone https://github.com/Zacsluss/DATAPHREAK.git
cd DATAPHREAK
# Open DATAPHREAK.html in your browser - no build step needed
```

## Why I Built This

As someone managing CRM platforms serving 3,000+ users across 22 countries, I've seen how expensive and bloated enterprise data tools can be. Tableau Prep costs $25K-$75K annually. Alteryx runs $15K-$50K per seat. Both require cloud uploads, lengthy implementations, and extensive training.

I built DATAPHREAK to prove that professional-grade data quality tools don't need enterprise licensing or cloud dependencies. The best leaders never stop coding—and this project demonstrates that fundamental algorithms (Levenshtein distance, statistical profiling, join operations) can deliver enterprise results without enterprise overhead.

The constraint of single-file deployment forced efficient design decisions. Embedding SheetJS meant true offline capability. Pure JavaScript meant transparent execution and easy debugging. Zero external dependencies meant this works forever—download it today, and it still works in 10 years.

The privacy angle matters. Data professionals shouldn't have to upload sensitive customer information to third-party servers just to find duplicates or assess quality. Processing locally isn't just a feature—it's a philosophy about data ownership and control.

## Use Cases

**Data Cleaning:** Standardize contact lists, remove duplicates, validate email addresses and phone numbers before importing into CRM systems.

**Quality Assessment:** Grade dataset completeness and consistency before analysis, identify missing values and outliers, generate data quality reports for stakeholders.

**File Operations:** Merge multiple data sources with proper join logic, compare datasets to find matches or differences, convert between formats (CSV ↔ Excel ↔ JSON).

**Pattern Detection:** Auto-identify data types in unstructured datasets, find and flag invalid entries (malformed emails, impossible dates), detect anomalies using statistical methods.

## Contributing

Bug reports and feature suggestions welcome. See [DATAPHREAK_DOCUMENTATION.md](DATAPHREAK_DOCUMENTATION.md) for detailed technical documentation.

---

<div align="center">

**Built by [Zachary Sluss](https://github.com/Zacsluss)** • MIT License

[![GitHub stars](https://img.shields.io/github/stars/Zacsluss/DATAPHREAK?style=social)](https://github.com/Zacsluss/DATAPHREAK/stargazers)

</div>
