import { IPropertyPaneField } from '../../models/ExtensibilityModels';

export interface IEnhancedFiltersLayoutProperties {
    showClearButton: boolean;
    showApplyButton: boolean;
}

export class EnhancedFiltersLayout {
    
    public properties: IEnhancedFiltersLayoutProperties;
    
    constructor() {
        // Simplified constructor
    }
    
    public onInit(): void | Promise<void> {
        // Initialize layout
        return Promise.resolve();
    }
    
    public getPropertyPaneFieldsConfiguration(availableFields: string[]): IPropertyPaneField<any>[] {
        return [
            {
                type: 'PropertyPaneToggle',
                targetProperty: 'enhancedFilters.showClearButton',
                properties: {
                    label: 'Show Clear All Button',
                    checked: true
                }
            },
            {
                type: 'PropertyPaneToggle',
                targetProperty: 'enhancedFilters.showApplyButton',
                properties: {
                    label: 'Show Apply Filters Button',
                    checked: true
                }
            }
        ];
    }
    
    public onPropertyUpdate(propertyPath: string, oldValue: any, newValue: any): void {
        console.log(`Property ${propertyPath} changed from ${oldValue} to ${newValue}`);
    }
}