import { BaseComponent } from "../../utils/component-base";
import styles from "./styles.css";
import template from "./template.html";

export class CDCheckbox extends BaseComponent {
  static get observedAttributes(): string[] {
    return ["checked", "disabled", "label", "name", "value", "required"];
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

  get checked(): boolean {
    return this.hasAttribute("checked");
  }

  set checked(value: boolean) {
    if (value) {
      this.setAttribute("checked", "");
    } else {
      this.removeAttribute("checked");
    }
  }

  get disabled(): boolean {
    return this.hasAttribute("disabled");
  }

  get label(): string {
    return this.getAttribute("label") || "";
  }

  get name(): string {
    return this.getAttribute("name") || "";
  }

  get value(): string {
    return this.getAttribute("value") || "";
  }

  get required(): boolean {
    return this.hasAttribute("required");
  }

  constructor() {
    super();
    this._handleChange = this._handleChange.bind(this);
  }

  connectedCallback(): void {
    super.connectedCallback();

    this.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        this.toggleChecked();
      }
    });

    this.addEventListener("click", (e: MouseEvent) => {
      if (!this.disabled) {
        this.toggleChecked();
      }
    });
  }

  toggleChecked(): void {
    if (!this.disabled) {
      this.checked = !this.checked;
      this._dispatchChangeEvent();
    }
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

    const checkbox = this.shadow.querySelector(
      "input[type='checkbox']"
    ) as HTMLInputElement;
    const labelElement = this.shadow.querySelector(
      ".cd-checkbox-label"
    ) as HTMLLabelElement;

    if (checkbox) {
      checkbox.checked = this.checked;
      checkbox.disabled = this.disabled;
      checkbox.name = this.name;
      checkbox.value = this.value;
      checkbox.required = this.required;

      checkbox.addEventListener("change", this._handleChange);

      this.setAttribute("tabindex", this.disabled ? "-1" : "0");
    }

    if (labelElement) {
      if (this.label) {
        labelElement.textContent = this.label;
        labelElement.style.display = "inline";
      } else {
        const hasSlotContent = this.innerHTML.trim() !== "";
        if (!hasSlotContent) {
          labelElement.style.display = "none";
        }
      }
    }

    if (this.disabled) {
      this.shadow
        .querySelector(".cd-checkbox-container")
        ?.classList.add("disabled");
    }
  }

  private _handleChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.checked = checkbox.checked;
    this._dispatchChangeEvent();
  }

  private _dispatchChangeEvent(): void {
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: { checked: this.checked, value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }
}

customElements.define("cd-checkbox", CDCheckbox);
