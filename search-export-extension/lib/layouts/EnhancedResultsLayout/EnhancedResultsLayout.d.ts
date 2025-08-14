import { IPropertyPaneField } from '../../models/ExtensibilityModels';
export interface IEnhancedResultsLayoutProperties {
    showExportButtons: boolean;
    exportFields: string;
    layoutTemplate: string;
}
export declare class EnhancedResultsLayout {
    properties: IEnhancedResultsLayoutProperties;
    constructor();
    onInit(): void | Promise<void>;
    getPropertyPaneFieldsConfiguration(availableFields: string[]): IPropertyPaneField<any>[];
    onPropertyUpdate(propertyPath: string, oldValue: any, newValue: any): void;
}
//# sourceMappingURL=EnhancedResultsLayout.d.ts.map