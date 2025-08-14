"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterControlsComponent = void 0;
var React = __importStar(require("react"));
var react_1 = require("@fluentui/react");
var FilterControlsComponent = function (props) {
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
    return (React.createElement(react_1.Stack, { horizontal: true, tokens: stackTokens, styles: { root: { marginTop: '10px', marginBottom: '10px' } } },
        React.createElement(react_1.DefaultButton, { text: clearButtonText, onClick: handleClearAll, iconProps: { iconName: 'ClearFilter' }, styles: {
                root: {
                    minWidth: '120px'
                }
            } }),
        showApplyButton && (React.createElement(react_1.PrimaryButton, { text: applyButtonText, onClick: handleApplyFilters, iconProps: { iconName: 'Filter' }, styles: {
                root: {
                    minWidth: '120px'
                }
            } }))));
};
exports.FilterControlsComponent = FilterControlsComponent;
