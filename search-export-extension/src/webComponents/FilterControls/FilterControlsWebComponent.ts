import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BaseWebComponent } from '../BaseWebComponent';
import { FilterControlsComponent, IFilterControlsProps } from './FilterControlsComponent';

export class FilterControlsWebComponent extends BaseWebComponent {
    
    public constructor() {
        super();
    }
    
    public async connectedCallback() {
        
        // Get properties from attributes
        const showApplyButton = this.getAttribute('show-apply-button') !== 'false';
        const clearButtonText = this.getAttribute('clear-button-text') || 'Clear All';
        const applyButtonText = this.getAttribute('apply-button-text') || 'Apply Filters';
        
        const props: IFilterControlsProps = {
            showApplyButton,
            clearButtonText,
            applyButtonText,
            onClearAll: () => {
                console.log('Clear all filters clicked');
            },
            onApplyFilters: () => {
                console.log('Apply filters clicked');
            }
        };
        
        ReactDOM.render(React.createElement(FilterControlsComponent, props), this);
    }
}