import { BaseComponent } from "../../utils/component-base";
export declare class CDInput extends BaseComponent {
    static get observedAttributes(): string[];
    private isDropdownOpen;
    private documentClickHandler;
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    get type(): string;
    get size(): string;
    get disabled(): boolean;
    get placeholder(): string;
    get options(): string[];
    disconnectedCallback(): void;
    protected render(): void;
    private renderInput;
    renderInputDropdown(placeholder: string, options: string[]): void;
    private renderDropdown;
}
