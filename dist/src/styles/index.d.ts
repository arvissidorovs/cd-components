export declare const cssVariables: string;
export * from "./variables.css";
export declare function injectVariables(target: Document | ShadowRoot): void;
export declare const styles: {
    variables: string;
    injectVariables: typeof injectVariables;
};
export default styles;
