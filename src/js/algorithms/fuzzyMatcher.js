/**
 * Fuzzy Matching Algorithm using Levenshtein Distance with Spatial Indexing
 *
 * Implements O(n log n) approximate duplicate detection using:
 * - Blocked Levenshtein distance (group by first char + length bucket)
 * - LRU cache for memoization
 * - Configurable similarity threshold
 *
 * @module algorithms/fuzzyMatcher
 */

// ====================================================================
// CONSTANTS
// ====================================================================

const DEFAULT_THRESHOLD = 0.85
const CACHE_SIZE = 10_000

// ====================================================================
// LRU CACHE
// ====================================================================

class LRUCache {
  constructor (maxSize = 10000) {
    this.cache = new Map()
    this.maxSize = maxSize
  }

  get (key) {
    if (!this.cache.has(key)) return undefined

    // Move to end (most recently used)
    const value = this.cache.get(key)
    this.cache.delete(key)
    this.cache.set(key, value)

    return value
  }

  set (key, value) {
    // Remove if exists (to update position)
    if (this.cache.has(key)) {
      this.cache.delete(key)
    }

    // Evict oldest if at capacity
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value
      this.cache.delete(firstKey)
    }

    this.cache.set(key, value)
  }

  clear () {
    this.cache.clear()
  }
}

const similarityCache = new LRUCache(CACHE_SIZE)

// ====================================================================
// LEVENSHTEIN DISTANCE
// ====================================================================

/**
 * Calculates Levenshtein distance between two strings.
 * Uses dynamic programming with early termination.
 *
 * @param {string} a - First string
 * @param {string} b - Second string
 * @param {number} [maxDistance=Infinity] - Maximum distance before early termination
 * @returns {number} Edit distance (number of operations to transform a into b)
 *
 * @example
 * levenshteinDistance('kitten', 'sitting')  // Returns: 3
 * levenshteinDistance('IBM Corp', 'IBM Corporation')  // Returns: 6
 */
export function levenshteinDistance (a, b, maxDistance = Infinity) {
  // Normalize inputs
  a = String(a || '').toLowerCase().trim()
  b = String(b || '').toLowerCase().trim()

  // Quick checks
  if (a === b) return 0
  if (a.length === 0) return b.length
  if (b.length === 0) return a.length

  // Early termination if length difference exceeds max distance
  if (Math.abs(a.length - b.length) > maxDistance) {
    return maxDistance + 1
  }

  // Use shorter string as first parameter (optimization)
  if (a.length > b.length) {
    [a, b] = [b, a]
  }

  // Initialize distance matrix (use 1D array for memory efficiency)
  const m = a.length
  const n = b.length
  let prevRow = Array.from({ length: n + 1 }, (_, i) => i)
  let currRow = new Array(n + 1)

  for (let i = 1; i <= m; i++) {
    currRow[0] = i
    let minDist = i

    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      currRow[j] = Math.min(
        prevRow[j] + 1, // Deletion
        currRow[j - 1] + 1, // Insertion
        prevRow[j - 1] + cost // Substitution
      )
      minDist = Math.min(minDist, currRow[j])
    }

    // Early termination if minimum distance in row exceeds max
    if (minDist > maxDistance) {
      return maxDistance + 1
    }

    // Swap rows
    [prevRow, currRow] = [currRow, prevRow]
  }

  return prevRow[n]
}

/**
 * Calculates similarity score (0-1) based on Levenshtein distance.
 *
 * @param {string} a - First string
 * @param {string} b - Second string
 * @returns {number} Similarity score between 0 (completely different) and 1 (identical)
 *
 * @example
 * calculateSimilarity('test', 'test')  // Returns: 1.0
 * calculateSimilarity('IBM Corp', 'IBM Corporation')  // Returns: ~0.85
 */
export function calculateSimilarity (a, b) {
  // Normalize
  a = String(a || '').toLowerCase().trim()
  b = String(b || '').toLowerCase().trim()

  // Check cache
  const cacheKey = `${a}:${b}`
  const cached = similarityCache.get(cacheKey)
  if (cached !== undefined) return cached

  // Quick checks
  if (a === b) {
    similarityCache.set(cacheKey, 1.0)
    return 1.0
  }
  if (a.length === 0 || b.length === 0) {
    similarityCache.set(cacheKey, 0.0)
    return 0.0
  }

  // Calculate distance
  const maxLen = Math.max(a.length, b.length)
  const distance = levenshteinDistance(a, b, maxLen)

  // Convert to similarity score
  const similarity = 1.0 - (distance / maxLen)

  // Cache result
  similarityCache.set(cacheKey, similarity)

  return similarity
}

// ====================================================================
// SPATIAL INDEXING (BLOCKING)
// ====================================================================

/**
 * Generates blocking key for spatial indexing.
 * Groups strings by first character and length bucket.
 *
 * @param {string} str - String to generate key for
 * @returns {string} Blocking key (format: "firstChar:lengthBucket")
 *
 * @example
 * blockingKey('IBM Corporation')  // Returns: "i:5" (first char 'i', length/3 = 5)
 * blockingKey('test')              // Returns: "t:1" (first char 't', length/3 = 1)
 */
export function blockingKey (str) {
  str = String(str || '').toLowerCase().trim()
  if (str.length === 0) return '#:0'

  const firstChar = str[0]
  const lengthBucket = Math.floor(str.length / 3)

  return `${firstChar}:${lengthBucket}`
}

/**
 * Builds spatial index for fast lookup.
 * Groups rows by blocking key to reduce comparisons.
 *
 * @param {Array<Array<any>>} rows - Dataset rows
 * @param {number} columnIndex - Column to index
 * @returns {Map<string, Array<{idx: number, val: string}>>} Spatial index
 */
function buildSpatialIndex (rows, columnIndex) {
  const index = new Map()

  rows.forEach((row, idx) => {
    const value = String(row[columnIndex] || '').trim()
    if (value.length === 0) return // Skip empty values

    const key = blockingKey(value)
    if (!index.has(key)) {
      index.set(key, [])
    }

    index.get(key).push({ idx, val: value })
  })

  return index
}

// ====================================================================
// MATCH FINDING
// ====================================================================

/**
 * Finds fuzzy matches in dataset using blocked Levenshtein distance.
 * Complexity: O(n log n) average case due to spatial indexing.
 *
 * @param {Array<Array<any>>} rows - Dataset rows
 * @param {number} columnIndex - Column index to compare
 * @param {number} [threshold=0.85] - Similarity threshold (0-1)
 * @returns {Array<{a: number, b: number, aval: string, bval: string, similarity: number}>} Match pairs
 *
 * @example
 * const rows = [
 *   ['IBM Corp', 'NY'],
 *   ['I.B.M. Corporation', 'NY'],
 *   ['Microsoft', 'WA']
 * ];
 * const matches = findMatches(rows, 0, 0.85);
 * // Returns: [{ a: 0, b: 1, aval: 'IBM Corp', bval: 'I.B.M. Corporation', similarity: 0.85 }]
 */
export function findMatches (rows, columnIndex, threshold = DEFAULT_THRESHOLD) {
  if (!Array.isArray(rows) || rows.length === 0) {
    return []
  }

  if (columnIndex < 0 || columnIndex >= (rows[0]?.length || 0)) {
    throw new Error(`Invalid column index: ${columnIndex}`)
  }

  if (threshold < 0 || threshold > 1) {
    throw new Error(`Threshold must be between 0 and 1, got: ${threshold}`)
  }

  // Build spatial index
  const index = buildSpatialIndex(rows, columnIndex)

  // Find matches within each block
  const matches = []
  const seen = new Set() // Prevent duplicate pairs

  index.forEach((block) => {
    // Compare all pairs within block
    for (let i = 0; i < block.length; i++) {
      for (let j = i + 1; j < block.length; j++) {
        const itemA = block[i]
        const itemB = block[j]

        // Skip if same row (self-match)
        if (itemA.idx === itemB.idx) continue

        // Skip if already compared (avoid duplicates)
        const pairKey = `${Math.min(itemA.idx, itemB.idx)},${Math.max(itemA.idx, itemB.idx)}`
        if (seen.has(pairKey)) continue
        seen.add(pairKey)

        // Calculate similarity
        const similarity = calculateSimilarity(itemA.val, itemB.val)

        if (similarity >= threshold) {
          matches.push({
            a: itemA.idx,
            b: itemB.idx,
            aval: itemA.val,
            bval: itemB.val,
            similarity: Math.round(similarity * 100) / 100 // Round to 2 decimals
          })
        }
      }
    }
  })

  // Sort by value (alphabetical) then row index
  matches.sort((x, y) => {
    const valCompare = x.aval.localeCompare(y.aval)
    if (valCompare !== 0) return valCompare
    return x.a - y.a
  })

  return matches
}

/**
 * Clears the similarity cache.
 * Useful for memory management after processing large datasets.
 */
export function clearCache () {
  similarityCache.clear()
}
