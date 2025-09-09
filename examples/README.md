# 📁 DATAPHREAK Sample Files

This directory contains sample CSV files to help you explore DATAPHREAK's features.

## Available Sample Files

### 1. sample_customers.csv
**Description:** Customer database with intentional data quality issues for testing

**Issues to find:**
- Duplicate records (John Smith appears multiple times)
- Inconsistent email formatting (mixed case)
- Various phone number formats
- Mixed date formats (MM/DD/YYYY, DD-MM-YYYY, YYYY/MM/DD)
- Missing values (empty cells)
- Leading/trailing spaces in names
- Invalid emails (missing domains)

**Try these features:**
- Fuzzy duplicate detection
- Email standardization
- Phone number formatting
- Date format standardization
- Data quality scoring

### 2. sample_products.csv
**Description:** Product inventory with data validation issues

**Issues to find:**
- Duplicate product entries (PRD001)
- Missing supplier information
- Negative stock quantities
- Inconsistent product naming (webcam HD vs others)
- Price variations for same products

**Try these features:**
- Exact duplicate detection
- Missing value analysis
- Outlier detection (negative stock)
- Data validation rules
- Statistical profiling

## How to Use

1. **Launch DATAPHREAK**: Open DATAPHREAK.html in your browser
2. **Load Sample**: Click "Try Sample Data" or drag one of these files
3. **Analyze**: View the instant quality assessment
4. **Clean**: Try different cleaning operations
5. **Export**: Save your cleaned data

## Common Test Scenarios

### Test 1: Find All Duplicates
1. Load `sample_customers.csv`
2. Check "Single-File Duplicates" section
3. Note both exact and fuzzy matches

### Test 2: Clean Email Addresses
1. Load `sample_customers.csv`
2. Go to "Data Cleaning & IDs"
3. Select email column
4. Apply "Fix letter case"

### Test 3: Standardize Dates
1. Load `sample_customers.csv`
2. Check "Row Analysis" section
3. Click "Apply Patterns" to fix all dates

### Test 4: Validate Inventory
1. Load `sample_products.csv`
2. Set validation rule: stock_quantity >= 0
3. Run validation to find issues

### Test 5: Merge Files
1. Load `sample_customers.csv` as primary
2. Create a second file with customer orders
3. Use "Merge Files by ID" feature

## Creating Your Own Test Files

To create files with specific issues for testing:

```csv
# Duplicate testing
John Doe,john@email.com
J. Doe,john@email.com
John D.,john.doe@email.com

# Format testing
2024-01-15,01/15/2024,15-01-2024
(555) 123-4567,555.123.4567,5551234567

# Missing value testing
Complete Row,value1,value2
Partial Row,,value2
,missing1,
```

## Need More Examples?

Visit our documentation for more complex scenarios and use cases:
https://github.com/Zacsluss/DATAPHREAK/blob/main/DATAPHREAK_DOCUMENTATION.md