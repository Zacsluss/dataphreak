#!/usr/bin/env node

/**
 * Build Script for DATAPHREAK
 *
 * This script is a placeholder for future modular development.
 * Currently, dataphreak.html is a single file by design.
 *
 * Future: This will concatenate modular source files into
 * the single distributable HTML file.
 */

const fs = require('fs')
const path = require('path')

console.log('🔨 DATAPHREAK Build System')
console.log('====================================\n')

// Check if dataphreak.html exists
const htmlPath = path.join(__dirname, '..', 'dataphreak.html')

if (!fs.existsSync(htmlPath)) {
  console.error('❌ ERROR: dataphreak.html not found!')
  console.error('   Expected location:', htmlPath)
  process.exit(1)
}

// Get file stats
const stats = fs.statSync(htmlPath)
const fileSizeInMB = (stats.size / (1024 * 1024)).toFixed(2)

console.log('✅ Current Build Status:')
console.log(`   File: dataphreak.html`)
console.log(`   Size: ${fileSizeInMB} MB`)
console.log(`   Lines: Checking...`)

// Count lines
const content = fs.readFileSync(htmlPath, 'utf8')
const lineCount = content.split('\n').length

console.log(`   Lines: ${lineCount.toLocaleString()}`)

// Validate HTML structure
console.log('\n📋 Validation:')

const hasDoctype = content.startsWith('<!DOCTYPE')
const hasHtml = content.includes('<html')
const hasHead = content.includes('<head>')
const hasBody = content.includes('<body>')
const hasClosingHtml = content.includes('</html>')

console.log(`   DOCTYPE: ${hasDoctype ? '✅' : '❌'}`)
console.log(`   <html>: ${hasHtml ? '✅' : '❌'}`)
console.log(`   <head>: ${hasHead ? '✅' : '❌'}`)
console.log(`   <body>: ${hasBody ? '✅' : '❌'}`)
console.log(`   </html>: ${hasClosingHtml ? '✅' : '❌'}`)

// Check for CSP
const hasCSP = content.includes('Content-Security-Policy')
console.log(`   CSP: ${hasCSP ? '✅' : '❌'}`)

// Check for embedded libraries
const hasSheetJS = content.includes('SheetJS')
console.log(`   SheetJS: ${hasSheetJS ? '✅' : '❌'}`)

// Future build steps would go here
console.log('\n📦 Build Process:')
console.log('   ℹ️  Single-file architecture - no build needed')
console.log('   ℹ️  Future: Will support modular development')

console.log('\n✅ Build complete!')
console.log('====================================\n')

// Exit successfully
process.exit(0)
