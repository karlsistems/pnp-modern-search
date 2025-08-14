import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BaseWebComponent } from '../BaseWebComponent';
import { ExportButtonsComponent, IExportButtonsProps } from './ExportButtonsComponent';

export class ExportButtonsWebComponent extends BaseWebComponent {
    
    public constructor() {
        super();
    }
    
    public async connectedCallback() {
        
        // Get properties from attributes
        const items = this.getAttributeValue('items');
        const selectedFields = this.getAttributeValue('selected-fields');
        const title = this.getAttributeValue('title');
        
        let parsedItems = [];
        let parsedFields = [];
        
        try {
            if (items) {
                parsedItems = typeof items === 'string' ? JSON.parse(items) : items;
            }
            if (selectedFields) {
                parsedFields = typeof selectedFields === 'string' ? JSON.parse(selectedFields) : selectedFields;
            }
        } catch (error) {
            console.error('Error parsing export button properties:', error);
        }
        
        const props: IExportButtonsProps = {
            items: parsedItems,
            selectedFields: parsedFields,
            title: title || 'Search Results'
        };
        
        ReactDOM.render(React.createElement(ExportButtonsComponent, props), this);
    }
    
    private getAttributeValue(attributeName: string): any {
        const attribute = this.getAttribute(attributeName);
        if (attribute) {
            try {
                return JSON.parse(attribute);
            } catch {
                return attribute;
            }
        }
        return null;
    }
}