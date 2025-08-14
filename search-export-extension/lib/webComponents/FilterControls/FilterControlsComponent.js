import * as React from 'react';
import { PrimaryButton, DefaultButton, Stack } from '@fluentui/react';
export var FilterControlsComponent = function (props) {
    var onClearAll = props.onClearAll, onApplyFilters = props.onApplyFilters, _a = props.showApplyButton, showApplyButton = _a === void 0 ? true : _a, _b = props.clearButtonText, clearButtonText = _b === void 0 ? 'Clear All' : _b, _c = props.applyButtonText, applyButtonText = _c === void 0 ? 'Apply Filters' : _c;
    var stackTokens = { childrenGap: 10 };
    var handleClearAll = function () {
        // Dispatch custom event for clearing filters
        var event = new CustomEvent('pnp-clear-all-filters', {
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
    var handleApplyFilters = function () {
        // Dispatch custom event for applying filters
        var event = new CustomEvent('pnp-apply-filters', {
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
    return (React.createElement(Stack, { horizontal: true, tokens: stackTokens, styles: { root: { marginTop: '10px', marginBottom: '10px' } } },
        React.createElement(DefaultButton, { text: clearButtonText, onClick: handleClearAll, iconProps: { iconName: 'ClearFilter' }, styles: {
                root: {
                    minWidth: '120px'
                }
            } }),
        showApplyButton && (React.createElement(PrimaryButton, { text: applyButtonText, onClick: handleApplyFilters, iconProps: { iconName: 'Filter' }, styles: {
                root: {
                    minWidth: '120px'
                }
            } }))));
};
//# sourceMappingURL=FilterControlsComponent.js.map