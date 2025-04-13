import variables from "./variables.css";

export const cssVariables = variables;
export * from "./variables.css";

export function injectVariables(target: Document | ShadowRoot): void {
  const styleElement = document.createElement("style");
  styleElement.textContent = variables;
  target.appendChild(styleElement);
}

export const styles = {
  variables,
  injectVariables,
};

export default styles;
