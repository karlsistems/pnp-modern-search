import { ExportButtonsWebComponent } from '../webComponents/ExportButtons/ExportButtonsWebComponent';
import { FilterControlsWebComponent } from '../webComponents/FilterControls/FilterControlsWebComponent';
// Layout classes are referenced in the array below
// import { EnhancedResultsLayout } from '../layouts/EnhancedResultsLayout/EnhancedResultsLayout';
// import { EnhancedFiltersLayout } from '../layouts/EnhancedFiltersLayout/EnhancedFiltersLayout';
// Template content as strings
var enhancedResultsTemplate = "<div class=\"enhanced-results-layout\">\n    <div class=\"export-controls\" style=\"text-align: right; margin-bottom: 15px;\">\n        <pnp-export-buttons \n            items=\"{{JSONstringify items}}\" \n            selected-fields='[\"Title\", \"Path\", \"Author\", \"Modified\"]'\n            title=\"Search Results\">\n        </pnp-export-buttons>\n    </div>\n    \n    <div class=\"results-container\">\n        {{#if items.length}}\n            <div class=\"results-count\" style=\"margin-bottom: 10px;\">\n                <strong>{{items.length}} results found</strong>\n            </div>\n            \n            <div class=\"results-list\">\n                {{#each items}}\n                    <div class=\"result-item\" style=\"padding: 15px; border: 1px solid #e1e1e1; margin-bottom: 10px; border-radius: 4px;\">\n                        <h3 style=\"margin-top: 0;\">\n                            {{#if Path}}\n                                <a href=\"{{Path}}\" target=\"_blank\">{{Title}}</a>\n                            {{else}}\n                                {{Title}}\n                            {{/if}}\n                        </h3>\n                        \n                        {{#if HitHighlightedSummary}}\n                            <div class=\"summary\" style=\"margin: 10px 0;\">\n                                {{{HitHighlightedSummary}}}\n                            </div>\n                        {{/if}}\n                        \n                        <div class=\"metadata\" style=\"color: #666; font-size: 0.9em;\">\n                            {{#if Author}}\n                                <span>By: {{Author}}</span> | \n                            {{/if}}\n                            {{#if Modified}}\n                                <span>Modified: {{getDate Modified \"LL\"}}</span>\n                            {{/if}}\n                        </div>\n                    </div>\n                {{/each}}\n            </div>\n        {{else}}\n            <div class=\"no-results\" style=\"text-align: center; padding: 40px;\">\n                <h3>No results found</h3>\n                <p>Try adjusting your search terms or filters</p>\n            </div>\n        {{/if}}\n    </div>\n</div>";
var enhancedFiltersTemplate = "<div class=\"enhanced-filters-layout\">\n    <div class=\"filters-header\" style=\"margin-bottom: 15px;\">\n        <h3>Filters</h3>\n    </div>\n    \n    <div class=\"filter-controls\">\n        <pnp-filter-controls \n            show-apply-button=\"true\"\n            clear-button-text=\"Clear All\"\n            apply-button-text=\"Apply Filters\">\n        </pnp-filter-controls>\n    </div>\n    \n    <div class=\"filters-container\" style=\"margin-top: 15px;\">\n        {{#each filters}}\n            <div class=\"filter-group\" style=\"margin-bottom: 20px;\">\n                <h4 style=\"margin-bottom: 10px;\">{{displayName}}</h4>\n                \n                {{#if values}}\n                    <div class=\"filter-values\">\n                        {{#each values}}\n                            <div class=\"filter-item\" style=\"margin-bottom: 5px;\">\n                                <label style=\"display: flex; align-items: center;\">\n                                    <input \n                                        type=\"checkbox\" \n                                        name=\"{{../name}}\" \n                                        value=\"{{value}}\"\n                                        {{#if selected}}checked{{/if}}\n                                        style=\"margin-right: 8px;\"\n                                    />\n                                    <span>{{name}} ({{count}})</span>\n                                </label>\n                            </div>\n                        {{/each}}\n                    </div>\n                {{/if}}\n            </div>\n        {{/each}}\n    </div>\n    \n    <div class=\"filter-controls-bottom\" style=\"margin-top: 20px; border-top: 1px solid #e1e1e1; padding-top: 15px;\">\n        <pnp-filter-controls \n            show-apply-button=\"false\"\n            clear-button-text=\"Reset Filters\">\n        </pnp-filter-controls>\n    </div>\n</div>";
var SearchExportExtensibilityLibrary = /** @class */ (function () {
    function SearchExportExtensibilityLibrary() {
        // No service scope needed for simplified version
    }
    /**
     * Returns the library name
     */
    SearchExportExtensibilityLibrary.prototype.name = function () {
        return 'Search Export & Filter Controls Extension';
    };
    /**
     * Register custom web components
     */
    SearchExportExtensibilityLibrary.prototype.getCustomWebComponents = function () {
        return [
            {
                componentName: 'pnp-export-buttons',
                componentClass: ExportButtonsWebComponent
            },
            {
                componentName: 'pnp-filter-controls',
                componentClass: FilterControlsWebComponent
            }
        ];
    };
    /**
     * Register custom layouts
     */
    SearchExportExtensibilityLibrary.prototype.getCustomLayouts = function () {
        return [
            {
                name: 'Enhanced Results with Export',
                iconName: 'Export',
                key: 'enhanced-results-export',
                type: 'Results',
                serviceKey: null,
                templateContent: enhancedResultsTemplate
            },
            {
                name: 'Enhanced Filters with Controls',
                iconName: 'Filter',
                key: 'enhanced-filters-controls',
                type: 'Filters',
                serviceKey: null,
                templateContent: enhancedFiltersTemplate
            }
        ];
    };
    /**
     * Register custom Handlebars helpers
     */
    SearchExportExtensibilityLibrary.prototype.registerHandlebarsCustomizations = function (handlebarsNamespace) {
        // Register helper to stringify JSON for passing to web components
        handlebarsNamespace.registerHelper('JSONstringify', function (object) {
            return JSON.stringify(object);
        });
        // Register helper to format dates
        handlebarsNamespace.registerHelper('formatDate', function (date, format) {
            if (!date)
                return '';
            var d = new Date(date);
            switch (format) {
                case 'short':
                    return d.toLocaleDateString();
                case 'long':
                    return d.toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });
                default:
                    return d.toLocaleString();
            }
        });
        // Register helper to truncate text
        handlebarsNamespace.registerHelper('truncate', function (text, length) {
            if (!text)
                return '';
            if (text.length <= length)
                return text;
            return text.substring(0, length) + '...';
        });
    };
    /**
     * No custom data sources in this extension
     */
    SearchExportExtensibilityLibrary.prototype.getCustomDataSources = function () {
        return [];
    };
    /**
     * No custom suggestion providers in this extension
     */
    SearchExportExtensibilityLibrary.prototype.getCustomSuggestionProviders = function () {
        return [];
    };
    /**
     * No custom query modifiers in this extension
     */
    SearchExportExtensibilityLibrary.prototype.getCustomQueryModifiers = function () {
        return [];
    };
    return SearchExportExtensibilityLibrary;
}());
export { SearchExportExtensibilityLibrary };
//# sourceMappingURL=SearchExportExtensibilityLibrary.js.map