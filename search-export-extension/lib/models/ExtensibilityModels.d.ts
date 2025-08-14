export interface IPropertyPaneField<T> {
    type: string;
    targetProperty: string;
    properties: T;
}
export interface IExtensibilityLibrary {
    name(): string;
    getCustomWebComponents(): IComponentDefinition<any>[];
    getCustomLayouts(): ILayoutDefinition[];
    getCustomDataSources?(): IDataSourceDefinition[];
    getCustomSuggestionProviders?(): ISuggestionProviderDefinition[];
    getCustomQueryModifiers?(): IQueryModifierDefinition[];
    registerHandlebarsCustomizations?(handlebarsNamespace: any): void;
}
export interface IComponentDefinition<T> {
    componentName: string;
    componentClass: new () => T;
}
export interface ILayoutDefinition {
    name: string;
    iconName: string;
    key: string;
    type?: string;
    serviceKey: any;
    templateContent: string;
}
export interface IDataSourceDefinition {
    name: string;
    iconName: string;
    key: string;
    serviceKey: any;
}
export interface ISuggestionProviderDefinition {
    name: string;
    key: string;
    serviceKey: any;
}
export interface IQueryModifierDefinition {
    name: string;
    key: string;
    serviceKey: any;
}
//# sourceMappingURL=ExtensibilityModels.d.ts.map