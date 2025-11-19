import { describe, it, expect, beforeEach } from 'vitest';
import {
  levenshteinDistance,
  calculateSimilarity,
  blockingKey,
  findMatches,
  clearCache
} from '../../src/js/algorithms/fuzzyMatcher.js';

describe('Fuzzy Matcher - Levenshtein Distance', () => {
  describe('levenshteinDistance()', () => {
    it('should return 0 for identical strings', () => {
      expect(levenshteinDistance('test', 'test')).toBe(0);
      expect(levenshteinDistance('IBM Corporation', 'IBM Corporation')).toBe(0);
    });

    it('should return string length for empty comparisons', () => {
      expect(levenshteinDistance('', 'test')).toBe(4);
      expect(levenshteinDistance('test', '')).toBe(4);
      expect(levenshteinDistance('', '')).toBe(0);
    });

    it('should calculate classic examples correctly', () => {
      expect(levenshteinDistance('kitten', 'sitting')).toBe(3);
      expect(levenshteinDistance('saturday', 'sunday')).toBe(3);
    });

    it('should be case-insensitive', () => {
      expect(levenshteinDistance('TEST', 'test')).toBe(0);
      expect(levenshteinDistance('IBM', 'ibm')).toBe(0);
      expect(levenshteinDistance('Test', 'tESt')).toBe(0);
    });

    it('should trim whitespace', () => {
      expect(levenshteinDistance('  test  ', 'test')).toBe(0);
      expect(levenshteinDistance('test', '  test  ')).toBe(0);
    });

    it('should handle special characters', () => {
      const dist = levenshteinDistance('I.B.M. Corp.', 'IBM Corporation');
      expect(dist).toBeGreaterThan(0);
      expect(dist).toBeLessThan(15); // Special chars increase distance
    });

    it('should handle very long strings efficiently', () => {
      const longStr1 = 'a'.repeat(1000);
      const longStr2 = 'a'.repeat(999) + 'b';

      const start = performance.now();
      const distance = levenshteinDistance(longStr1, longStr2);
      const duration = performance.now() - start;

      expect(distance).toBe(1);
      expect(duration).toBeLessThan(100); // Should complete in <100ms
    });

    it('should support early termination with maxDistance', () => {
      const result = levenshteinDistance('apple', 'zebra', 2);
      expect(result).toBeGreaterThan(2); // Exceeds max, returns max+1
    });
  });

  describe('calculateSimilarity()', () => {
    beforeEach(() => {
      clearCache(); // Clear cache before each test
    });

    it('should return 1.0 for identical strings', () => {
      expect(calculateSimilarity('test', 'test')).toBe(1.0);
      expect(calculateSimilarity('IBM Corporation', 'IBM Corporation')).toBe(1.0);
    });

    it('should return 0.0 for empty strings', () => {
      expect(calculateSimilarity('test', '')).toBe(0.0);
      expect(calculateSimilarity('', 'test')).toBe(0.0);
      expect(calculateSimilarity('', '')).toBe(1.0); // Both empty = identical
    });

    it('should calculate reasonable similarity for near-matches', () => {
      // "IBM Corp" vs "IBM Corporation" - reasonable similarity (~53%)
      const similarity = calculateSimilarity('IBM Corp', 'IBM Corporation');
      expect(similarity).toBeGreaterThan(0.50);
      expect(similarity).toBeLessThan(0.70);
    });

    it('should return low similarity for very different strings', () => {
      const similarity = calculateSimilarity('apple', 'zebra');
      expect(similarity).toBeLessThan(0.3);
    });

    it('should be case-insensitive', () => {
      expect(calculateSimilarity('TEST', 'test')).toBe(1.0);
      expect(calculateSimilarity('IBM', 'ibm')).toBe(1.0);
    });

    it('should trim whitespace', () => {
      expect(calculateSimilarity('  test  ', 'test')).toBe(1.0);
    });

    it('should handle special characters', () => {
      const similarity = calculateSimilarity('I.B.M. Corp.', 'IBM Corporation');
      expect(similarity).toBeGreaterThan(0.30);
      expect(similarity).toBeLessThan(1.0);
    });

    it('should use cache for repeated comparisons', () => {
      const str1 = 'test string';
      const str2 = 'test string 2';

      // First call
      const start1 = performance.now();
      const result1 = calculateSimilarity(str1, str2);
      const duration1 = performance.now() - start1;

      // Second call (should be cached)
      const start2 = performance.now();
      const result2 = calculateSimilarity(str1, str2);
      const duration2 = performance.now() - start2;

      expect(result1).toBe(result2);
      expect(duration2).toBeLessThan(duration1); // Cached should be faster
    });
  });

  describe('blockingKey()', () => {
    it('should generate consistent keys for similar-length strings', () => {
      const key1 = blockingKey('IBM Corp'); // 8 chars, bucket 2
      const key2 = blockingKey('IBM Inc.'); // 8 chars, bucket 2
      expect(key1).toBe(key2); // Both start with 'i' and same length bucket
    });

    it('should use first character and length bucket', () => {
      const key1 = blockingKey('apple');      // length 5, bucket 1
      const key2 = blockingKey('apricot');    // length 7, bucket 2
      const key3 = blockingKey('banana');     // length 6, different first char

      expect(key1).toMatch(/^a:/);  // Starts with 'a:'
      expect(key2).toMatch(/^a:/);  // Starts with 'a:'
      expect(key3).toMatch(/^b:/);  // Starts with 'b:'
      expect(key1).not.toBe(key2);  // Different length buckets
    });

    it('should handle empty strings', () => {
      expect(blockingKey('')).toBe('#:0');
      expect(blockingKey('   ')).toBe('#:0'); // Whitespace trimmed
    });

    it('should normalize case', () => {
      expect(blockingKey('TEST')).toBe(blockingKey('test'));
      expect(blockingKey('IBM')).toBe(blockingKey('ibm'));
    });

    it('should group similar-length strings', () => {
      // Length 3, 4, 5 all map to bucket 1
      expect(blockingKey('abc')).toBe('a:1');
      expect(blockingKey('abcd')).toBe('a:1');
      expect(blockingKey('abcde')).toBe('a:1');

      // Length 6, 7, 8 all map to bucket 2
      expect(blockingKey('abcdef')).toBe('a:2');
      expect(blockingKey('abcdefg')).toBe('a:2');
      expect(blockingKey('abcdefgh')).toBe('a:2');
    });
  });

  describe('findMatches()', () => {
    beforeEach(() => {
      clearCache();
    });

    it('should find exact matches at 1.0 threshold', () => {
      const rows = [
        ['IBM Corp', 'NY'],
        ['IBM Corporation', 'NY'],
        ['IBM Corp', 'CA']
      ];

      const matches = findMatches(rows, 0, 1.0);

      expect(matches).toHaveLength(1);
      expect(matches[0]).toMatchObject({
        a: 0,
        b: 2,
        aval: 'IBM Corp',
        bval: 'IBM Corp'
      });
    });

    it('should find fuzzy matches with blocking optimization', () => {
      const rows = [
        ['Company ABC'],    // 11 chars, bucket 3
        ['Company ABD'],    // 11 chars, bucket 3 - very similar, same block
        ['Microsoft']
      ];

      const matches = findMatches(rows, 0, 0.85);

      expect(matches.length).toBeGreaterThan(0);
      expect(matches[0].a).toBe(0);
      expect(matches[0].b).toBe(1);
      expect(matches[0].similarity).toBeGreaterThan(0.85);
    });

    it('should not match below threshold', () => {
      const rows = [
        ['Apple Inc'],
        ['Microsoft Corporation']
      ];

      const matches = findMatches(rows, 0, 0.85);
      expect(matches).toHaveLength(0);
    });

    it('should handle empty values', () => {
      const rows = [
        [''],
        [''],
        ['IBM']
      ];

      const matches = findMatches(rows, 0, 0.85);
      expect(matches).toHaveLength(0); // Empty strings are skipped
    });

    it('should handle null and undefined', () => {
      const rows = [
        [null],
        [undefined],
        ['IBM']
      ];

      // Should not crash
      expect(() => findMatches(rows, 0, 0.85)).not.toThrow();
    });

    it('should not return self-matches', () => {
      const rows = [
        ['IBM Corp'],
        ['IBM Corp']
      ];

      const matches = findMatches(rows, 0, 1.0);

      // Should not match row 0 with itself (rows 0 and 1 are different rows)
      expect(matches).toHaveLength(1);
      expect(matches[0].a).not.toBe(matches[0].b);
    });

    it('should sort matches by value then row index', () => {
      const rows = [
        ['Zebra'],
        ['Apple'],
        ['Apple'],
        ['Banana']
      ];

      const matches = findMatches(rows, 0, 1.0);

      // Apple matches should come before others alphabetically
      if (matches.length > 0) {
        expect(matches[0].aval.toLowerCase()).toBe('apple');
      }
    });

    it('should handle multiple columns', () => {
      const rows = [
        ['IBM', 'NY', '1000'],
        ['IBM', 'CA', '2000'],
        ['MS', 'WA', '3000']
      ];

      const matches1 = findMatches(rows, 0, 1.0); // Column 0
      const matches2 = findMatches(rows, 1, 1.0); // Column 1

      expect(matches1).toHaveLength(1); // IBM matches
      expect(matches2).toHaveLength(0); // No state matches
    });

    it('should throw error for invalid column index', () => {
      const rows = [['test']];

      expect(() => findMatches(rows, -1, 0.85)).toThrow('Invalid column index');
      expect(() => findMatches(rows, 5, 0.85)).toThrow('Invalid column index');
    });

    it('should throw error for invalid threshold', () => {
      const rows = [['test']];

      expect(() => findMatches(rows, 0, -0.1)).toThrow('Threshold must be between 0 and 1');
      expect(() => findMatches(rows, 0, 1.5)).toThrow('Threshold must be between 0 and 1');
    });

    it('should handle empty dataset', () => {
      const matches = findMatches([], 0, 0.85);
      expect(matches).toHaveLength(0);
    });

    it('should handle large datasets efficiently', () => {
      // Generate 1K rows with some duplicates
      const rows = [];
      for (let i = 0; i < 1000; i++) {
        rows.push([`Company ${i % 50}`]); // 50 unique values, repeated 20 times
      }

      const start = performance.now();
      const matches = findMatches(rows, 0, 1.0);
      const duration = performance.now() - start;

      expect(matches.length).toBeGreaterThan(0);
      expect(duration).toBeLessThan(2000); // Should complete in <2 seconds
    });

    it('should include similarity score in results', () => {
      const rows = [
        ['test'],
        ['test']
      ];

      const matches = findMatches(rows, 0, 1.0);

      expect(matches[0]).toHaveProperty('similarity');
      expect(matches[0].similarity).toBe(1.0);
    });

    it('should round similarity to 2 decimal places', () => {
      const rows = [
        ['testing'],
        ['test']
      ];

      const matches = findMatches(rows, 0, 0.70);

      if (matches.length > 0) {
        const decimalPlaces = matches[0].similarity.toString().split('.')[1]?.length || 0;
        expect(decimalPlaces).toBeLessThanOrEqual(2);
      }
    });
  });

  describe('clearCache()', () => {
    it('should clear the similarity cache', () => {
      // Populate cache
      calculateSimilarity('test1', 'test2');
      calculateSimilarity('test3', 'test4');

      // Clear cache
      clearCache();

      // Next call should recalculate (hard to test directly, but shouldn't throw)
      expect(() => calculateSimilarity('test1', 'test2')).not.toThrow();
    });
  });
});
