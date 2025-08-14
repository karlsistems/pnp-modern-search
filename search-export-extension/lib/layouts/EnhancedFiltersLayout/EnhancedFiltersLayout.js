var EnhancedFiltersLayout = /** @class */ (function () {
    function EnhancedFiltersLayout() {
        // Simplified constructor
    }
    EnhancedFiltersLayout.prototype.onInit = function () {
        // Initialize layout
        return Promise.resolve();
    };
    EnhancedFiltersLayout.prototype.getPropertyPaneFieldsConfiguration = function (availableFields) {
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
    };
    EnhancedFiltersLayout.prototype.onPropertyUpdate = function (propertyPath, oldValue, newValue) {
        console.log("Property ".concat(propertyPath, " changed from ").concat(oldValue, " to ").concat(newValue));
    };
    return EnhancedFiltersLayout;
}());
export { EnhancedFiltersLayout };
//# sourceMappingURL=EnhancedFiltersLayout.js.map