# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

DATAPHREAK runs entirely client-side and does not store or transmit data to any server. However, if you discover a security vulnerability, please report it by:

1. **DO NOT** open a public issue
2. Email security concerns to: zacharyjsluss@gmail.com
3. Include steps to reproduce the vulnerability
4. Expected response time: 48 hours

## Security Features

- **No data uploads** - All processing happens locally in your browser
- **No external requests** - Zero network calls during operation
- **Content Security Policy** - Blocks XSS attacks
- **LocalStorage only** - Only user preferences stored, never your data

## Known Limitations

- **CSV Injection:** Formulas in CSV cells could execute in Excel when exported. Use "Export as Text" for sensitive data.
- **File Size:** No validation on uploaded file size - very large files can crash the browser.
- **XSS in User Data:** If CSV contains HTML/JS, it may execute if rendered. Always sanitize in production use.

## Best Practices

- Run DATAPHREAK from a trusted source (GitHub Pages or local file)
- Don't paste DATAPHREAK into browser console from untrusted sources
- For sensitive data, review exported files before sharing
- Close sensitive tabs before using on shared computers

## Security Updates

Security updates will be released as patch versions (e.g., 1.0.1, 1.0.2). Check the [CHANGELOG](CHANGELOG.md) for details.

## Attribution

Thank you to all security researchers who help keep DATAPHREAK secure. Responsible disclosure is appreciated.
