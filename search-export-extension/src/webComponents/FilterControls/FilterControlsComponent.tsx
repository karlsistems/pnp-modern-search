import * as React from 'react';
import { PrimaryButton, DefaultButton, Stack, IStackTokens } from '@fluentui/react';

export interface IFilterControlsProps {
    onClearAll?: () => void;
    onApplyFilters?: () => void;
    showApplyButton?: boolean;
    clearButtonText?: string;
    applyButtonText?: string;
}

export const FilterControlsComponent: React.FC<IFilterControlsProps> = (props) => {
    const {
        onClearAll,
        onApplyFilters,
        showApplyButton = true,
        clearButtonText = 'Clear All',
        applyButtonText = 'Apply Filters'
    } = props;

    const stackTokens: IStackTokens = { childrenGap: 10 };

    const handleClearAll = () => {
        // Dispatch custom event for clearing filters
        const event = new CustomEvent('pnp-clear-all-filters', { 
            detail: { timestamp: Date.now() },
            bubbles: true,
            composed: true
        });
        document.dispatchEvent(event);
        
        // Call custom handler if provided
        if (onClearAll) {
            onClearAll();
        }
    };

    const handleApplyFilters = () => {
        // Dispatch custom event for applying filters
        const event = new CustomEvent('pnp-apply-filters', {
            detail: { timestamp: Date.now() },
            bubbles: true,
            composed: true
        });
        document.dispatchEvent(event);
        
        // Call custom handler if provided
        if (onApplyFilters) {
            onApplyFilters();
        }
    };

    return (
        <Stack horizontal tokens={stackTokens} styles={{ root: { marginTop: '10px', marginBottom: '10px' } }}>
            <DefaultButton
                text={clearButtonText}
                onClick={handleClearAll}
                iconProps={{ iconName: 'ClearFilter' }}
                styles={{
                    root: {
                        minWidth: '120px'
                    }
                }}
            />
            {showApplyButton && (
                <PrimaryButton
                    text={applyButtonText}
                    onClick={handleApplyFilters}
                    iconProps={{ iconName: 'Filter' }}
                    styles={{
                        root: {
                            minWidth: '120px'
                        }
                    }}
                />
            )}
        </Stack>
    );
};