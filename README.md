# CD-Components

A TypeScript-based custom web component library for building reusable UI components for LiepajasCentraDraudze, with consistent styling and behavior.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Importing the Library](#importing-the-library)
  - [Using Components in HTML](#using-components-in-html)
- [Available Components](#available-components)
  - [Button Component](#button-component)
  - [Input Component](#input-component)
  - [Checkbox Component](#checkbox-component)
  - [Card Component](#card-component)
  - [Table Component](#table-component)
- [Design System](#design-system)
  - [CSS Variables](#css-variables)
  - [Customizing Styles](#customizing-styles)
- [Development](#development)
  - [Setup](#setup)
  - [Running the Development Server](#running-the-development-server)
  - [Building for Production](#building-for-production)
- [Troubleshooting](#troubleshooting)

## Installation

Install the library via npm:

```bash
npm install @kvadratnieks/cd-components
```

## Usage

### Importing the Library

You can import the library into your project using ES Modules:

```javascript
// Import all components
import "@kvadratnieks/cd-components";

// Or import specific components
import { CDButton, CDInput } from "@kvadratnieks/cd-components";
```

If you want to register all components at once:

```javascript
import CDComponents from "@kvadratnieks/cd-components";

// Register all components at once
CDComponents.register();
```

### Using Components in HTML

Once imported, you can use the components directly in your HTML:

```html
<cd-button type="primary">Click Me</cd-button>
<cd-input type="input" placeholder="Enter your name"></cd-input>
<cd-checkbox label="Accept terms"></cd-checkbox>
```

## Available Components

### Button Component

A button component with different styles, sizes, and states.

#### Attributes

| Attribute  | Type                                             | Default     | Description                   |
| ---------- | ------------------------------------------------ | ----------- | ----------------------------- |
| `type`     | `"primary"` \| `"secondary"` \| `"danger"`       | `"primary"` | Button style type             |
| `size`     | `"small"` \| `"medium"` \| `"large"` \| `"auto"` | `"medium"`  | Size of the button            |
| `disabled` | `boolean`                                        | `false`     | Disables the button when true |

#### Examples

```html
<!-- Primary button -->
<cd-button type="primary">Primary Button</cd-button>

<!-- Secondary button -->
<cd-button type="secondary">Secondary Button</cd-button>

<!-- Danger button -->
<cd-button type="danger">Danger Button</cd-button>

<!-- Disabled button -->
<cd-button type="primary" disabled>Disabled Button</cd-button>

<!-- Button with auto width -->
<cd-button type="primary" size="auto">Full Width Button</cd-button>
```

### Input Component

An input component with support for text input and dropdown selections.

#### Attributes

| Attribute     | Type                                            | Default   | Description                        |
| ------------- | ----------------------------------------------- | --------- | ---------------------------------- |
| `type`        | `"input"` \| `"dropdown"` \| `"input-dropdown"` | `"input"` | Input type                         |
| `placeholder` | `string`                                        | `""`      | Placeholder text                   |
| `options`     | `string` (JSON array)                           | `"[]"`    | Options for dropdown (JSON string) |
| `disabled`    | `boolean`                                       | `false`   | Disables the input when true       |

#### Events

- `fieldChange`: Fired when the input value changes with the new value in the `detail` property.

#### Examples

```html
<!-- Text input -->
<cd-input type="input" placeholder="Enter your name"></cd-input>

<!-- Dropdown -->
<cd-input
  type="dropdown"
  placeholder="Select an option"
  options='["Option 1", "Option 2", "Option 3"]'
></cd-input>

<!-- Input with dropdown suggestions -->
<cd-input
  type="input-dropdown"
  placeholder="Type or select"
  options='["Apple", "Banana", "Cherry"]'
></cd-input>

<!-- Event handling -->
<script>
  document.querySelector("cd-input").addEventListener("fieldChange", (e) => {
    console.log("Value changed:", e.detail.value);
  });
</script>
```

### Checkbox Component

A customizable checkbox component with label support.

#### Attributes

| Attribute  | Type      | Default | Description                          |
| ---------- | --------- | ------- | ------------------------------------ |
| `checked`  | `boolean` | `false` | Whether the checkbox is checked      |
| `disabled` | `boolean` | `false` | Disables the checkbox when true      |
| `label`    | `string`  | `""`    | Label text (alternative to slots)    |
| `name`     | `string`  | `""`    | Name for form submission             |
| `value`    | `string`  | `""`    | Value for form submission            |
| `required` | `boolean` | `false` | Makes the checkbox required in forms |

#### Events

- `change`: Fired when the checkbox state changes with `checked` and `value` in the `detail` property.

#### Examples

```html
<!-- Basic checkbox -->
<cd-checkbox></cd-checkbox>

<!-- With label attribute -->
<cd-checkbox label="Accept terms and conditions"></cd-checkbox>

<!-- With slot content for label -->
<cd-checkbox>I agree to the privacy policy</cd-checkbox>

<!-- Initially checked -->
<cd-checkbox checked>This is checked by default</cd-checkbox>

<!-- Disabled state -->
<cd-checkbox disabled>This checkbox is disabled</cd-checkbox>

<!-- For form submission -->
<cd-checkbox name="consent" value="marketing" required>
  Receive marketing emails
</cd-checkbox>

<!-- Event handling -->
<script>
  document.querySelector("cd-checkbox").addEventListener("change", (e) => {
    console.log("Checkbox changed:", e.detail.checked);
  });
</script>
```

### Card Component

A versatile card component for displaying content in a contained box with various styling options.

#### Attributes

| Attribute         | Type                                        | Default     | Description                                                |
| ----------------- | ------------------------------------------- | ----------- | ---------------------------------------------------------- |
| `elevation`       | `"0"` \| `"1"` \| `"2"` \| `"3"`            | `"1"`       | Shadow elevation level                                     |
| `variant`         | `"default"` \| `"primary"` \| `"secondary"` | `"default"` | Color variant                                              |
| `clickable`       | `boolean`                                   | `false`     | Makes card clickable with event handling                   |
| `hover-animation` | `boolean`                                   | `false`     | Enables hover animation effects (lift and shadow increase) |
| `disabled`        | `boolean`                                   | `false`     | Disables card interactions when true                       |

#### Slots

- `default`: Main content of the card
- `header`: Content to display in the card header
- `footer`: Content to display in the card footer

#### Events

- `cardClick`: Fired when a clickable card is clicked.

#### Examples

```html
<!-- Basic card -->
<cd-card>
  <p>This is a basic card with simple content.</p>
</cd-card>

<!-- Card with header and footer -->
<cd-card>
  <h3 slot="header">Card Title</h3>
  <p>This card has a header and footer section.</p>
  <div slot="footer">
    <cd-button type="primary">Action</cd-button>
  </div>
</cd-card>

<!-- Card with higher elevation -->
<cd-card elevation="2">
  <p>This card has more shadow.</p>
</cd-card>

<!-- Colored card -->
<cd-card variant="primary">
  <p>This card has a primary color background.</p>
</cd-card>

<!-- Clickable card with hover animation -->
<cd-card clickable hover-animation>
  <p>This card has hover effects and is clickable.</p>
</cd-card>

<!-- Clickable card without hover animation -->
<cd-card clickable>
  <p>This card is clickable but has no hover effects.</p>
</cd-card>

<!-- Card with only hover animation (non-clickable) -->
<cd-card hover-animation>
  <p>This card has hover effects but is not clickable.</p>
</cd-card>

<!-- Event handling -->
<script>
  document
    .querySelector("cd-card[clickable]")
    .addEventListener("cardClick", (e) => {
      console.log("Card was clicked");
    });
</script>
```

### Table Component

A table component with support for sorting, row selection, and various display styles.

#### Attributes

| Attribute  | Type      | Default | Description                        |
| ---------- | --------- | ------- | ---------------------------------- |
| `striped`  | `boolean` | `false` | Applies striped rows               |
| `bordered` | `boolean` | `false` | Adds borders to cells              |
| `compact`  | `boolean` | `false` | Reduces padding for denser display |
| `sortable` | `boolean` | `false` | Enables column sorting             |

#### Properties

| Property | Type        | Description                             |
| -------- | ----------- | --------------------------------------- |
| `data`   | `TableData` | Object containing columns and rows data |

The `TableData` interface is defined as:

```typescript
interface Column {
  key: string;
  header: string;
  width?: string;
  sortable?: boolean;
}

interface TableData {
  columns: Column[];
  rows: Record<string, any>[];
}
```

#### Events

- `sort`: Fired when a sortable column is clicked, with column key and direction in the `detail` property.
- `rowSelect`: Fired when a row is clicked, with the row data and index in the `detail` property.

#### Examples

```html
<!-- Basic table -->
<cd-table id="basic-table"></cd-table>

<!-- Styled table -->
<cd-table id="styled-table" striped bordered sortable></cd-table>

<!-- Compact table -->
<cd-table id="compact-table" compact></cd-table>

<script>
  // Setting data for the table
  const basicTable = document.getElementById("basic-table");

  // Set data using Object.assign
  Object.assign(basicTable, {
    data: {
      columns: [
        { key: "id", header: "ID" },
        { key: "name", header: "Name" },
        { key: "email", header: "Email" },
      ],
      rows: [
        { id: 1, name: "John Doe", email: "john@example.com" },
        { id: 2, name: "Jane Smith", email: "jane@example.com" },
        { id: 3, name: "Bob Johnson", email: "bob@example.com" },
      ],
    },
  });

  // Event handling
  const styledTable = document.getElementById("styled-table");
  styledTable.addEventListener("sort", (e) => {
    console.log("Sort event:", e.detail.column, e.detail.direction);
  });

  styledTable.addEventListener("rowSelect", (e) => {
    console.log("Selected row:", e.detail.row);
  });
</script>
```

## Design System

### CSS Variables

The component library uses CSS custom properties (variables) for consistent styling. The main variables include:

```css
:root {
  /* Colors */
  --cd-primary: #002c6c;
  --cd-primary-hover: #204f96;
  --cd-secondary-hover: #f2f6fa;
  --cd-danger: #ff0808;
  --cd-white: #ffffff;
  --cd-border-color: #d9d9d9;

  /* Text colors */
  --cd-text-light: #ffffff;
  --cd-text-dark: #002c6c;
  --cd-text-danger: #ff0808;

  /* Sizes */
  --cd-border-radius: 0.25rem;
  --cd-button-height: 40px;
  --cd-button-width: 136px;

  /* Spacing */
  --cd-spacing-xs: 6px;
  --cd-spacing-sm: 12px;
  --cd-spacing-md: 20px;
  --cd-spacing-lg: 28px;

  /* Font sizes */
  --cd-font-size-sm: 12px;
  --cd-font-size-md: 14px;
  --cd-font-size-lg: 16px;

  /* Effects */
  --cd-transition: background-color 0.2s, border-color 0.2s, color 0.2s, box-shadow
      0.2s;
  --cd-disabled-opacity: 0.3;
  --cd-focus-shadow: 0 0 0 2px rgba(0, 44, 108, 0.3);
}
```

### Customizing Styles

You can customize the appearance of components by overriding these CSS variables in your own stylesheet:

```css
:root {
  --cd-primary: #3f51b5; /* Change primary color to indigo */
  --cd-border-radius: 0.5rem; /* Rounder corners */
}
```

## Development

### Setup

To set up the project for development:

```bash
git clone https://github.com/your-organization/cd-components.git
cd cd-components
npm install
```

### Running the Development Server

```bash
npm run dev
```

This will start a development server at http://localhost:9000 with a demo page where you can test all components.

### Building for Production

```bash
npm run build
```

This will generate production-ready files in the `dist` directory.

## Troubleshooting

### Common Issues

#### Components Not Showing Up

- Ensure you've imported the components correctly
- Check the browser console for errors
- Verify the component names are spelled correctly in your HTML

#### Table Data Not Displaying

- Make sure to set the data property after the component is defined
- Use the Object.assign method as shown in the examples
- Add a small delay inside a DOMContentLoaded event listener to ensure components are registered

#### Style Issues

- Check if you have conflicting CSS that might be overriding the components
- Ensure the CSS variables are accessible to the components
- Use browser developer tools to inspect the shadow DOM and debug styling issues

#### Event Handling

- Remember that events from shadow DOM need the `composed: true` flag to bubble through the shadow boundary
- Use event listeners as shown in the examples to properly capture events

## Contributing

Contributions are welcome! Please feel free to [submit a Pull Request](https://github.com/arvissidorovs/cd-components/pulls).

## Support

For help and questions, please [open an issue](https://github.com/your-username/arvissidorovs/issues) on the GitHub repository.
