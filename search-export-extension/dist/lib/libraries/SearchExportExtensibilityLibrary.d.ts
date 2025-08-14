import { IExtensibilityLibrary, IComponentDefinition, ILayoutDefinition, IDataSourceDefinition, ISuggestionProviderDefinition, IQueryModifierDefinition } from '../models/ExtensibilityModels';
export declare class SearchExportExtensibilityLibrary implements IExtensibilityLibrary {
    constructor();
    /**
     * Returns the library name
     */
    name(): string;
    /**
     * Register custom web components
     */
    getCustomWebComponents(): IComponentDefinition<any>[];
    /**
     * Register custom layouts
     */
    getCustomLayouts(): ILayoutDefinition[];
    /**
     * Register custom Handlebars helpers
     */
    registerHandlebarsCustomizations(handlebarsNamespace: any): void;
    /**
     * No custom data sources in this extension
     */
    getCustomDataSources(): IDataSourceDefinition[];
    /**
     * No custom suggestion providers in this extension
     */
    getCustomSuggestionProviders(): ISuggestionProviderDefinition[];
    /**
     * No custom query modifiers in this extension
     */
    getCustomQueryModifiers(): IQueryModifierDefinition[];
}
