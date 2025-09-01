# MPC Database

A comprehensive database of research papers on Multi-Party Computation (MPC) and related cryptographic topics.

## Features

- **Smart Paper Management**: Automatic metadata fetching from major venues (ePrint, ACM, IEEE, Springer)
- **Advanced Search**: Boolean logic with field-specific queries
- **Label System**: Categorize papers by topics, techniques, and applications
- **Follow-up Graph**: Visualize connections between papers
- **Personal Annotations**: Private scratchpad notes for each paper
- **Reading Status Tracking**: Track your progress through the literature
- **Change Integration**: Submit improvements to the main database

## Quick Start

1. Open `mpc_db.html` in your web browser
2. The database will automatically load with the latest papers from `mpc_db.json`
3. Use the search bar or browse by labels to find papers
4. Click on any paper to view details, add notes, or edit metadata

## Adding Papers

### Automatic Fetching
1. Install CORS Unblock extension (Chrome/Firefox) for best results
2. Paste paper URL in the "Add Paper" section
3. Click "Fetch" to automatically extract metadata
4. Supported sources: ePrint Archive, ACM Digital Library, IEEE Xplore

### Manual Entry
1. For Springer papers or when automatic fetching fails
2. Copy the full page text (Ctrl+A / Cmd+A)
3. Paste into "Manual Parser" section
4. Edit extracted metadata if needed

## Advanced Search

The search system supports powerful Boolean queries:

### Basic Search
- `homomorphic encryption` - Search all fields
- `"exact phrase"` - Exact phrase matching

### Field-Specific Search
- `title:homomorphic` - Search only titles
- `author:"alice smith"` - Search for specific author
- `abstract:MPC` - Search abstracts
- `venue:CRYPTO` - Search by venue
- `date:2023` - Papers from specific year
- `label:protocol` - Papers with specific label

### Boolean Logic
- `title:homomorphic AND date:2023` - Both conditions
- `(title:FHE OR title:homomorphic) AND author:alice` - Complex queries
- `label:MPC NOT label:theory` - Exclude terms

### Case-Sensitive Search
- `title:#OT` - Use # prefix for exact case matching

## Contributing Changes

When you modify papers, add labels, or make other changes, they are stored locally. To contribute your improvements:

1. Click "Integrate Changes"
2. Fill in your contact information
3. Review the changes summary
4. Click "Send Changes"

This will:
- Generate an email to mpc@irif.fr with your changes
- Create a diff file with only the modifications
- Allow the maintainer to review and integrate your contributions

**Note**: Unintegrated changes will be overwritten when the database is updated. Use "Export" to save your personal copy.

## Personal Data

The following stays private in your browser:
- **Scratchpad notes** - Your annotations for each paper
- **Reading status** - Progress tracking (to-read, reading, read, etc.)
- **Folders** - Your personal organization system
- **Favorites** - Papers you've starred

## Export Options

- **Export**: Papers and labels only (for sharing/backup)
- **Export Full**: Includes all personal data (scratchpad, reading status, folders)

When importing, non-full exports preserve your personal data.

## Admin Features

Administrators can:
- Access maintenance tools (password protected)
- Import diff files from contributors
- Update the main database
- Refresh metadata and fix data issues

## Browser Requirements

- Modern browser with JavaScript enabled
- CORS Unblock extension recommended for automatic paper fetching
- Local storage and IndexedDB support

## Technical Details

### Data Storage
- Papers stored in browser's IndexedDB for persistence
- Automatic backup to localStorage
- Change tracking against original mpc_db.json

### File Structure
- `mpc_db.html` - Main application
- `mpc_db.json` - Master database (auto-loaded on startup)
- `README.md` - This documentation

### Supported Paper Sources
- **ePrint Archive** (eprint.iacr.org) - Full support
- **ACM Digital Library** - Full support
- **IEEE Xplore** - Full support  
- **Springer** - Limited (manual parsing recommended)

## Contributing to Development

This is version 0.1. We welcome:
- Bug reports and feature requests
- New label suggestions
- Code contributions
- Paper additions and corrections

Contact: mpc@irif.fr

## License

Research and educational use. Please cite papers appropriately when using this database for academic work.