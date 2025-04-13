// Import all components
import "./components/button-component/index";
import "./components/input-component/index";
import "./components/checkbox-component/index";
import "./components/card-component/index";
import "./components/table-component/index";

// Re-export the utility base component
export { BaseComponent } from "./utils/component-base";

// Re-export the component classes
export { CDButton } from "./components/button-component/index";
export { CDInput } from "./components/input-component/index";
export { CDCheckbox } from "./components/checkbox-component/index";
export { CDCard } from "./components/card-component/index";
export { CDTable } from "./components/table-component/index";

// Import directly for use in the default export
import styles from "./styles";
import { CDButton } from "./components/button-component/index";
import { CDInput } from "./components/input-component/index";
import { CDCheckbox } from "./components/checkbox-component/index";
import { CDCard } from "./components/card-component/index";
import { CDTable } from "./components/table-component/index";

// Default export for convenient importing
export default {
  CDButton,
  CDInput,
  CDCheckbox,
  CDCard,
  CDTable,
  styles,

  register: () => {
    // Only register if not already registered
    if (!customElements.get("cd-button")) {
      customElements.define("cd-button", CDButton);
    }
    if (!customElements.get("cd-input")) {
      customElements.define("cd-input", CDInput);
    }
    if (!customElements.get("cd-checkbox")) {
      customElements.define("cd-checkbox", CDCheckbox);
    }
    if (!customElements.get("cd-card")) {
      customElements.define("cd-card", CDCard);
    }
    if (!customElements.get("cd-table")) {
      customElements.define("cd-table", CDTable);
    }
  },
};
