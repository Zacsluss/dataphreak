# Changelog

All notable changes to DATAPHREAK will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [8.6.3] - 2025-01-12

### Changed
- **Performance**: Removed 350+ lines of unused code (3% file size reduction)
- **Optimization**: Eliminated REMOVED_PATTERNS object containing 10 unused pattern definitions
- **Simplification**: Reduced column name hint logic by 70% using cleaner implementation
- **Focus**: Streamlined pattern detection to core 3 patterns (email, phone, date) for better accuracy

### Fixed
- **SSN Validation**: Corrected string comparison bug for area code validation
- **Phone Numbers**: Improved international format handling and validation
- **Date Parsing**: Fixed Excel serial date edge cases and leap year handling
- **Currency Regex**: Properly escaped Unicode characters for symbol detection
- **IPv6 Validation**: Simplified and corrected compressed format validation

### Removed
- Unused pattern definitions (URL, IP Address, Credit Card, SSN, UUID, Currency, Postal Code, Salesforce ID, Coordinates)
- Redundant code blocks and duplicate function declarations
- Unnecessary complex validation logic for removed patterns

## [8.6.2] - 2025-01-11

### Added
- Enhanced golden-themed light mode with consistent dark gold borders
- Improved toast notifications showing counts, timing, and better descriptions
- Comprehensive tooltips for every button with actionable descriptions
- Visual divider between exact and fuzzy duplicate sections
- Performance metrics for long-running operations

### Fixed
- Critical bug where second dataset would load into wrong slot
- JavaScript variable hoisting errors preventing file loads
- Inconsistent borders and missing backgrounds in light mode
- Various UI consistency issues

## [8.6.1] - 2025-01-10

### Changed
- Fixed Row Analysis table alignment issues
- Improved responsive design for all screen sizes
- Enhanced duplicate section title visibility
- Removed auto-population of "Allowed set" fields
- Removed redundant "Expected" column
- Changed "Run Checks" to "Run Rules" for clarity

## [8.6.0] - 2025-01-09

### Added
- **Professional Visualization Revolution**
  - Smart axis titles based on column patterns
  - Enhanced tooltips with rich insights
  - Data-driven color coding (red for issues, green for clean)
  - Statistical overlays (mean, median)
  - Professional typography and layout

### Fixed
- Critical JavaScript variable collision affecting button functionality
- Restored all button operations

## [8.5.0] - 2025-01-08

### Added
- True offline functionality with embedded 951KB SheetJS library
- Zero external dependencies
- Enhanced Content Security Policy (CSP) protection

## [0.8.0] - 2024-12-15

### Added
- 5-minute getting started guide
- 100% tooltip coverage for all UI elements
- Professional help system
- Custom data analytics favicon

## [0.6.1] - 2024-12-01

### Added
- Interactive histogram visualizations
- Smooth animations throughout UI
- PDF export support for reports

## [0.6.0] - 2024-11-15

### Added
- Complete theme system overhaul
- Three distinct themes (Dark, Light, Matrix)
- Particle effects for each theme
- Perfect visual parity across themes

## [0.5.0] - 2024-11-01

### Added
- Initial public release
- Core CSV/Excel import functionality
- Pattern detection system
- Duplicate detection (exact and fuzzy)
- Data quality scoring
- Basic data cleaning operations