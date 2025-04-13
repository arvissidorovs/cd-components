import { BaseComponent } from "../../utils/component-base";
export declare class CDCard extends BaseComponent {
    static get observedAttributes(): string[];
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    get elevation(): string;
    get variant(): string;
    get clickable(): boolean;
    get disabled(): boolean;
    get hoverAnimation(): boolean;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected render(): void;
    private _handleClick;
}
