# Changelog - Parsify Frontend

## [Unreleased] - 2026-04-02

### Changed
- **axios**: Updated from `^1.14.0` to `1.13.6` (exact version)
  - Reason: User requested version change excluding 1.14.1 and 0.30.4
  - Note: Version 1.15.0 was initially attempted but does not exist in npm registry
  - Version 1.13.6 selected as the latest stable release before 1.14.x series
  - Used exact version (without `^`) to ensure 1.13.6 is installed, not 1.14.0

### Project Context
- **Project**: Parsify - Ultra-Precision Visual AI Engine (Hindi OCR Frontend)
- **Stack**: React ^19.2.4 + Vite ^8.0.1 + TypeScript ~5.9.3
- **Usage**: axios used for POST requests with FormData to external OCR API at `https://angstormy-hindi-ocr-api.hf.space/predict`

### Installation Summary
- Command: `npm install`
- Result: 44 packages added, 45 packages audited
- Vulnerabilities: 0 found
- Status: Success

### Files Modified
- `package.json` - Updated axios dependency version
- `package-lock.json` - Regenerated with new axios version
