/**
 * Data Quality Scoring Algorithm
 *
 * Calculates overall data quality scores based on completeness.
 * Provides A-F letter grades for quick assessment.
 *
 * @module algorithms/qualityScorer
 */

// ====================================================================
// CONSTANTS
// ====================================================================

const NULL_MARKERS = new Set(['', ' ', 'NA', 'N/A', 'NULL', 'null', 'NaN', 'nan']);

// Grade thresholds
const GRADE_THRESHOLDS = {
  A: 90,
  B: 80,
  C: 70,
  D: 60,
  F: 0
};

// Grade colors for UI display
const GRADE_COLORS = {
  A: '#22c55e', // green
  B: '#38bdf8', // blue
  C: '#f59e0b', // orange
  D: '#ef4444', // red
  F: '#ef4444'  // red
};

// ====================================================================
// HELPER FUNCTIONS
// ====================================================================

/**
 * Checks if a value should be considered null/missing.
 *
 * @param {any} v - Value to check
 * @returns {boolean} True if value is null, undefined, or a null marker
 *
 * @example
 * isNullish(null)      // true
 * isNullish(undefined) // true
 * isNullish('')        // true
 * isNullish('NA')      // true
 * isNullish('hello')   // false
 */
export function isNullish (v) {
  return v == null || NULL_MARKERS.has(String(v).trim());
}

/**
 * Converts a percentage to a letter grade (A-F).
 *
 * @param {number|string} percentage - Percentage score (0-100)
 * @returns {string} Letter grade (A, B, C, D, or F)
 *
 * @example
 * getQualityGrade(95)   // 'A'
 * getQualityGrade(85)   // 'B'
 * getQualityGrade(75)   // 'C'
 * getQualityGrade(65)   // 'D'
 * getQualityGrade(50)   // 'F'
 */
export function getQualityGrade (percentage) {
  const p = parseFloat(percentage);
  if (p >= GRADE_THRESHOLDS.A) return 'A';
  if (p >= GRADE_THRESHOLDS.B) return 'B';
  if (p >= GRADE_THRESHOLDS.C) return 'C';
  if (p >= GRADE_THRESHOLDS.D) return 'D';
  return 'F';
}

/**
 * Gets the color associated with a quality grade.
 *
 * @param {number|string} percentage - Percentage score (0-100)
 * @returns {string} Hex color code
 *
 * @example
 * getQualityGradeColor(95)  // '#22c55e' (green)
 * getQualityGradeColor(85)  // '#38bdf8' (blue)
 * getQualityGradeColor(75)  // '#f59e0b' (orange)
 * getQualityGradeColor(50)  // '#ef4444' (red)
 */
export function getQualityGradeColor (percentage) {
  const p = parseFloat(percentage);
  if (p >= GRADE_THRESHOLDS.A) return GRADE_COLORS.A;
  if (p >= GRADE_THRESHOLDS.B) return GRADE_COLORS.B;
  if (p >= GRADE_THRESHOLDS.C) return GRADE_COLORS.C;
  return GRADE_COLORS.D; // D and F use same color
}

// ====================================================================
// QUALITY SCORING
// ====================================================================

/**
 * Calculates overall data quality score based on completeness.
 *
 * Currently measures only completeness (percentage of non-null cells).
 * Future versions may include consistency and validity checks.
 *
 * @param {string[]} headers - Column headers
 * @param {Array<Array<any>>} rows - Data rows
 * @returns {{score: number, grade: string, breakdown: {completeness: number}}} Quality assessment
 *
 * @example
 * const headers = ['Name', 'Age', 'Email'];
 * const rows = [
 *   ['Alice', 30, 'alice@example.com'],
 *   ['Bob', null, 'bob@example.com'],
 *   ['Charlie', 25, '']
 * ];
 * const quality = calculateDataQualityScore(headers, rows);
 * // Returns: { score: 78, grade: 'C', breakdown: { completeness: 78 } }
 * // 7 out of 9 cells are non-null: (7/9) * 100 = 77.78% ≈ 78%
 */
export function calculateDataQualityScore (headers, rows) {
  const totalCells = headers.length * rows.length;
  if (totalCells === 0) {
    return {
      score: 0,
      grade: 'F',
      breakdown: { completeness: 0 }
    };
  }

  // Calculate completeness: percentage of non-null cells
  let missingCells = 0;
  for (const row of rows) {
    for (const cell of row) {
      if (isNullish(cell)) {
        missingCells++;
      }
    }
  }

  const completenessPercent = ((totalCells - missingCells) / totalCells * 100);
  const score = Math.round(completenessPercent);
  const grade = getQualityGrade(completenessPercent);

  return {
    score,
    grade,
    breakdown: {
      completeness: score
    }
  };
}
