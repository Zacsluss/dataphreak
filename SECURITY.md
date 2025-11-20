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
- **File Size:** Maximum file size is 500MB to prevent browser crashes. For larger datasets, split files or use specialized tools.
- **XSS in User Data:** If CSV contains HTML/JS, it may execute if rendered. Always sanitize in production use.

## Best Practices

- Run DATAPHREAK from a trusted source (GitHub Pages or local file)
- Don't paste DATAPHREAK code into browser console from untrusted sources
- For sensitive data, review exported files before sharing
- Close sensitive tabs before using on shared computers
- Use modern, updated browsers for latest security patches

## Security Updates

Security updates will be released as patch versions (e.g., 1.0.1, 1.0.2). Check the [releases page](https://github.com/Zacsluss/dataphreak/releases) for details.

## Attribution

Thank you to security researchers who help improve DATAPHREAK's security. Responsible disclosure is appreciated.
