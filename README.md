<div align="center">

<!-- Hero Header with Name -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,12,20&height=200&section=header&text=DATAPHREAK&fontSize=70&fontColor=FFFFFF&animation=twinkling&fontAlignY=25&desc=Enterprise%20Data%20Analysis%20In%20Your%20Browser&descSize=20&descAlignY=50&descAlign=50"/>

<br/>

<!-- Animated Typing Subtitle -->
<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=22&duration=3000&pause=1000&color=FFFFFF&center=true&vCenter=true&random=false&width=700&lines=1M%2B+Rows+%E2%80%A2+100K+in+5s+%E2%80%A2+100%25+Offline;Fuzzy+Matching+%E2%80%A2+A-F+Quality+Scoring;Single+HTML+File+%E2%80%A2+Zero+Cloud+Uploads" alt="Typing SVG" />

<br/>

<!-- Main Action Buttons -->
<p align="center">
  <a href="https://zacsluss.github.io/dataphreak/dataphreak.html">
    <img src="https://img.shields.io/badge/🚀_VIEW-LIVE_DEMO-2e8b57?style=for-the-badge&labelColor=000000&logo=vercel&logoColor=white" alt="Live Site"/>
  </a>
  <a href="https://github.com/Zacsluss/dataphreak/archive/refs/heads/main.zip">
    <img src="https://img.shields.io/badge/⬇️_DOWNLOAD-PROJECT-d97706?style=for-the-badge&labelColor=000000&logo=github&logoColor=white" alt="Download"/>
  </a>
</p>

<!-- GitHub Stats Badges -->
<p align="center">
  <img src="https://img.shields.io/github/stars/Zacsluss/dataphreak?style=social" alt="Stars"/>
  <img src="https://img.shields.io/github/forks/Zacsluss/dataphreak?style=social" alt="Forks"/>
  <img src="https://img.shields.io/github/watchers/Zacsluss/dataphreak?style=social" alt="Watchers"/>
  <img src="https://img.shields.io/github/license/Zacsluss/dataphreak?style=flat-square&color=555555" alt="License"/>
  <img src="https://img.shields.io/github/last-commit/Zacsluss/dataphreak?style=flat-square&color=666666" alt="Last Commit"/>
</p>

</div>

<br/>

---

## 👋 Hey, I'm Zac

I work on enterprise platforms by day and build unusually fun projects by night. DATAPHREAK processes **1 million+ row datasets in your browser** without uploading a single byte to any server—just drag, drop, and watch it analyze your data in real-time.

**What makes it interesting:**
- Processes 100K rows in under 5 seconds using chunked algorithms and smart blocking
- Catches fuzzy duplicates like "IBM Corp" vs "I.B.M. Corporation" with O(n log n) Levenshtein matching
- Assigns A-F quality grades to every column based on completeness, consistency, and validity
- Everything runs locally—your data never touches a server, not even mine

Built with vanilla JavaScript, Canvas API, and a lot of caffeine.

<div align="center">

<img src="dataphreak.gif" alt="DATAPHREAK Demo" width="800"/>

*Upload CSV/Excel files and watch DATAPHREAK analyze data quality, detect patterns, and find duplicates—all offline*

</div>

---

## ⚡ What This Does

<div align="center">

**Professional data analysis in a single 1.29MB HTML file** • **1M+ rows capacity** • **100% offline processing** • **Zero dependencies**

</div>

**Key Features:**
- ✨ **Smart Pattern Detection** — Auto-identifies emails, phones, dates, URLs with regex validation
- 🎯 **Fuzzy Duplicate Matching** — Finds near-matches using blocked Levenshtein distance
- 📊 **A-F Quality Scoring** — Grades every column on completeness, consistency, validity
- 🔬 **Statistical Profiling** — Distribution analysis, outlier detection, missing value heatmaps
- 🛡️ **100% Private** — Zero network requests, all processing happens in your browser

**Tech:** Vanilla JavaScript • Canvas API • SheetJS • Web Workers • LRU Caching

---

## 📚 Table of Contents

<details>
<summary><b>Jump to a section</b></summary>

- [🛠️ Tech Stack](#️-tech-stack)
- [🏗️ Architecture](#️-architecture)
- [🎨 Core Features](#-core-features)
- [🎯 Use Cases](#-use-cases)
- [💭 Why I Built This](#-why-i-built-this)
- [📊 Performance Benchmarks](#-performance-benchmarks)
- [🚀 Quick Start](#-quick-start)
- [📄 License & Usage](#-license--usage)
- [📬 About & Connect](#-about--connect)

</details>

---

## 🛠️ Tech Stack

<div align="center">

### What I Used to Build This

<img src="https://skillicons.dev/icons?i=js,html,css,git,github,vscode" alt="Tech Stack" />

### Core Dependencies

<table>
<tr>
<td align="center" width="25%">
<img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black"/><br/>
<sub><b>Pure vanilla JS</b></sub>
</td>
<td align="center" width="25%">
<img src="https://img.shields.io/badge/Canvas_API-Native-E34F26?style=flat-square&logo=html5&logoColor=white"/><br/>
<sub><b>Visualization engine</b></sub>
</td>
<td align="center" width="25%">
<img src="https://img.shields.io/badge/SheetJS-Embedded-217346?style=flat-square&logo=microsoftexcel&logoColor=white"/><br/>
<sub><b>Excel support</b></sub>
</td>
<td align="center" width="25%">
<img src="https://img.shields.io/badge/Web_Workers-Native-4285F4?style=flat-square&logo=googlechrome&logoColor=white"/><br/>
<sub><b>Background processing</b></sub>
</td>
</tr>
</table>

</div>

<details>
<summary><b>📦 See the full dependency list</b></summary>

<br/>

**Zero external dependencies** — This is a single HTML file with:
- **8,847 lines of code** (70% JS, 26% CSS, 4% HTML)
- **Embedded SheetJS library** for native Excel support
- **Pure Canvas API** for data visualizations
- **Native Web Workers** for background processing

The entire project is self-contained in `dataphreak.html` (1.29MB). No npm packages, no build tools, no external CDNs.

</details>

---

## 🏗️ Architecture

<details>
<summary><b>🔬 How it handles 1M+ rows in your browser</b></summary>

<br/>

### Single-File Design

Everything in one HTML file with inline JavaScript and CSS. This means:
- **Download once, works forever** — No dependencies to break
- **True offline capability** — Open the file, it just works
- **Future-proof** — Will work 10 years from now

### Performance Optimizations

| Technique | Purpose | Impact |
|-----------|---------|--------|
| **Chunked Processing** | Process data in 10K row batches | Handles 1M+ rows without freezing UI |
| **Spatial Indexing** | Block-based Levenshtein matching | O(n log n) instead of O(n²) for fuzzy search |
| **LRU Gradient Cache** | Cache color calculations for heatmaps | 3x speed boost on visualizations |
| **Virtual Scrolling** | Only render visible DOM elements | Smooth scrolling with 100K+ rows |
| **Web Workers** | Background statistical calculations | Keeps UI responsive during analysis |

### Security

- **Content Security Policy** — Blocks XSS attacks
- **No external requests** — All processing happens locally
- **No data persistence** — Only saves preferences to localStorage, never your data

</details>

---

## 🎨 Core Features

<details>
<summary><b>📊 Data analysis capabilities</b></summary>

<br/>

### Quality Scoring (A-F Grades)

Every column gets graded on:
- **Completeness** — Percentage of non-empty values
- **Consistency** — Pattern matching and format uniformity
- **Validity** — Data type correctness and range checking

### Pattern Detection

Automatically identifies:
- Email addresses (RFC 5322 compliant)
- Phone numbers (international formats)
- Dates (ISO, US, EU formats)
- URLs and domains
- Numeric patterns (currency, percentages, decimals)

### Fuzzy Duplicate Detection

Finds near-matches using:
- **Levenshtein distance** with smart blocking
- **Configurable similarity threshold** (0-100%)
- **O(n log n) complexity** via spatial indexing
- Catches "IBM Corp" vs "I.B.M. Corporation"

### Data Cleaning

- One-click standardization (case, whitespace, special characters)
- Phone number and email normalization
- Date format conversion to ISO standard
- 50-operation undo/redo history

### File Operations

- Multi-format support: CSV, TSV, Excel (.xlsx/.xls)
- Smart encoding detection for any character set
- File merging with multiple join types (inner, left, right, full outer)
- Export to CSV, JSON, Excel
- Data dictionary generation

</details>

---

## 🎯 Use Cases

<table>
<tr>
<td width="50%">

### 📋 Data Cleaning
- Standardize contact lists before CRM import
- Remove duplicates (exact and fuzzy)
- Validate email addresses and phone numbers
- Fix formatting inconsistencies

</td>
<td width="50%">

### 📊 Quality Assessment
- Grade dataset completeness before analysis
- Identify missing values and outliers
- Generate quality reports for stakeholders
- Find and flag invalid entries

</td>
</tr>
<tr>
<td width="50%">

### 🔗 File Operations
- Merge multiple data sources (inner/left/right/outer joins)
- Compare datasets to find matches or differences
- Convert between formats (CSV ↔ Excel ↔ JSON)

</td>
<td width="50%">

### 🔍 Pattern Detection
- Auto-identify data types in unstructured datasets
- Detect malformed emails and impossible dates
- Find anomalies using statistical methods

</td>
</tr>
</table>

---

## 💭 Why I Built This

As someone managing CRM platforms serving 3,000+ users across 22 countries, I've seen how expensive and bloated enterprise data tools can be. **Tableau Prep costs $25K-$75K annually. Alteryx runs $15K-$50K per seat.** Both require cloud uploads, lengthy implementations, and extensive training.

I built DATAPHREAK to prove that professional-grade data quality tools don't need enterprise licensing or cloud dependencies.

**This project explores:**
- ✅ **Fundamental algorithms** — Levenshtein distance, statistical profiling, join operations
- ✅ **Single-file deployment** — Download today, works in 10 years
- ✅ **Privacy by design** — Processing locally isn't just a feature, it's a philosophy
- ✅ **Zero dependencies** — Embedded SheetJS means true offline capability
- ✅ **Performance at scale** — 1M+ rows without external engines

**The privacy angle matters.** Data professionals shouldn't have to upload sensitive customer information to third-party servers just to find duplicates or assess quality. Processing locally isn't just a feature—it's a philosophy about data ownership and control.

---

## 📊 Performance Benchmarks

<div align="center">

### Real numbers from testing with production datasets

<table>
<tr>
<td width="50%">

#### Small Dataset (10K rows)
| Metric | Value |
|:------:|:-----:|
| Load Time | < 1 second |
| Pattern Detection | < 0.5 seconds |
| Quality Scoring | < 0.5 seconds |
| Fuzzy Matching | 2-3 seconds |
| Memory Usage | ~50 MB |

</td>
<td width="50%">

#### Large Dataset (100K rows)
| Metric | Value |
|:------:|:-----:|
| Load Time | 2-3 seconds |
| Pattern Detection | 3-4 seconds |
| Quality Scoring | 2-3 seconds |
| Fuzzy Matching | 15-20 seconds |
| Memory Usage | ~400 MB |

</td>
</tr>
</table>

</div>

<details>
<summary><b>📦 File size breakdown</b></summary>

<br/>

```
dataphreak.html    1,290 KB (uncompressed)
├─ JavaScript      903 KB  (70%)
├─ CSS             335 KB  (26%)
└─ HTML            52 KB   (4%)
─────────────────────────────────────────────────────────
Total              1.29 MB single file
```

**How I optimized it:**
- ✅ Embedded SheetJS directly instead of loading from CDN
- ✅ Minified and inlined all CSS (no external stylesheets)
- ✅ Chunked processing to handle files larger than available RAM
- ✅ LRU cache for gradient calculations (3x speed boost)
- ✅ Spatial indexing for O(n log n) fuzzy matching

**Note:** The tool can process files much larger than its own size. I've successfully tested it with 1M+ row datasets (500+ MB CSV files).

</details>

---

## 🚀 Quick Start

<div align="center">

### Want to try it locally? Takes about 30 seconds

</div>

```bash
# 1️⃣ Clone this repo
git clone https://github.com/Zacsluss/dataphreak.git
cd dataphreak

# 2️⃣ Open the file
# Just double-click dataphreak.html or:
open dataphreak.html           # macOS
start dataphreak.html          # Windows
xdg-open dataphreak.html       # Linux

# 3️⃣ That's it! No npm install, no build step, no dependencies.

# 4️⃣ Or use it online
# Visit: https://zacsluss.github.io/dataphreak/dataphreak.html
```

<details>
<summary><b>🔧 How to customize it for yourself</b></summary>

<br/>

Make it yours (takes about 5 minutes):

1. **Your branding:** Edit the `<h1>` tag around line 2884 — change "DATAPHREAK" to your name
2. **Your colors:** Tweak CSS variables in `:root` section (starting around line 46)
3. **Your features:** Add custom validation rules or data transformations in the JavaScript section
4. **Your deployment:** Host it anywhere — GitHub Pages, Netlify, or just send the HTML file

**Single-file architecture means:** No package.json to update, no build pipeline to configure. Edit the HTML file and you're done.

</details>

---

## 🔧 Development & Testing

### For Contributors

This project now includes a complete development infrastructure:

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run linter
npm run lint

# Run everything
npm run validate
```

**New Features:**
- ✅ **Vitest** testing framework with 70% coverage target
- ✅ **ESLint** for code quality
- ✅ **GitHub Actions** CI/CD pipeline
- ✅ **Utility modules** (Logger, Error Handler, Performance Monitor)
- ✅ **Comprehensive documentation** (API, Accessibility, Development guides)

**Documentation:**
- 📖 [API Documentation](docs/API.md)
- 🎨 [Accessibility Guidelines](docs/ACCESSIBILITY.md)
- 💻 [Development Guide](docs/DEVELOPMENT.md)
- 📝 [Changelog](CHANGELOG.md)

**Testing:**
```bash
npm test                # Run all tests
npm run test:ui         # Interactive test UI
npm run test:coverage   # Generate coverage report
```

See [DEVELOPMENT.md](docs/DEVELOPMENT.md) for complete development documentation.

---

## 📄 License & Usage

**MIT License** — Fork it, customize it, do whatever you want with it. No credit needed (but a ⭐ appreciated).

**Quick setup:** Download `dataphreak.html` → Open in browser → Upload your data → Done

<details>
<summary><b>📋 Full customization instructions</b></summary>

<br/>

**Make it yours (5 minutes):**
1. Edit `dataphreak.html` — replace my branding with yours
2. Customize CSS variables for your color scheme
3. Add your own validation rules or data transformations
4. Host it anywhere — it's just one HTML file

**No npm, no build tools, no dependencies.** Just edit the HTML file and you're done. It's designed to be self-contained and portable.

</details>

<br/>

<div align="center">

<img src="https://img.shields.io/badge/License-MIT-555555?style=for-the-badge&logo=opensourceinitiative&logoColor=white"/>

Full license text in [LICENSE](LICENSE) file.

</div>

---

## 📬 About & Connect

By day, I work as a Lead CRM Systems Analyst at Computershare, managing enterprise platforms and Salesforce integrations across global teams. By night, I build stuff like this.

I'm into WebGL, particle systems, shader programming, AI/ML, digital art, and 360° drone photography. Always learning, always building.

**Let's connect:**

<div align="center">

<a href="https://zacsluss.github.io/portfolio/">
  <img src="https://img.shields.io/badge/Portfolio-zacsluss.github.io-2e7d5a?style=for-the-badge&logo=vercel&logoColor=white"/>
</a>
<a href="https://github.com/Zacsluss">
  <img src="https://img.shields.io/badge/GitHub-@Zacsluss-181717?style=for-the-badge&logo=github&logoColor=white"/>
</a>
<a href="https://linkedin.com/in/zacharyjsluss">
  <img src="https://img.shields.io/badge/LinkedIn-Zachary_Sluss-064789?style=for-the-badge&logo=linkedin&logoColor=white"/>
</a>
<a href="mailto:zacharyjsluss@gmail.com">
  <img src="https://img.shields.io/badge/Email-zacharyjsluss@gmail.com-b91c1c?style=for-the-badge&logo=gmail&logoColor=white"/>
</a>
<a href="public/resume.pdf">
  <img src="https://img.shields.io/badge/Resume-Download_Resume-7c3aed?style=for-the-badge&logo=adobeacrobatreader&logoColor=white"/>
</a>

<br/>

**Found this helpful?** Give it a ⭐ to show support!

</div>
