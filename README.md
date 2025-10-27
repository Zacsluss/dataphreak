<div align="center">

<!-- Hero Header -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,2,8&height=180&section=header&text=dataphreak&fontSize=70&fontColor=FFFFFF&animation=twinkling&fontAlignY=30&desc=Enterprise%20Data%20Analysis%20In%20Your%20Browser&descSize=18&descAlignY=55"/>

<br/>

<!-- Animated Subtitle -->
<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=20&duration=3000&pause=1000&color=2d9a5e&center=true&vCenter=true&random=false&width=700&lines=1M%2B+Rows+%E2%80%A2+100K+in+5s+%E2%80%A2+100%25+Offline;Fuzzy+Matching+%E2%80%A2+A-F+Quality+Scoring;Single+HTML+File+%E2%80%A2+Zero+Cloud+Uploads" alt="Typing SVG" />

<br/>

<!-- Main Action Buttons -->
<p align="center">
  <a href="https://zacsluss.github.io/dataphreak/dataphreak.html">
    <img src="https://img.shields.io/badge/🎯_LAUNCH-LIVE_DEMO-2d7a3e?style=for-the-badge&labelColor=000000&logo=vercel&logoColor=white" alt="Live Demo"/>
  </a>
  <a href="https://github.com/Zacsluss/dataphreak/raw/main/dataphreak.html">
    <img src="https://img.shields.io/badge/⬇️_DOWNLOAD-1.29MB_HTML-0366d6?style=for-the-badge&labelColor=000000&logo=download&logoColor=white" alt="Download"/>
  </a>
</p>

<!-- GitHub Stats Badges -->
<p align="center">
  <img src="https://img.shields.io/github/stars/Zacsluss/dataphreak?style=social" alt="Stars"/>
  <img src="https://img.shields.io/github/forks/Zacsluss/dataphreak?style=social" alt="Forks"/>
  <img src="https://img.shields.io/github/license/Zacsluss/dataphreak?style=flat-square&color=555555" alt="License"/>
  <img src="https://img.shields.io/github/last-commit/Zacsluss/dataphreak?style=flat-square&color=666666" alt="Last Commit"/>
</p>

</div>

<br/>

---

## 🎯 What This Is

**Enterprise-grade data quality and cleaning tool that runs entirely in your browser**—packaged as a single 1.29MB HTML file. Upload CSV or Excel files for instant analysis: fuzzy duplicate detection, pattern recognition, quality scoring, and one-click cleaning—all without sending data to any server.

<div align="center">

```diff
+ Processes 1M+ rows with chunked algorithms
+ 100K rows analyzed in < 5 seconds
+ Fuzzy duplicate detection (Levenshtein distance)
+ A-F quality scoring (completeness, consistency, validity)
+ 100% offline processing—zero network requests
+ Embedded SheetJS for native Excel support
```

</div>

<br/>

<div align="center">

<!-- Performance Metrics -->
<table>
  <tr>
    <td align="center">
      <img src="https://img.shields.io/badge/Performance-100K_in_5s-2d7a3e?style=flat-square&logo=speedtest&logoColor=white"/><br/>
      <sub><b>Processing Speed</b></sub>
    </td>
    <td align="center">
      <img src="https://img.shields.io/badge/Capacity-1M%2B_Rows-1E4A6D?style=flat-square&logo=database&logoColor=white"/><br/>
      <sub><b>Data Scale</b></sub>
    </td>
    <td align="center">
      <img src="https://img.shields.io/badge/Size-1.29MB-8B3A3A?style=flat-square&logo=file&logoColor=white"/><br/>
      <sub><b>Single File</b></sub>
    </td>
    <td align="center">
      <img src="https://img.shields.io/badge/Privacy-100%25-8B6914?style=flat-square&logo=shield&logoColor=white"/><br/>
      <sub><b>Offline</b></sub>
    </td>
  </tr>
</table>

</div>

<div align="center">
<img width="800" src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=0,2,8&height=2"/>
</div>


---

## 📹 See It In Action

<div align="center">

<a href="https://zacsluss.github.io/dataphreak/dataphreak.html" target="_blank">
  <img src="dataphreak.gif" alt="dataphreak Demo" width="800"/>
</a>

*Click the demo above to try the live tool*

</div>

---

## 💡 The Technical Challenge

**Building professional-grade data analysis capabilities in pure JavaScript while maintaining performance with datasets exceeding 1 million rows.** The result processes 100,000 rows in under 5 seconds using chunked algorithms, Levenshtein distance calculations with smart blocking to achieve O(n log n) complexity, and LRU gradient caching for responsive visualizations.

<table>
<tr>
<td width="50%">

### 📊 Data Analysis Features

- **Fuzzy Duplicate Detection** - Catches "IBM Corp" vs "I.B.M. Corporation"
- **Smart Pattern Recognition** - Auto-identifies emails, phones, dates, URLs
- **A-F Quality Scoring** - Completeness, consistency, validity metrics
- **Statistical Profiling** - Distribution analysis, outlier detection
- **Missing Value Analysis** - Visual heatmaps and statistics
- **Custom Validation Rules** - Regex support for business logic

</td>
<td width="50%">

### 📈 The Numbers

| Metric                  | Value                   |
| ----------------------- | ----------------------- |
| Processing Speed        | 100K rows in < 5s       |
| Max Capacity            | 1M+ rows                |
| File Size               | 1.29MB (single HTML)    |
| Lines of Code           | 8,847                   |
| Code Split              | 70% JS, 26% CSS, 4% HTML |
| Fuzzy Match Complexity  | O(n log n)              |
| Network Requests        | 0                       |

</td>
</tr>
</table>

---

## 🚀 Quick Start

<table>
<tr>
<td width="33%" align="center">

### 🌐 Online

**[Launch Tool](https://zacsluss.github.io/dataphreak/dataphreak.html)**

Instant access, no installation

</td>
<td width="33%" align="center">

### 💾 Offline

**[Download HTML](https://github.com/Zacsluss/dataphreak/raw/main/dataphreak.html)**

Open in any browser

</td>
<td width="33%" align="center">

### 👨‍💻 Development

```bash
git clone <repo>
# Open file directly
```

</td>
</tr>
</table>

<br/>

---


<details>
<summary><b>🎨 Core Features</b></summary>

### Data Cleaning

- One-click standardization: case formatting, whitespace, special characters
- Phone number and email normalization
- Date format conversion to ISO standard
- Duplicate removal (exact and fuzzy)
- 50-operation undo/redo history

### File Operations

- Multi-format support: CSV, TSV, Excel (.xlsx/.xls)
- Smart encoding detection for any character set
- File merging with multiple join types (inner, left, right, full outer)
- Export to CSV, JSON, Excel
- Data dictionary generation

</details>

---

## 🛠️ Technical Stack

<div align="center">

![JavaScript](https://img.shields.io/badge/JavaScript-8B7500?style=for-the-badge&logo=javascript&logoColor=white)
![Canvas](https://img.shields.io/badge/Canvas_API-8B3A3A?style=for-the-badge&logo=html5&logoColor=white)
![SheetJS](https://img.shields.io/badge/SheetJS-1E5A2E?style=for-the-badge&logo=microsoftexcel&logoColor=white)

</div>

<br/>

<table>
<tr>
<td width="50%">

### 🏗️ Architecture

**Single HTML file** with:

- Chunked processing (memory-efficient)
- Spatial indexing (O(n log n) fuzzy matching)
- Content Security Policy (XSS protection)
- LocalStorage (preferences only, no data)
- Embedded SheetJS (true offline Excel)
- Web Workers (background processing)

</td>
<td width="50%">

### ⚡ Performance Optimizations

- **Blocked Levenshtein** calculations
- **LRU gradient cache** (3x speed boost)
- **Streaming algorithms** (process files > RAM)
- **Virtual scrolling** for efficient DOM updates
- **Zero network requests** during data ops
- **Chunked processing** for 1M+ rows

</td>
</tr>
</table>

---

## 💭 Why I Built This

**As someone managing CRM platforms serving 3,000+ users across 22 countries, I've seen how expensive and bloated enterprise data tools can be.**

- **Tableau Prep:** $25K-$75K annually
- **Alteryx:** $15K-$50K per seat
- **Both require:** Cloud uploads, lengthy implementations, extensive training

**I built dataphreak to prove that professional-grade data quality tools don't need enterprise licensing or cloud dependencies. The best leaders never stop coding.**

This project specifically explores:

- ✅ **Fundamental algorithms** - Levenshtein distance, statistical profiling, join operations
- ✅ **Single-file deployment** - Works forever (download today, works in 10 years)
- ✅ **Privacy by design** - Processing locally isn't just a feature, it's a philosophy
- ✅ **Zero dependencies** - Embedded SheetJS means true offline capability
- ✅ **Performance at scale** - 1M+ rows without external engines

**The privacy angle matters.** Data professionals shouldn't have to upload sensitive customer information to third-party servers just to find duplicates or assess quality. Processing locally isn't just a feature—it's a philosophy about data ownership and control.

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

## 🤝 Contributing

Bug reports and feature suggestions welcome. See [dataphreak_DOCUMENTATION.md](dataphreak_DOCUMENTATION.md) for detailed technical documentation.

<div align="center">

### Fork it, make it yours! No credit needed. 🚀

</div>

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,2,8&height=100&section=footer"/>

**Built by [Zachary Sluss](https://github.com/Zacsluss)** • MIT License

[![Portfolio](https://img.shields.io/badge/🌐_My_Portfolio-2d7a3e?style=flat-square)](https://zacsluss.github.io/portfolio)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0055A4?style=flat-square&logo=linkedin&logoColor=white)](https://linkedin.com/in/zacharyjsluss)
[![Email](https://img.shields.io/badge/Email-8B2E0F?style=flat-square&logo=gmail&logoColor=white)](mailto:zacsluss@yahoo.com)

</div>
