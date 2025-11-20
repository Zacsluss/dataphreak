# DATAPHREAK v1.0.0 - Initial Release 🚀

**Release Date:** November 20, 2025

DATAPHREAK is a privacy-first data analysis tool that runs 100% offline in your browser. No installation, no cloud uploads, no subscriptions—just drag, drop, and analyze.

## 🎯 What This Release Includes

### Core Features

**Data Quality Analysis**
- Automatic A-F quality scoring for every column
- Completeness, consistency, and validity metrics
- Missing value heatmaps and distribution analysis
- Statistical profiling with outlier detection

**Duplicate Detection**
- Exact duplicate detection with group labeling
- Fuzzy matching using Levenshtein distance (finds "IBM Corp" vs "I.B.M. Corporation")
- Cross-file duplicate comparison (compare two datasets)
- Spatial indexing for O(n log n) performance vs naive O(n²)

**Pattern Recognition**
- Auto-detects emails, phone numbers, dates, URLs
- Regex-based validation for data types
- Column type inference

**Data Operations**
- Merge files with SQL-style joins (Inner, Left, Right, Full)
- Salesforce ID conversion (15-char ↔ 18-char)
- Data cleaning (trim, case normalization, accent removal)
- CSV/TSV export with formula injection prevention

### Performance Specifications

**Benchmarks:**
- Small datasets (10K rows): < 1 second load time, ~50MB memory
- Large datasets (100K rows): 2-3 seconds load time, ~400MB memory
- Processes 100,000 rows in under 5 seconds
- Handles 1M+ rows without freezing (chunked processing + virtual scrolling)

**Optimization:**
- O(n log n) spatial indexing for fuzzy matching
- LRU caching for gradient calculations
- Chunked processing prevents UI freezing
- Virtual scrolling renders only visible rows

### Technical Stack

**Runtime:**
- Vanilla JavaScript (ES6+)
- Canvas API for visualizations
- SheetJS (embedded) for Excel support
- Web Workers for background processing
- Zero external dependencies

**Development:**
- 200 passing tests (Vitest)
- ESLint code quality enforcement
- Husky + lint-staged for pre-commit hooks
- GitHub Actions CI/CD pipeline

### Bundle Information

- **File Size:** 1.40 MB (single HTML file)
- **Lines of Code:** 11,661
- **Dependencies:** 0 runtime dependencies
- **Initial Load:** ~200ms
- **Browser Support:** Chrome 80+, Firefox 75+, Safari 13+, Edge 80+

## 🔒 Security & Privacy

- **100% offline operation** - Makes zero network requests
- **No data uploads** - All processing happens in your browser
- **CSV injection prevention** - Formulas are escaped on export
- **Content Security Policy** - Blocks inline and remote scripts
- **500MB file size limit** - Prevents browser crashes

## 📦 How to Use

**Online (No Installation):**
```
https://zacsluss.github.io/dataphreak/dataphreak.html
```

**Offline (Download Once, Use Forever):**
1. Download `dataphreak.html` from this release
2. Open in any modern browser
3. Drag and drop your CSV or Excel file
4. Analyze, export, done

**For Development:**
```bash
git clone https://github.com/Zacsluss/dataphreak.git
cd dataphreak
npm install
npm test
```

## 🎓 Use Cases

Perfect for:
- Marketing teams managing contact lists
- Sales operations cleaning CRM exports
- HR managing employee data
- Small business owners with messy spreadsheets
- Anyone who needs clean data without technical expertise

## 📋 What's Different from Excel/Power BI?

**vs Excel:**
- No formulas needed (3 clicks vs hours of VLOOKUP)
- Finds fuzzy duplicates Excel can't detect
- Works in seconds, not hours

**vs Power BI:**
- Zero learning curve (if you can click, you can use it)
- No installation or setup
- 100% private (data never leaves your browser)

**vs Cloud Tools:**
- Free forever
- No subscription fees
- No data uploads to third-party servers
- Works offline indefinitely

## 🐛 Known Limitations

- CSV injection risk (formulas in cells may execute in Excel)
- 500MB maximum file size
- Modern browser required (IE not supported)
- See [SECURITY.md](https://github.com/Zacsluss/dataphreak/blob/main/SECURITY.md) for details

## 📄 License

MIT License - Use it however you want. No credit needed (but a ⭐ appreciated).

## 🙏 Acknowledgments

Built with vanilla JavaScript and a commitment to privacy-first design. No external libraries, no tracking, no nonsense.

## 🔗 Links

- **GitHub Repository:** https://github.com/Zacsluss/dataphreak
- **Live Tool:** https://zacsluss.github.io/dataphreak/dataphreak.html
- **Documentation:** [README.md](https://github.com/Zacsluss/dataphreak#readme)
- **Contributing:** [CONTRIBUTING.md](https://github.com/Zacsluss/dataphreak/blob/main/CONTRIBUTING.md)
- **Changelog:** [CHANGELOG.md](https://github.com/Zacsluss/dataphreak/blob/main/CHANGELOG.md)
- **Security:** [SECURITY.md](https://github.com/Zacsluss/dataphreak/blob/main/SECURITY.md)

---

**Found a bug?** [Report it](https://github.com/Zacsluss/dataphreak/issues)
**Want to contribute?** [See guidelines](https://github.com/Zacsluss/dataphreak/blob/main/CONTRIBUTING.md)
**Need help?** Open a [discussion](https://github.com/Zacsluss/dataphreak/discussions)

---

<div align="center">

**Built by [Zac Sluss](https://github.com/Zacsluss)**

If you can click, you can clean data. 🚀

</div>
