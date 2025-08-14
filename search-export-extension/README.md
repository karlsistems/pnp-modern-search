# Search Export & Filter Controls Extension

This SPFx library extension adds export functionality (Excel/CSV/PDF) and filter control buttons (Clear All/Apply) to PnP Modern Search web parts.

## Features

### 🎯 Export Functionality
- **Export to Excel (.xlsx)** - Full data export with formatting
- **Export to CSV** - Simple comma-separated values
- **Export to PDF** - Formatted PDF with table layout
- Configurable fields for export
- Dropdown menu with all export options

### 🔧 Filter Controls
- **Clear All button** - Clears all selected filters at once
- **Apply Filters button** - Manually apply filter selections
- Custom events for filter operations
- Flexible positioning (top/bottom of filter panel)

### 📐 Custom Layouts
- **Enhanced Results Layout** - Results with export button
- **Enhanced Filters Layout** - Filters with control buttons

## Installation

### 1. Build the Extension

```bash
cd search-export-extension
npm install
gulp bundle --ship
gulp package-solution --ship
```

### 2. Deploy to SharePoint

1. Upload `sharepoint/solution/search-export-extension.sppkg` to your App Catalog
2. Deploy the app when prompted
3. Make it available to all sites if desired

### 3. Register in PnP Modern Search

1. Edit the Search Results or Search Filters web part
2. Go to the last property pane page
3. Find "Extensibility configuration" section
4. Add the manifest ID: `893d948a-f7e9-4f16-b0e7-8f4c3a6889d2`
5. Enable the library
6. Save the web part

## Usage

### Using Export Buttons in Templates

In your Handlebars templates, add the export button component:

```handlebars
<pnp-export-buttons 
    items="{{JSONstringify items}}" 
    selected-fields='["Title", "Path", "Author", "Modified"]'
    title="My Search Results">
</pnp-export-buttons>
```

**Properties:**
- `items` - The array of items to export (required)
- `selected-fields` - Array of field names to export (optional, exports all if not specified)
- `title` - Title for the exported file (optional)

### Using Filter Controls

In your filter templates, add the control buttons:

```handlebars
<pnp-filter-controls 
    show-apply-button="true"
    clear-button-text="Clear All Filters"
    apply-button-text="Apply">
</pnp-filter-controls>
```

**Properties:**
- `show-apply-button` - Show/hide the Apply button (default: true)
- `clear-button-text` - Custom text for Clear button
- `apply-button-text` - Custom text for Apply button

### Using Custom Layouts

1. In Search Results web part:
   - Select "Enhanced Results with Export" layout
   - Configure export fields in property pane

2. In Search Filters web part:
   - Select "Enhanced Filters with Controls" layout
   - Configure button visibility in property pane

## Custom Events

The extension dispatches custom events that you can listen to:

```javascript
// Listen for clear all filters
document.addEventListener('pnp-clear-all-filters', (event) => {
    console.log('Filters cleared', event.detail);
});

// Listen for apply filters
document.addEventListener('pnp-apply-filters', (event) => {
    console.log('Filters applied', event.detail);
});
```

## Customization

### Styling

Add custom CSS to your SharePoint site:

```css
/* Style export button */
.export-buttons-container button {
    background-color: #0078d4 !important;
}

/* Style filter controls */
.filter-controls button {
    min-width: 150px !important;
}
```

### Extending the Components

You can extend the components by creating your own version:

```typescript
import { ExportButtonsWebComponent } from 'search-export-extension';

class MyCustomExportButton extends ExportButtonsWebComponent {
    // Add custom logic
}
```

## Handlebars Helpers

The extension registers useful Handlebars helpers:

- `{{JSONstringify object}}` - Convert object to JSON string
- `{{formatDate date "short"}}` - Format dates (short/long)
- `{{truncate text 100}}` - Truncate text to specified length

## Development

### Prerequisites
- Node.js v14 or v16
- SPFx 1.20.0
- PnP Modern Search v4.13.0

### Local Development

```bash
# Install dependencies
npm install

# Serve locally
gulp serve

# Build
gulp bundle

# Package
gulp package-solution
```

### Project Structure

```
search-export-extension/
├── src/
│   ├── webComponents/
│   │   ├── ExportButtons/      # Export button component
│   │   └── FilterControls/     # Filter control buttons
│   ├── layouts/
│   │   ├── EnhancedResultsLayout/  # Results with export
│   │   └── EnhancedFiltersLayout/  # Filters with controls
│   └── libraries/
│       └── SearchExportExtensibilityLibrary.ts  # Main entry
├── config/
│   ├── config.json
│   └── package-solution.json
└── package.json
```

## Troubleshooting

### Extension not loading
- Verify manifest ID is correctly registered
- Check browser console for errors
- Ensure extension is deployed to App Catalog
- Verify SPFx version compatibility

### Export not working
- Check if items array is properly passed
- Verify field names match actual data
- Check browser console for errors
- Ensure required npm packages are installed

### Filter buttons not responding
- Verify event listeners are registered
- Check if web part is in edit/display mode
- Ensure proper event bubbling

## License

MIT

## Support

For issues or questions, please create an issue in the GitHub repository.