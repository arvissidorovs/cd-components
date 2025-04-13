import { BaseComponent } from "../../utils/component-base";
import styles from "./styles.css";
import template from "./template.html";

export class CDButton extends BaseComponent {
  static get observedAttributes(): string[] {
    return ["type", "size", "disabled"];
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

  get type(): string {
    return this.getAttribute("type") || "primary";
  }

  get size(): string {
    return this.getAttribute("size") || "medium";
  }

  get disabled(): boolean {
    return this.hasAttribute("disabled");
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

    const buttonEl = this.shadow.querySelector(".cd-button") as HTMLElement;
    if (buttonEl) {
      buttonEl.classList.add(`type-${this.type}`);
      buttonEl.classList.add(`size-${this.size}`);
      if (this.disabled) {
        buttonEl.classList.add("disabled");
      }
    }
  }
}

customElements.define("cd-button", CDButton);
