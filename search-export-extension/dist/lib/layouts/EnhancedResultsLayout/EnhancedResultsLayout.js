"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnhancedResultsLayout = void 0;
var EnhancedResultsLayout = /** @class */ (function () {
    function EnhancedResultsLayout() {
        // Simplified constructor
    }
    EnhancedResultsLayout.prototype.onInit = function () {
        // Initialize layout
        return Promise.resolve();
    };
    EnhancedResultsLayout.prototype.getPropertyPaneFieldsConfiguration = function (availableFields) {
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
    };
    EnhancedResultsLayout.prototype.onPropertyUpdate = function (propertyPath, oldValue, newValue) {
        // Handle property updates
        console.log("Property ".concat(propertyPath, " changed from ").concat(oldValue, " to ").concat(newValue));
    };
    return EnhancedResultsLayout;
}());
exports.EnhancedResultsLayout = EnhancedResultsLayout;
