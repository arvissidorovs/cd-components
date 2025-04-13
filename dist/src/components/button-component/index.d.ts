import { BaseComponent } from "../../utils/component-base";
export declare class CDButton extends BaseComponent {
    static get observedAttributes(): string[];
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    get type(): string;
    get size(): string;
    get disabled(): boolean;
    protected render(): void;
}
