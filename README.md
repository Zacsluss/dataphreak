<div align="center">

<!-- Hero Header with Name -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,12,20&height=200&section=header&text=DATAPHREAK&fontSize=70&fontColor=FFFFFF&animation=twinkling&fontAlignY=25&desc=Enterprise%20Data%20Analysis%20%E2%80%A2%201M%2B%20Rows%20%E2%80%A2%20100%25%20Private&descSize=20&descAlignY=50&descAlign=50"/>

<br/>

<!-- Animated Typing Subtitle -->
<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=22&duration=3000&pause=1000&color=FFFFFF&center=true&vCenter=true&random=false&width=700&lines=Fuzzy+Matching+%E2%80%A2+Quality+Scoring+%E2%80%A2+Pattern+Detection;Processing+1M%2B+Rows+at+60+FPS!;Zero+Dependencies+%E2%80%A2+100%25+Offline+%E2%80%A2+Privacy-First;Single+HTML+File+%E2%80%A2+Works+Today%2C+Works+in+10+Years" alt="Typing SVG" />

<br/>

<!-- Main Action Buttons -->
<p align="center">
  <a href="https://zacsluss.github.io/dataphreak/dataphreak.html">
    <img src="https://img.shields.io/badge/🚀_LAUNCH-TOOL-2e8b57?style=for-the-badge&labelColor=000000&logo=vercel&logoColor=white" alt="Launch Tool"/>
  </a>
  <a href="https://github.com/Zacsluss/dataphreak/raw/main/dataphreak.html">
    <img src="https://img.shields.io/badge/⬇️_DOWNLOAD-HTML_FILE-d97706?style=for-the-badge&labelColor=000000&logo=html5&logoColor=white" alt="Download"/>
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

## 👋 What Is This?

DATAPHREAK is a **privacy-first data analysis tool** that runs 100% offline in your browser. Upload CSV or Excel files and instantly get quality scores, duplicate detection, pattern recognition, and statistical profiling—without ever sending your data to a server.

**What makes it interesting:**
- Fuzzy matching finds "IBM Corp" vs "I.B.M. Corporation" using spatial indexing (O(n log n))
- Processes 100K rows in under 5 seconds
- Single 1.40MB HTML file — no installation, no dependencies, works forever
- Zero network requests — your data never leaves your machine

Built with vanilla JavaScript, Canvas API, and a little data science!

<div align="center">

<img src="dataphreak.gif" alt="DATAPHREAK Demo" width="800"/>

*Real-time data quality analysis — drop a file to see instant insights*

</div>

---

## ⚡ What This Does

<div align="center">

**Fuzzy duplicate detection** • **A-F quality scoring** • **Pattern recognition** • **100% offline**

</div>

**Key Features:**
- 🔍 **Fuzzy Matching**: Finds near-duplicates like "IBM Corp" vs "I.B.M. Corporation" with Levenshtein distance
- 📊 **Quality Scoring**: Automatic A-F grades for each column based on completeness and consistency
- 🎯 **Pattern Detection**: Auto-detects emails, phones, dates, URLs with regex validation
- 📈 **Statistical Profiling**: Distribution analysis, outlier detection, missing value heatmaps
- 🔒 **100% Private**: Zero network requests. All processing happens locally in your browser

**Tech:** Vanilla JavaScript • Canvas API • SheetJS • Web Workers • LRU Caching

---

## 📚 Table of Contents

<details>
<summary><b>Jump to a section</b></summary>

- [🛠️ Tech Stack](#️-tech-stack)
- [📊 Performance Benchmarks](#-performance-benchmarks)
- [🏗️ Architecture](#️-architecture)
- [🚀 Quick Start](#-quick-start)
- [📄 License & Usage](#-license--usage)
- [📬 About & Connect](#-about--connect)

</details>

---

## 🛠️ Tech Stack

<div align="center">

### What I Used to Build This

<img src="https://skillicons.dev/icons?i=js,html,css,nodejs,npm,github" alt="Tech Stack" />

### Core Technologies

<table>
<tr>
<td align="center" width="25%">
<img src="https://img.shields.io/badge/JavaScript-ES6+-f7df1e?style=flat-square&logo=javascript&logoColor=black"/><br/>
<sub><b>Vanilla JS</b></sub>
</td>
<td align="center" width="25%">
<img src="https://img.shields.io/badge/Canvas_API-2D-ff6b6b?style=flat-square&logo=html5&logoColor=white"/><br/>
<sub><b>Visualizations</b></sub>
</td>
<td align="center" width="25%">
<img src="https://img.shields.io/badge/SheetJS-Embedded-217346?style=flat-square&logo=microsoftexcel&logoColor=white"/><br/>
<sub><b>Excel Support</b></sub>
</td>
<td align="center" width="25%">
<img src="https://img.shields.io/badge/Web_Workers-Async-4285f4?style=flat-square&logo=googlechrome&logoColor=white"/><br/>
<sub><b>Background Processing</b></sub>
</td>
</tr>
</table>

</div>

<details>
<summary><b>📦 See the development stack</b></summary>

```json
{
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "eslint": "^9.15.0",
    "globals": "^15.13.0",
    "husky": "^9.1.7",
    "lint-staged": "^15.2.11",
    "vitest": "^3.2.4"
  }
}
```

**Why zero runtime dependencies?**
The entire application is self-contained in a single HTML file. No npm packages, no CDN links, no external dependencies. Just open it in a browser and it works. Today, tomorrow, 10 years from now.

</details>

---

## 📊 Performance Benchmarks

<details>
<summary><b>📈 See real production benchmarks (Small vs Large datasets)</b></summary>

<br/>

<div align="center">

### Real numbers from production builds

<table align="center">
<tr>
<td width="50%">

#### Small Dataset (10K rows)
<table>
<tr><th align="center">Metric</th><th align="center">Value</th></tr>
<tr><td align="center">Load Time</td><td align="center">< 1 second</td></tr>
<tr><td align="center">Memory Usage</td><td align="center">~50MB</td></tr>
<tr><td align="center">Processing Time</td><td align="center">0.5s</td></tr>
<tr><td align="center">Fuzzy Match Time</td><td align="center">< 100ms</td></tr>
</table>

</td>
<td width="50%">

#### Large Dataset (100K rows)
<table>
<tr><th align="center">Metric</th><th align="center">Value</th></tr>
<tr><td align="center">Load Time</td><td align="center">2-3 seconds</td></tr>
<tr><td align="center">Memory Usage</td><td align="center">~400MB</td></tr>
<tr><td align="center">Processing Time</td><td align="center">< 5s</td></tr>
<tr><td align="center">Fuzzy Match Time</td><td align="center">~2s</td></tr>
</table>

</td>
</tr>
</table>

</div>

**Maximum supported:** 1M+ rows with chunked processing and virtual scrolling to prevent UI freezing.

</details>

<details>
<summary><b>📦 Bundle size breakdown</b></summary>

```
dataphreak.html                1.40 MB total
├── JavaScript (70%)          ~980 KB
├── CSS (26%)                 ~364 KB
└── HTML (4%)                  ~56 KB

Lines of code:               11,661 total
Zero runtime dependencies
Initial load:                ~200ms
```

**How I optimized it:**
- ✅ Single-file architecture (no HTTP requests)
- ✅ Chunked processing (prevents UI freezing)
- ✅ Virtual scrolling (renders only visible rows)
- ✅ LRU caching (gradient calculations)
- ✅ Spatial indexing (O(n log n) fuzzy matching vs O(n²))

</details>

---

## 🏗️ Architecture

<details open>
<summary><b>Modular Source Code Structure</b></summary>

<br/>

### Project Organization

```
DATAPHREAK/
├── dataphreak.html          # Production build (single HTML file)
├── src/
│   └── js/
│       ├── algorithms/
│       │   ├── fuzzyMatcher.js    # Levenshtein distance with spatial indexing
│       │   └── qualityScorer.js   # A-F quality scoring engine
│       └── utils/
│           ├── browserCompat.js   # Cross-browser compatibility
│           ├── errorHandler.js    # Error handling utilities
│           ├── logger.js          # Logging system
│           └── performance.js     # Performance monitoring
└── tests/
    └── unit/                # 200 passing tests
```

### Key Technical Decisions

- **Single-File Architecture**: Bundles into one HTML file for true offline capability and future-proof portability
- **Spatial Indexing**: Reduces fuzzy matching from O(n²) to O(n log n) complexity
- **Chunked Processing**: Prevents UI freezing by processing data in 1000-row chunks
- **Virtual Scrolling**: Renders only visible rows instead of entire dataset
- **LRU Caching**: Speeds up repeated gradient calculations by 10x

</details>

---

## 🚀 Quick Start

<div align="center">

### Want to try it? Choose your path:

</div>

**🌐 Online (no installation):**
```
https://zacsluss.github.io/dataphreak/dataphreak.html
```

**💾 Offline (download once, use forever):**
```bash
curl -O https://github.com/Zacsluss/dataphreak/raw/main/dataphreak.html
# Then open dataphreak.html in any browser
```

<details>
<summary><b>💻 Development Setup</b></summary>

<br/>

**Step-by-step installation:**

```bash
# 1️⃣ Clone this repo
git clone https://github.com/Zacsluss/dataphreak.git
cd dataphreak

# 2️⃣ Install dependencies
npm install

# 3️⃣ Run tests
npm test
```

**Available npm scripts:**
- `npm run lint` — Run ESLint on source code
- `npm test` — Run 200 unit tests with Vitest
- `npm run test:coverage` — Generate coverage report
- `npm run validate` — Run lint + tests together
- `npm run build` — Validate production build

</details>

<details>
<summary><b>🔧 Use Cases</b></summary>

<br/>

**Perfect for:**
- 📊 **Data Quality Assessment** — Quickly grade data quality before analysis
- 🔍 **Duplicate Detection** — Find exact and fuzzy duplicates across large datasets
- ✅ **Pattern Validation** — Verify email addresses, phone numbers, dates, URLs
- 📈 **Data Profiling** — Understand distributions, outliers, and missing values
- 🔒 **Privacy-Sensitive Analysis** — Analyze confidential data without cloud uploads

</details>

---

## 📄 License & Usage

**MIT License** — Use it however you want. No credit needed (but a ⭐ appreciated).

**Quick setup:** Download `dataphreak.html` → Open in browser → Drag and drop your CSV/Excel file

<details>
<summary><b>📋 Browser compatibility</b></summary>

<br/>

<div align="center">

<table>
<tr>
<th align="center">Browser</th>
<th align="center">Minimum Version</th>
<th align="center">Status</th>
</tr>
<tr>
<td align="center">Chrome</td>
<td align="center">80+</td>
<td align="center">✅ Fully supported</td>
</tr>
<tr>
<td align="center">Firefox</td>
<td align="center">75+</td>
<td align="center">✅ Fully supported</td>
</tr>
<tr>
<td align="center">Safari</td>
<td align="center">13+</td>
<td align="center">✅ Fully supported</td>
</tr>
<tr>
<td align="center">Edge</td>
<td align="center">80+</td>
<td align="center">✅ Fully supported</td>
</tr>
<tr>
<td align="center">IE</td>
<td align="center">Any</td>
<td align="center">❌ Not supported</td>
</tr>
</table>

</div>

**Known limitations:**
- CSV injection risk (formulas in cells)
- 500MB maximum file size
- Modern browser required (ES6+, Canvas API, FileReader)

See [SECURITY.md](SECURITY.md) for vulnerability reporting and best practices.

</details>

<br/>

<div align="center">

<img src="https://img.shields.io/badge/License-MIT-555555?style=for-the-badge&logo=opensourceinitiative&logoColor=white"/>

Full license text in [LICENSE](LICENSE) file.

</div>

---

## 📬 About & Connect

Built by Zac Sluss as a demonstration of high-performance web engineering and privacy-first design. This project showcases enterprise-level data processing capabilities using only browser-native APIs.

**Technical interests:** WebGL • Particle Systems • Shader Programming • Computer Graphics • 360° Drone Photography

**Let's connect:**

<div align="center">

<a href="https://zacsluss.github.io/portfolio/">
  <img src="https://img.shields.io/badge/Portfolio-zacsluss.github.io-2e7d5a?style=for-the-badge&logo=vercel&logoColor=white"/>
</a>
<a href="https://github.com/Zacsluss">
  <img src="https://img.shields.io/badge/GitHub-@Zacsluss-181717?style=for-the-badge&logo=github&logoColor=white"/>
</a>
<a href="https://linkedin.com/in/zacharylsluss">
  <img src="https://img.shields.io/badge/LinkedIn-Zachary_Sluss-064789?style=for-the-badge&logo=linkedin&logoColor=white"/>
</a>
<a href="mailto:zacharyjsluss@gmail.com">
  <img src="https://img.shields.io/badge/Email-zacharyjsluss@gmail.com-b91c1c?style=for-the-badge&logo=gmail&logoColor=white"/>
</a>
<a href="https://zacsluss.github.io/portfolio/resume.pdf">
  <img src="https://img.shields.io/badge/Resume-Download_Resume-7c3aed?style=for-the-badge&logo=adobeacrobatreader&logoColor=white"/>
</a>

<br/>

**Found this helpful?** Give it a ⭐ to show support!

**Want to contribute?** See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

</div>
