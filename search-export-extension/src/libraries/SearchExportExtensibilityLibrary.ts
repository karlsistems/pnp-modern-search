import { 
    IExtensibilityLibrary, 
    IComponentDefinition, 
    ILayoutDefinition,
    IDataSourceDefinition,
    ISuggestionProviderDefinition,
    IQueryModifierDefinition
} from '../models/ExtensibilityModels';
import { ExportButtonsWebComponent } from '../webComponents/ExportButtons/ExportButtonsWebComponent';
import { FilterControlsWebComponent } from '../webComponents/FilterControls/FilterControlsWebComponent';
import { EnhancedResultsLayout } from '../layouts/EnhancedResultsLayout/EnhancedResultsLayout';
import { EnhancedFiltersLayout } from '../layouts/EnhancedFiltersLayout/EnhancedFiltersLayout';

// Template content as strings
const enhancedResultsTemplate = `<div class="enhanced-results-layout">
    <div class="export-controls" style="text-align: right; margin-bottom: 15px;">
        <pnp-export-buttons 
            items="{{JSONstringify items}}" 
            selected-fields='["Title", "Path", "Author", "Modified"]'
            title="Search Results">
        </pnp-export-buttons>
    </div>
    
    <div class="results-container">
        {{#if items.length}}
            <div class="results-count" style="margin-bottom: 10px;">
                <strong>{{items.length}} results found</strong>
            </div>
            
            <div class="results-list">
                {{#each items}}
                    <div class="result-item" style="padding: 15px; border: 1px solid #e1e1e1; margin-bottom: 10px; border-radius: 4px;">
                        <h3 style="margin-top: 0;">
                            {{#if Path}}
                                <a href="{{Path}}" target="_blank">{{Title}}</a>
                            {{else}}
                                {{Title}}
                            {{/if}}
                        </h3>
                        
                        {{#if HitHighlightedSummary}}
                            <div class="summary" style="margin: 10px 0;">
                                {{{HitHighlightedSummary}}}
                            </div>
                        {{/if}}
                        
                        <div class="metadata" style="color: #666; font-size: 0.9em;">
                            {{#if Author}}
                                <span>By: {{Author}}</span> | 
                            {{/if}}
                            {{#if Modified}}
                                <span>Modified: {{getDate Modified "LL"}}</span>
                            {{/if}}
                        </div>
                    </div>
                {{/each}}
            </div>
        {{else}}
            <div class="no-results" style="text-align: center; padding: 40px;">
                <h3>No results found</h3>
                <p>Try adjusting your search terms or filters</p>
            </div>
        {{/if}}
    </div>
</div>`;

const enhancedFiltersTemplate = `<div class="enhanced-filters-layout">
    <div class="filters-header" style="margin-bottom: 15px;">
        <h3>Filters</h3>
    </div>
    
    <div class="filter-controls">
        <pnp-filter-controls 
            show-apply-button="true"
            clear-button-text="Clear All"
            apply-button-text="Apply Filters">
        </pnp-filter-controls>
    </div>
    
    <div class="filters-container" style="margin-top: 15px;">
        {{#each filters}}
            <div class="filter-group" style="margin-bottom: 20px;">
                <h4 style="margin-bottom: 10px;">{{displayName}}</h4>
                
                {{#if values}}
                    <div class="filter-values">
                        {{#each values}}
                            <div class="filter-item" style="margin-bottom: 5px;">
                                <label style="display: flex; align-items: center;">
                                    <input 
                                        type="checkbox" 
                                        name="{{../name}}" 
                                        value="{{value}}"
                                        {{#if selected}}checked{{/if}}
                                        style="margin-right: 8px;"
                                    />
                                    <span>{{name}} ({{count}})</span>
                                </label>
                            </div>
                        {{/each}}
                    </div>
                {{/if}}
            </div>
        {{/each}}
    </div>
    
    <div class="filter-controls-bottom" style="margin-top: 20px; border-top: 1px solid #e1e1e1; padding-top: 15px;">
        <pnp-filter-controls 
            show-apply-button="false"
            clear-button-text="Reset Filters">
        </pnp-filter-controls>
    </div>
</div>`;

export class SearchExportExtensibilityLibrary implements IExtensibilityLibrary {
    
    constructor() {
        // No service scope needed for simplified version
    }
    
    /**
     * Returns the library name
     */
    public name(): string {
        return 'Search Export & Filter Controls Extension';
    }
    
    /**
     * Register custom web components
     */
    public getCustomWebComponents(): IComponentDefinition<any>[] {
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
    }
    
    /**
     * Register custom layouts
     */
    public getCustomLayouts(): ILayoutDefinition[] {
        return [
            {
                name: 'Enhanced Results with Export',
                iconName: 'Export',
                key: 'enhanced-results-export',
                type: 'Results',
                serviceKey: null, // Simplified version
                templateContent: enhancedResultsTemplate
            },
            {
                name: 'Enhanced Filters with Controls',
                iconName: 'Filter',
                key: 'enhanced-filters-controls',
                type: 'Filters',
                serviceKey: null, // Simplified version
                templateContent: enhancedFiltersTemplate
            }
        ];
    }
    
    /**
     * Register custom Handlebars helpers
     */
    public registerHandlebarsCustomizations(handlebarsNamespace: any): void {
        // Register helper to stringify JSON for passing to web components
        handlebarsNamespace.registerHelper('JSONstringify', (object: any) => {
            return JSON.stringify(object);
        });
        
        // Register helper to format dates
        handlebarsNamespace.registerHelper('formatDate', (date: string, format: string) => {
            if (!date) return '';
            const d = new Date(date);
            
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
        handlebarsNamespace.registerHelper('truncate', (text: string, length: number) => {
            if (!text) return '';
            if (text.length <= length) return text;
            return text.substring(0, length) + '...';
        });
    }
    
    /**
     * No custom data sources in this extension
     */
    public getCustomDataSources(): IDataSourceDefinition[] {
        return [];
    }
    
    /**
     * No custom suggestion providers in this extension
     */
    public getCustomSuggestionProviders(): ISuggestionProviderDefinition[] {
        return [];
    }
    
    /**
     * No custom query modifiers in this extension
     */
    public getCustomQueryModifiers(): IQueryModifierDefinition[] {
        return [];
    }
}