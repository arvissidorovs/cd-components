import { BaseComponent } from "../../utils/component-base";
import styles from "./styles.css";
import template from "./template.html";

export class CDCard extends BaseComponent {
  static get observedAttributes(): string[] {
    return ["elevation", "variant", "clickable", "disabled", "hover-animation"];
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

  get elevation(): string {
    return this.getAttribute("elevation") || "1";
  }

  get variant(): string {
    return this.getAttribute("variant") || "default";
  }

  get clickable(): boolean {
    return this.hasAttribute("clickable");
  }

  get disabled(): boolean {
    return this.hasAttribute("disabled");
  }

  get hoverAnimation(): boolean {
    return this.hasAttribute("hover-animation");
  }

  constructor() {
    super();
    this._handleClick = this._handleClick.bind(this);
  }

  connectedCallback(): void {
    super.connectedCallback();

    if (this.clickable) {
      this.addEventListener("click", this._handleClick);
      this.addEventListener("keydown", (e: KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this._handleClick(e);
        }
      });
    }
  }

  disconnectedCallback(): void {
    if (this.clickable) {
      this.removeEventListener("click", this._handleClick);
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

    const cardEl = this.shadow.querySelector(".cd-card") as HTMLElement;
    if (cardEl) {
      cardEl.classList.add(`elevation-${this.elevation}`);
      cardEl.classList.add(`variant-${this.variant}`);

      if (this.clickable) {
        cardEl.classList.add("clickable");
        this.setAttribute("tabindex", this.disabled ? "-1" : "0");
      }

      if (this.hoverAnimation) {
        cardEl.classList.add("hover-animation");
      }

      if (this.disabled) {
        cardEl.classList.add("disabled");
      }
    }
  }

  private _handleClick(e: Event): void {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    this.dispatchEvent(
      new CustomEvent("cardClick", {
        bubbles: true,
        composed: true,
      })
    );
  }
}

customElements.define("cd-card", CDCard);
