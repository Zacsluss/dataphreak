import { describe, it, expect } from 'vitest';
import {
  isNullish,
  getQualityGrade,
  getQualityGradeColor,
  calculateDataQualityScore
} from '../../src/js/algorithms/qualityScorer.js';

describe('Quality Scorer', () => {
  describe('isNullish()', () => {
    it('should identify null and undefined as nullish', () => {
      expect(isNullish(null)).toBe(true);
      expect(isNullish(undefined)).toBe(true);
    });

    it('should identify empty strings as nullish', () => {
      expect(isNullish('')).toBe(true);
      expect(isNullish(' ')).toBe(true);
      expect(isNullish('   ')).toBe(true);
    });

    it('should identify common null markers as nullish', () => {
      expect(isNullish('NA')).toBe(true);
      expect(isNullish('N/A')).toBe(true);
      expect(isNullish('NULL')).toBe(true);
      expect(isNullish('null')).toBe(true);
      expect(isNullish('NaN')).toBe(true);
      expect(isNullish('nan')).toBe(true);
    });

    it('should handle whitespace around null markers', () => {
      expect(isNullish('  NA  ')).toBe(true);
      expect(isNullish('  NULL  ')).toBe(true);
    });

    it('should not identify valid values as nullish', () => {
      expect(isNullish('hello')).toBe(false);
      expect(isNullish(0)).toBe(false);
      expect(isNullish(false)).toBe(false);
      expect(isNullish('0')).toBe(false);
      expect(isNullish('false')).toBe(false);
    });

    it('should handle numbers as non-nullish', () => {
      expect(isNullish(42)).toBe(false);
      expect(isNullish(0)).toBe(false);
      expect(isNullish(-1)).toBe(false);
      expect(isNullish(3.14)).toBe(false);
    });
  });

  describe('getQualityGrade()', () => {
    it('should return A for 90-100%', () => {
      expect(getQualityGrade(100)).toBe('A');
      expect(getQualityGrade(95)).toBe('A');
      expect(getQualityGrade(90)).toBe('A');
    });

    it('should return B for 80-89%', () => {
      expect(getQualityGrade(89)).toBe('B');
      expect(getQualityGrade(85)).toBe('B');
      expect(getQualityGrade(80)).toBe('B');
    });

    it('should return C for 70-79%', () => {
      expect(getQualityGrade(79)).toBe('C');
      expect(getQualityGrade(75)).toBe('C');
      expect(getQualityGrade(70)).toBe('C');
    });

    it('should return D for 60-69%', () => {
      expect(getQualityGrade(69)).toBe('D');
      expect(getQualityGrade(65)).toBe('D');
      expect(getQualityGrade(60)).toBe('D');
    });

    it('should return F for below 60%', () => {
      expect(getQualityGrade(59)).toBe('F');
      expect(getQualityGrade(50)).toBe('F');
      expect(getQualityGrade(0)).toBe('F');
    });

    it('should handle string percentages', () => {
      expect(getQualityGrade('95')).toBe('A');
      expect(getQualityGrade('85.5')).toBe('B');
      expect(getQualityGrade('70')).toBe('C');
    });

    it('should handle edge cases at boundaries', () => {
      expect(getQualityGrade(89.99)).toBe('B');
      expect(getQualityGrade(90.01)).toBe('A');
      expect(getQualityGrade(79.99)).toBe('C');
      expect(getQualityGrade(80.01)).toBe('B');
    });
  });

  describe('getQualityGradeColor()', () => {
    it('should return green for A grades (90+)', () => {
      expect(getQualityGradeColor(100)).toBe('#22c55e');
      expect(getQualityGradeColor(90)).toBe('#22c55e');
    });

    it('should return blue for B grades (80-89)', () => {
      expect(getQualityGradeColor(89)).toBe('#38bdf8');
      expect(getQualityGradeColor(80)).toBe('#38bdf8');
    });

    it('should return orange for C grades (70-79)', () => {
      expect(getQualityGradeColor(79)).toBe('#f59e0b');
      expect(getQualityGradeColor(70)).toBe('#f59e0b');
    });

    it('should return red for D/F grades (below 70)', () => {
      expect(getQualityGradeColor(69)).toBe('#ef4444');
      expect(getQualityGradeColor(60)).toBe('#ef4444');
      expect(getQualityGradeColor(0)).toBe('#ef4444');
    });

    it('should handle string percentages', () => {
      expect(getQualityGradeColor('95')).toBe('#22c55e');
      expect(getQualityGradeColor('85')).toBe('#38bdf8');
    });
  });

  describe('calculateDataQualityScore()', () => {
    it('should return perfect score for complete data', () => {
      const headers = ['Name', 'Age', 'Email'];
      const rows = [
        ['Alice', 30, 'alice@example.com'],
        ['Bob', 25, 'bob@example.com'],
        ['Charlie', 35, 'charlie@example.com']
      ];

      const result = calculateDataQualityScore(headers, rows);

      expect(result.score).toBe(100);
      expect(result.grade).toBe('A');
      expect(result.breakdown.completeness).toBe(100);
    });

    it('should calculate correct score with some missing data', () => {
      const headers = ['Name', 'Age', 'Email'];
      const rows = [
        ['Alice', 30, 'alice@example.com'], // 3/3 complete
        ['Bob', null, 'bob@example.com'],   // 2/3 complete
        ['Charlie', 25, '']                  // 2/3 complete
      ];
      // Total: 7 non-null out of 9 cells = 77.78% ≈ 78%

      const result = calculateDataQualityScore(headers, rows);

      expect(result.score).toBe(78);
      expect(result.grade).toBe('C');
      expect(result.breakdown.completeness).toBe(78);
    });

    it('should handle completely empty dataset', () => {
      const headers = [];
      const rows = [];

      const result = calculateDataQualityScore(headers, rows);

      expect(result.score).toBe(0);
      expect(result.grade).toBe('F');
      expect(result.breakdown.completeness).toBe(0);
    });

    it('should handle dataset with no rows', () => {
      const headers = ['Name', 'Age'];
      const rows = [];

      const result = calculateDataQualityScore(headers, rows);

      expect(result.score).toBe(0);
      expect(result.grade).toBe('F');
    });

    it('should identify NA markers as missing', () => {
      const headers = ['Name', 'Age'];
      const rows = [
        ['Alice', 'NA'],
        ['Bob', 'N/A'],
        ['Charlie', 'NULL']
      ];
      // 3 out of 6 cells are non-null = 50%

      const result = calculateDataQualityScore(headers, rows);

      expect(result.score).toBe(50);
      expect(result.grade).toBe('F');
    });

    it('should handle whitespace-only cells as missing', () => {
      const headers = ['Name', 'Value'];
      const rows = [
        ['Alice', '   '],
        ['Bob', ' '],
        ['Charlie', 'valid']
      ];
      // 4 out of 6 cells non-null = 66.67% ≈ 67%

      const result = calculateDataQualityScore(headers, rows);

      expect(result.score).toBe(67);
      expect(result.grade).toBe('D');
    });

    it('should treat 0 and false as valid data', () => {
      const headers = ['Name', 'Count', 'Active'];
      const rows = [
        ['Alice', 0, false],
        ['Bob', 5, true]
      ];
      // All 6 cells are valid

      const result = calculateDataQualityScore(headers, rows);

      expect(result.score).toBe(100);
      expect(result.grade).toBe('A');
    });

    it('should handle single row dataset', () => {
      const headers = ['A', 'B', 'C'];
      const rows = [['x', null, 'z']];
      // 2 out of 3 cells = 66.67% ≈ 67%

      const result = calculateDataQualityScore(headers, rows);

      expect(result.score).toBe(67);
      expect(result.grade).toBe('D');
    });

    it('should handle single column dataset', () => {
      const headers = ['Name'];
      const rows = [
        ['Alice'],
        [null],
        ['Charlie']
      ];
      // 2 out of 3 cells = 66.67% ≈ 67%

      const result = calculateDataQualityScore(headers, rows);

      expect(result.score).toBe(67);
      expect(result.grade).toBe('D');
    });

    it('should handle large datasets efficiently', () => {
      const headers = ['Col1', 'Col2', 'Col3'];
      const rows = [];
      for (let i = 0; i < 1000; i++) {
        rows.push(['value1', 'value2', 'value3']);
      }

      const start = performance.now();
      const result = calculateDataQualityScore(headers, rows);
      const duration = performance.now() - start;

      expect(result.score).toBe(100);
      expect(duration).toBeLessThan(50); // Should complete in <50ms
    });

    it('should round scores to nearest integer', () => {
      const headers = ['A', 'B', 'C'];
      const rows = [
        ['x', 'y', 'z'],
        ['a', 'b', null],
        ['p', null, null]
      ];
      // 6 out of 9 cells = 66.67% → should round to 67

      const result = calculateDataQualityScore(headers, rows);

      expect(result.score).toBe(67);
      expect(Number.isInteger(result.score)).toBe(true);
    });
  });
});
