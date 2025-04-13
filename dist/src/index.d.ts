import "./components/button-component/index";
import "./components/input-component/index";
import "./components/checkbox-component/index";
import "./components/card-component/index";
import "./components/table-component/index";
export { BaseComponent } from "./utils/component-base";
export { CDButton } from "./components/button-component/index";
export { CDInput } from "./components/input-component/index";
export { CDCheckbox } from "./components/checkbox-component/index";
export { CDCard } from "./components/card-component/index";
export { CDTable } from "./components/table-component/index";
import { CDButton } from "./components/button-component/index";
import { CDInput } from "./components/input-component/index";
import { CDCheckbox } from "./components/checkbox-component/index";
import { CDCard } from "./components/card-component/index";
import { CDTable } from "./components/table-component/index";
declare const _default: {
    CDButton: typeof CDButton;
    CDInput: typeof CDInput;
    CDCheckbox: typeof CDCheckbox;
    CDCard: typeof CDCard;
    CDTable: typeof CDTable;
    styles: {
        variables: string;
        injectVariables: typeof import("./styles").injectVariables;
    };
    register: () => void;
};
export default _default;
