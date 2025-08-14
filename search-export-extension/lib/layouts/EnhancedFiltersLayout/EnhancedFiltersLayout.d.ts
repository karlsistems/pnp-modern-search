import { IPropertyPaneField } from '../../models/ExtensibilityModels';
export interface IEnhancedFiltersLayoutProperties {
    showClearButton: boolean;
    showApplyButton: boolean;
}
export declare class EnhancedFiltersLayout {
    properties: IEnhancedFiltersLayoutProperties;
    constructor();
    onInit(): void | Promise<void>;
    getPropertyPaneFieldsConfiguration(availableFields: string[]): IPropertyPaneField<any>[];
    onPropertyUpdate(propertyPath: string, oldValue: any, newValue: any): void;
}
//# sourceMappingURL=EnhancedFiltersLayout.d.ts.map