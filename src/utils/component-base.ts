import { cssVariables } from "../styles";

export abstract class BaseComponent extends HTMLElement {
  protected shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });

    const variablesStyle = document.createElement("style");
    variablesStyle.id = "cd-variables";
    variablesStyle.textContent = cssVariables;
    this.shadow.appendChild(variablesStyle);
  }

  connectedCallback(): void {
    this.render();
  }

  disconnectedCallback(): void {}

  protected abstract render(): void;
}
