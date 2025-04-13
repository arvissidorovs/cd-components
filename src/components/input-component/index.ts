import { BaseComponent } from "../../utils/component-base";
import styles from "./styles.css";
import chevronSvg from "../../../assets/images/chevron_down.svg";

export class CDInput extends BaseComponent {
  static get observedAttributes(): string[] {
    return ["type", "size", "disabled", "placeholder", "options"];
  }

  private isDropdownOpen = false;
  private documentClickHandler: ((e: MouseEvent) => void) | null = null;

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
    return this.getAttribute("type") || "text";
  }

  get size(): string {
    return this.getAttribute("size") || "normal";
  }

  get disabled(): boolean {
    return this.hasAttribute("disabled");
  }

  get placeholder(): string {
    return this.getAttribute("placeholder") || "";
  }

  get options(): string[] {
    const options = this.getAttribute("options");
    return options ? options.split(",") : [];
  }

  disconnectedCallback(): void {
    if (this.documentClickHandler) {
      document.removeEventListener("click", this.documentClickHandler);
      this.documentClickHandler = null;
    }
  }

  protected render(): void {
    if (this.documentClickHandler) {
      document.removeEventListener("click", this.documentClickHandler);
      this.documentClickHandler = null;
    }

    this.shadow.innerHTML = "";

    const styleElement = document.createElement("style");
    styleElement.textContent = styles;
    this.shadow.appendChild(styleElement);

    //input, input-dropdown, dropdown, multi-select
    const type = this.getAttribute("type") || "input";
    const optionsAttr = this.getAttribute("options") || "[]";
    const placeholder = this.getAttribute("placeholder") || "";
    const size = this.getAttribute("size") || "normal";

    let options = [];
    try {
      options = JSON.parse(optionsAttr);
      if (!Array.isArray(options)) {
        options = [];
      }
    } catch (error) {
      options = optionsAttr
        .split(",")
        .map((opt) => opt.trim())
        .filter((opt) => opt);
    }

    switch (type) {
      case "input":
        this.renderInput(placeholder);
        break;
      case "input-dropdown":
        this.renderInputDropdown(placeholder, options);
        break;
      case "dropdown":
        this.renderDropdown(placeholder, options);
        break;
      /*case "multi-select":
        this.renderMultiSelect(placeholder);
        break;*/
    }
  }

  private renderInput(placeholder: string): void {
    const container = document.createElement("div");
    container.classList.add("input-container");

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = placeholder;
    input.classList.add("cd-input");

    container.appendChild(input);
    this.shadow.appendChild(container);

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        this.dispatchEvent(
          new CustomEvent("fieldChange", {
            detail: { value: input.value },
            bubbles: true,
            composed: true,
          })
        );
        e.preventDefault();
      }
    });
  }

  renderInputDropdown(placeholder: string, options: string[]): void {
    const container = document.createElement("div");
    container.classList.add("input-container");
    container.style.position = "relative";

    const inputWrapper = document.createElement("div");
    inputWrapper.classList.add("input-wrapper");

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = placeholder;
    input.classList.add("cd-input");

    const chevronElement = document.createElement("div");
    chevronElement.classList.add("chevron-icon");

    const img = document.createElement("img");
    img.src = chevronSvg;
    img.alt = "dropdown";
    img.classList.add("chevron-img");
    chevronElement.appendChild(img);

    const dropdownContainer = document.createElement("div");
    dropdownContainer.classList.add("cd-dropdown");

    let clickOriginatedInside = false;

    options.forEach((option) => {
      const optionEl = document.createElement("div");
      optionEl.textContent = option;

      optionEl.addEventListener("click", (e) => {
        e.stopPropagation();
        input.value = option;

        dropdownContainer.querySelectorAll("div").forEach((el) => {
          el.classList.remove("selected");
        });

        optionEl.classList.add("selected");

        dropdownContainer.classList.remove("active");
        this.isDropdownOpen = false;
        chevronElement.classList.remove("chevron-up");

        this.dispatchEvent(
          new CustomEvent("fieldChange", {
            detail: { value: option },
            bubbles: true,
            composed: true,
          })
        );
      });

      dropdownContainer.appendChild(optionEl);
    });

    const toggleDropdown = (open: boolean) => {
      if (open) {
        dropdownContainer.classList.add("active");
        this.isDropdownOpen = true;
        chevronElement.classList.add("chevron-up");
      } else {
        dropdownContainer.classList.remove("active");
        this.isDropdownOpen = false;
        chevronElement.classList.remove("chevron-up");
      }
    };

    const componentContainer = document.createElement("div");
    componentContainer.classList.add("component-container");

    componentContainer.addEventListener("mousedown", () => {
      clickOriginatedInside = true;

      setTimeout(() => {
        clickOriginatedInside = false;
      }, 0);
    });

    input.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleDropdown(!this.isDropdownOpen);
    });

    const handleDocumentClick = (e: MouseEvent) => {
      if (!clickOriginatedInside && !this.contains(e.target as Node)) {
        toggleDropdown(false);
      }

      clickOriginatedInside = false;
    };

    this.documentClickHandler = handleDocumentClick;
    document.addEventListener("click", handleDocumentClick);

    input.addEventListener("input", () => {
      const value = input.value.toLowerCase();
      const optionElements = dropdownContainer.querySelectorAll("div");

      let found = false;
      optionElements.forEach((optionEl) => {
        const optionText = optionEl.textContent?.toLowerCase() || "";
        if (optionText.includes(value)) {
          optionEl.style.display = "block";
          found = true;
        } else {
          optionEl.style.display = "none";
        }
      });

      if (found && !this.isDropdownOpen) {
        toggleDropdown(true);
      } else if (!found) {
        toggleDropdown(false);
      }
    });

    inputWrapper.appendChild(input);
    inputWrapper.appendChild(chevronElement);
    componentContainer.appendChild(inputWrapper);
    componentContainer.appendChild(dropdownContainer);
    container.appendChild(componentContainer);
    this.shadow.appendChild(container);
  }

  private renderDropdown(placeholder: string, options: string[]): void {
    const container = document.createElement("div");
    container.classList.add("input-container");
    container.style.position = "relative";

    const selectWrapper = document.createElement("div");
    selectWrapper.classList.add("select-wrapper");

    const select = document.createElement("select");
    select.classList.add("cd-select");

    select.style.opacity = "0";
    select.style.position = "absolute";
    select.style.pointerEvents = "none";

    const displayInput = document.createElement("input");
    displayInput.type = "text";
    displayInput.readOnly = true;
    displayInput.classList.add("cd-input");
    displayInput.placeholder = placeholder || "";

    if (placeholder) {
      const placeholderOption = document.createElement("option");
      placeholderOption.value = "";
      placeholderOption.textContent = placeholder;
      placeholderOption.disabled = true;
      placeholderOption.selected = true;
      select.appendChild(placeholderOption);
    }

    options.forEach((option) => {
      const optionEl = document.createElement("option");
      optionEl.value = option;
      optionEl.textContent = option;
      select.appendChild(optionEl);
    });

    const chevronElement = document.createElement("div");
    chevronElement.classList.add("chevron-icon");

    const img = document.createElement("img");
    img.src = chevronSvg;
    img.alt = "dropdown";
    img.classList.add("chevron-img");
    chevronElement.appendChild(img);

    const dropdownContainer = document.createElement("div");
    dropdownContainer.classList.add("cd-dropdown");

    options.forEach((option) => {
      const dropdownOptionEl = document.createElement("div");
      dropdownOptionEl.textContent = option;

      if (option === options[0] && !placeholder) {
        dropdownOptionEl.classList.add("selected");
        displayInput.value = option;
        select.value = option;
      }

      dropdownOptionEl.addEventListener("click", (e) => {
        e.stopPropagation();
        select.value = option;
        displayInput.value = option;

        dropdownContainer.querySelectorAll("div").forEach((el) => {
          el.classList.remove("selected");
        });
        dropdownOptionEl.classList.add("selected");

        dropdownContainer.classList.remove("active");
        this.isDropdownOpen = false;
        chevronElement.classList.remove("chevron-up");

        this.dispatchEvent(
          new CustomEvent("fieldChange", {
            detail: { value: option },
            bubbles: true,
            composed: true,
          })
        );
      });

      dropdownContainer.appendChild(dropdownOptionEl);
    });

    this.isDropdownOpen = false;
    let clickOriginatedInside = false;

    const toggleDropdown = (open: boolean) => {
      if (open) {
        dropdownContainer.classList.add("active");
        this.isDropdownOpen = true;
        chevronElement.classList.add("chevron-up");
      } else {
        dropdownContainer.classList.remove("active");
        this.isDropdownOpen = false;
        chevronElement.classList.remove("chevron-up");
      }
    };

    const componentContainer = document.createElement("div");
    componentContainer.classList.add("component-container");

    componentContainer.addEventListener("mousedown", () => {
      clickOriginatedInside = true;
      setTimeout(() => {
        clickOriginatedInside = false;
      }, 0);
    });

    displayInput.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleDropdown(!this.isDropdownOpen);
    });

    chevronElement.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleDropdown(!this.isDropdownOpen);
    });

    const handleDocumentClick = (e: MouseEvent) => {
      if (!clickOriginatedInside && !this.contains(e.target as Node)) {
        toggleDropdown(false);
      }
      clickOriginatedInside = false;
    };

    this.documentClickHandler = handleDocumentClick;
    document.addEventListener("click", handleDocumentClick);

    select.addEventListener("change", () => {
      displayInput.value =
        select.options[select.selectedIndex].textContent || "";

      this.dispatchEvent(
        new CustomEvent("fieldChange", {
          detail: { value: select.value },
          bubbles: true,
          composed: true,
        })
      );
    });

    const inputWrapper = document.createElement("div");
    inputWrapper.classList.add("input-wrapper");
    inputWrapper.appendChild(displayInput);
    inputWrapper.appendChild(chevronElement);
    inputWrapper.appendChild(select);

    componentContainer.appendChild(inputWrapper);
    componentContainer.appendChild(dropdownContainer);
    container.appendChild(componentContainer);
    this.shadow.appendChild(container);
  }
}

customElements.define("cd-input", CDInput);
