/**
 * Base class for web components
 * This is a simplified version - in production, this would come from @pnp/modern-search-extensibility
 */
export abstract class BaseWebComponent extends HTMLElement {
    
    protected _props: any = {};
    
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    
    /**
     * Called when the element is added to the DOM
     */
    public abstract connectedCallback(): void | Promise<void>;
    
    /**
     * Called when the element is removed from the DOM
     */
    public disconnectedCallback(): void {
        // Clean up if needed
    }
    
    /**
     * Get property from attributes
     */
    protected getProperty(name: string): any {
        const attr = this.getAttribute(name);
        if (attr) {
            try {
                return JSON.parse(attr);
            } catch {
                return attr;
            }
        }
        return null;
    }
    
    /**
     * Set property
     */
    protected setProperty(name: string, value: any): void {
        this._props[name] = value;
        if (typeof value === 'object') {
            this.setAttribute(name, JSON.stringify(value));
        } else {
            this.setAttribute(name, String(value));
        }
    }
}