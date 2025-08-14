/**
 * Base class for web components
 * This is a simplified version - in production, this would come from @pnp/modern-search-extensibility
 */
export declare abstract class BaseWebComponent extends HTMLElement {
    protected _props: any;
    constructor();
    /**
     * Called when the element is added to the DOM
     */
    abstract connectedCallback(): void | Promise<void>;
    /**
     * Called when the element is removed from the DOM
     */
    disconnectedCallback(): void;
    /**
     * Get property from attributes
     */
    protected getProperty(name: string): any;
    /**
     * Set property
     */
    protected setProperty(name: string, value: any): void;
}
//# sourceMappingURL=BaseWebComponent.d.ts.map