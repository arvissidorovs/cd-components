export declare abstract class BaseComponent extends HTMLElement {
    protected shadow: ShadowRoot;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected abstract render(): void;
}
