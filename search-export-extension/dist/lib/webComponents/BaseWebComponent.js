"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseWebComponent = void 0;
/**
 * Base class for web components
 * This is a simplified version - in production, this would come from @pnp/modern-search-extensibility
 */
var BaseWebComponent = /** @class */ (function (_super) {
    __extends(BaseWebComponent, _super);
    function BaseWebComponent() {
        var _this = _super.call(this) || this;
        _this._props = {};
        _this.attachShadow({ mode: 'open' });
        return _this;
    }
    /**
     * Called when the element is removed from the DOM
     */
    BaseWebComponent.prototype.disconnectedCallback = function () {
        // Clean up if needed
    };
    /**
     * Get property from attributes
     */
    BaseWebComponent.prototype.getProperty = function (name) {
        var attr = this.getAttribute(name);
        if (attr) {
            try {
                return JSON.parse(attr);
            }
            catch (_a) {
                return attr;
            }
        }
        return null;
    };
    /**
     * Set property
     */
    BaseWebComponent.prototype.setProperty = function (name, value) {
        this._props[name] = value;
        if (typeof value === 'object') {
            this.setAttribute(name, JSON.stringify(value));
        }
        else {
            this.setAttribute(name, String(value));
        }
    };
    return BaseWebComponent;
}(HTMLElement));
exports.BaseWebComponent = BaseWebComponent;
