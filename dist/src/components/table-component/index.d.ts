import { BaseComponent } from "../../utils/component-base";
interface Column {
    key: string;
    header: string;
    width?: string;
    sortable?: boolean;
}
interface TableData {
    columns: Column[];
    rows: Record<string, any>[];
}
export declare class CDTable extends BaseComponent {
    private _data;
    private _sortColumn;
    private _sortDirection;
    static get observedAttributes(): string[];
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    get striped(): boolean;
    get bordered(): boolean;
    get compact(): boolean;
    get sortable(): boolean;
    /**
     * Set the table data
     */
    set data(newData: TableData);
    /**
     * Get the current table data
     */
    get data(): TableData;
    constructor();
    connectedCallback(): void;
    protected render(): void;
    private _renderTableContent;
    private _handleHeaderClick;
    private _handleRowClick;
}
export {};
