import { BaseComponent } from "../../utils/component-base";
export declare class CDCheckbox extends BaseComponent {
    static get observedAttributes(): string[];
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    get checked(): boolean;
    set checked(value: boolean);
    get disabled(): boolean;
    get label(): string;
    get name(): string;
    get value(): string;
    get required(): boolean;
    constructor();
    connectedCallback(): void;
    toggleChecked(): void;
    protected render(): void;
    private _handleChange;
    private _dispatchChangeEvent;
}
