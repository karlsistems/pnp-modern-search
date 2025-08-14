import { IPropertyPaneField } from '../../models/ExtensibilityModels';

export interface IEnhancedResultsLayoutProperties {
    showExportButtons: boolean;
    exportFields: string;
    layoutTemplate: string;
}

export class EnhancedResultsLayout {
    
    public properties: IEnhancedResultsLayoutProperties;
    
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
                targetProperty: 'enhancedLayout.showExportButtons',
                properties: {
                    label: 'Show Export Buttons',
                    checked: true
                }
            },
            {
                type: 'PropertyPaneTextField',
                targetProperty: 'enhancedLayout.exportFields',
                properties: {
                    label: 'Fields to Export (comma separated)',
                    description: 'Leave empty to export all fields',
                    multiline: true
                }
            },
            {
                type: 'PropertyPaneTextField',
                targetProperty: 'enhancedLayout.layoutTemplate',
                properties: {
                    label: 'Custom Template',
                    description: 'Handlebars template for results display',
                    multiline: true,
                    rows: 10
                }
            }
        ];
    }
    
    public onPropertyUpdate(propertyPath: string, oldValue: any, newValue: any): void {
        // Handle property updates
        console.log(`Property ${propertyPath} changed from ${oldValue} to ${newValue}`);
    }
}