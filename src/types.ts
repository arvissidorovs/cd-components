export interface ComponentAttributes {
  title?: string;
  theme?: "light" | "dark";
}

declare global {
  interface HTMLElementTagNameMap {
    "cd-component": HTMLElement;
  }
}
