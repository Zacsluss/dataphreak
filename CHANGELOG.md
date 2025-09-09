# 📊 DATAPHREAK Changelog

All notable changes to DATAPHREAK will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [8.6.1] - 2025-01-09

### Added
- Default US date format (MM/DD/YYYY) for better compatibility
- Enhanced README with SEO optimization and professional structure
- MIT License file
- CHANGELOG.md for version tracking
- Improved documentation with troubleshooting section

### Fixed
- Removed duplicate CSS class definitions
- Fixed corrupted PNG favicon data
- Removed 832 lines with trailing whitespace
- Consolidated CSS selectors for better maintainability
- Fixed broken demo image link in README

### Changed
- Enhanced pattern detection accuracy for complex data
- 30% speed improvement on large datasets
- Better mobile support with optimized responsive design
- Extended Excel support for more complex spreadsheets

## [8.6.0] - 2024-12-15

### Added
- Fuzzy duplicate detection with Levenshtein distance algorithm
- Cross-file comparison capabilities
- Smart pattern recognition for emails, phones, dates
- Professional A-F quality scoring system
- Interactive histograms with statistical overlays
- Undo/redo functionality
- Memory optimization for datasets with 100k+ rows

### Changed
- Complete UI redesign with three themes (Dark, Light, Matrix)
- Improved CSV parsing with chunked processing
- Enhanced error handling and user feedback
- Optimized performance for 1M+ row datasets

## [8.5.0] - 2024-11-01

### Added
- Excel file support (.xlsx and .xls)
- Data merge functionality with multiple join types
- Custom validation rules system
- Export to JSON format
- Data dictionary generation

### Fixed
- CSV injection vulnerabilities
- Memory leaks in large file processing
- Date parsing for international formats

## [8.4.0] - 2024-10-01

### Added
- One-click data cleaning operations
- Case standardization (upper, lower, title, sentence)
- Whitespace trimming and special character handling
- Phone number formatting
- Email validation and cleaning

### Changed
- Improved file upload interface
- Enhanced progress indicators for long operations
- Better error messages for user guidance

## [8.3.0] - 2024-09-01

### Added
- Statistical profiling with min, max, mean calculations
- Outlier detection algorithms
- Missing value analysis with heatmaps
- Distribution charts for numeric columns

### Fixed
- Browser compatibility issues with Safari
- Large file upload timeouts
- Character encoding problems

## [8.2.0] - 2024-08-01

### Added
- Salesforce ID conversion (15 to 18 characters)
- Column operations (add, remove, rename, reorder)
- Real-time preview before applying changes
- LocalStorage for user preferences

### Changed
- Faster initial load time
- Reduced memory footprint
- Improved mobile responsiveness

## [8.1.0] - 2024-07-01

### Added
- Content Security Policy for enhanced security
- CSV export with formula injection protection
- Keyboard shortcuts for common operations
- Collapsible sections in UI

### Fixed
- XSS vulnerabilities
- Performance issues with 500k+ rows
- UI glitches in Firefox

## [8.0.0] - 2024-06-01

### Added
- Complete rewrite as single-file application
- 100% offline functionality
- Embedded SheetJS library for Excel support
- Professional UI with modern design

### Breaking Changes
- Removed all server-side dependencies
- Removed cloud storage features
- Changed from multi-file to single HTML architecture

## [7.0.0] - 2024-05-01

### Added
- Initial public release
- Basic CSV import/export
- Simple duplicate detection
- Data type inference
- Basic cleaning operations

---

## Version Numbering

DATAPHREAK follows Semantic Versioning:
- **Major version (X.0.0)**: Breaking changes or major architectural updates
- **Minor version (0.X.0)**: New features, backwards compatible
- **Patch version (0.0.X)**: Bug fixes and minor improvements

## Support

For issues or questions about specific versions:
- 📧 Email: zacsluss@yahoo.com
- 🐛 Issues: https://github.com/Zacsluss/DATAPHREAK/issues
- 📖 Docs: https://github.com/Zacsluss/DATAPHREAK/blob/main/DATAPHREAK_DOCUMENTATION.md