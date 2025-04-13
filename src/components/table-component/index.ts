// src/components/table-component/index.ts
import { BaseComponent } from "../../utils/component-base";
import styles from "./styles.css";
import template from "./template.html";

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

export class CDTable extends BaseComponent {
  private _data: TableData = { columns: [], rows: [] };
  private _sortColumn: string | null = null;
  private _sortDirection: "asc" | "desc" = "asc";

  static get observedAttributes(): string[] {
    return ["striped", "bordered", "compact", "sortable"];
  }

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ): void {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  get striped(): boolean {
    return this.hasAttribute("striped");
  }

  get bordered(): boolean {
    return this.hasAttribute("bordered");
  }

  get compact(): boolean {
    return this.hasAttribute("compact");
  }

  get sortable(): boolean {
    return this.hasAttribute("sortable");
  }

  /**
   * Set the table data
   */
  set data(newData: TableData) {
    console.log("Setting table data:", newData);
    this._data = { ...newData };
    // Ensure data is properly set before rendering
    setTimeout(() => {
      this.render();
    }, 0);
  }

  /**
   * Get the current table data
   */
  get data(): TableData {
    return this._data;
  }

  constructor() {
    super();
    this._handleHeaderClick = this._handleHeaderClick.bind(this);
  }

  connectedCallback(): void {
    super.connectedCallback();
  }

  protected render(): void {
    const variablesStyle = this.shadow.getElementById("cd-variables");
    this.shadow.innerHTML = "";

    if (variablesStyle) {
      this.shadow.appendChild(variablesStyle);
    }

    const styleElement = document.createElement("style");
    styleElement.textContent = styles;
    this.shadow.appendChild(styleElement);

    const templateEl = document.createElement("template");
    templateEl.innerHTML = template;
    this.shadow.appendChild(templateEl.content.cloneNode(true));

    const tableEl = this.shadow.querySelector(".cd-table") as HTMLElement;
    if (tableEl) {
      if (this.striped) tableEl.classList.add("striped");
      if (this.bordered) tableEl.classList.add("bordered");
      if (this.compact) tableEl.classList.add("compact");
      if (this.sortable) tableEl.classList.add("sortable");
    }

    this._renderTableContent();
  }

  private _renderTableContent(): void {
    const tableEl = this.shadow.querySelector(".cd-table") as HTMLTableElement;
    if (!tableEl) {
      return;
    }

    if (!this._data.columns || !this._data.rows) {
      const emptyState = document.createElement("div");
      emptyState.classList.add("empty-state");
      emptyState.textContent = "No data available";

      const tableContainer = this.shadow.querySelector(
        ".cd-table-container"
      ) as HTMLElement;
      if (tableContainer) {
        tableContainer.appendChild(emptyState);
      }
      return;
    }

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    this._data.columns.forEach((column) => {
      const th = document.createElement("th");
      th.textContent = column.header;
      th.dataset.key = column.key;

      if (column.width) {
        th.style.width = column.width;
      }

      if (this.sortable && column.sortable !== false) {
        th.classList.add("sortable");

        const sortIndicator = document.createElement("span");
        sortIndicator.classList.add("sort-indicator");
        sortIndicator.innerHTML = `
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path d="M7 10l5 5 5-5z" fill="currentColor"></path>
          </svg>
        `;
        th.appendChild(sortIndicator);

        if (this._sortColumn === column.key) {
          th.classList.add("active");
          th.dataset.direction = this._sortDirection;
        }

        th.addEventListener("click", () => this._handleHeaderClick(column.key));
      }

      headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    tableEl.appendChild(thead);

    const tbody = document.createElement("tbody");

    let rowsToRender = [...this._data.rows];
    if (this._sortColumn) {
      rowsToRender.sort((a, b) => {
        const valueA = a[this._sortColumn as string];
        const valueB = b[this._sortColumn as string];

        if (valueA === valueB) return 0;

        const result =
          typeof valueA === "string"
            ? valueA.localeCompare(valueB)
            : valueA - valueB;

        return this._sortDirection === "asc" ? result : -result;
      });
    }

    rowsToRender.forEach((row, rowIndex) => {
      const tr = document.createElement("tr");

      this._data.columns.forEach((column) => {
        const td = document.createElement("td");
        td.textContent =
          row[column.key] !== undefined ? String(row[column.key]) : "";
        tr.appendChild(td);
      });

      tr.addEventListener("click", () => {
        this._handleRowClick(row, rowIndex);
      });

      tbody.appendChild(tr);
    });

    tableEl.appendChild(tbody);

    if (rowsToRender.length === 0) {
      const emptyState = document.createElement("div");
      emptyState.classList.add("empty-state");
      emptyState.textContent = "No data available";

      const tableContainer = this.shadow.querySelector(
        ".cd-table-container"
      ) as HTMLElement;
      if (tableContainer) {
        tableContainer.appendChild(emptyState);
      }
    }
  }

  private _handleHeaderClick(key: string): void {
    if (!this.sortable) return;

    if (this._sortColumn === key) {
      this._sortDirection = this._sortDirection === "asc" ? "desc" : "asc";
    } else {
      this._sortColumn = key;
      this._sortDirection = "asc";
    }

    this.dispatchEvent(
      new CustomEvent("sort", {
        detail: {
          column: key,
          direction: this._sortDirection,
        },
        bubbles: true,
        composed: true,
      })
    );

    this.render();
  }
  private _handleRowClick(row: Record<string, any>, index: number): void {
    this.dispatchEvent(
      new CustomEvent("rowSelect", {
        detail: {
          row,
          index,
        },
        bubbles: true,
        composed: true,
      })
    );
  }
}

customElements.define("cd-table", CDTable);
