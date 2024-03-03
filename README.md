# React Template Builder

This repository contains a utility function to render React components dynamically based on a given template structure. It provides flexibility in rendering both built-in HTML elements and custom React components.

## Installation

Install the package using npm:

```bash
npm install @jgereg/react-template-builder
```

## Usage

Import the templateBuilder function from the package:

```js
import templateBuilder from '@jgereg/react-template-builder';
```

Then, you can create a template builder instance by calling `templateBuilder`, optionally passing custom components as an argument:

```js
const template = templateBuilder(customComponentMapping);
```

You can now use the `renderComponent` method of the `templateBuilder` to render components based on a template:

```js
template.renderComponent(component);
```

## Example

```js
import React from 'react';
import templateBuilder from '@jgereg/react-template-builder';

// Define your custom components
const CustomButton = ({ onClick, children }) => <button onClick={onClick}>{children}</button>;

// Create a template builder with custom components
const { renderComponent } = templateBuilder({ Button: CustomButton });

// Define a template
const template = {
  type: 'div',
  className: 'container',
  children: [
    {
      type: 'p',
      className: 'text',
      children: 'Hello World!'
    },
    {
      type: 'Button', // Using the custom component
      className: 'btn',
      props: { onClick: () => console.log('Button clicked') },
      children: 'Click Me'
    }
  ]
};

// Render the component based on the template
const renderedComponent = renderComponent(template);
```

## API

### `templateBuilder(customComponents?)`

Creates a template builder instance.

- `customComponents` (optional): A record of custom components where keys are component names and values are React component types.

Returns an object with a `renderComponent` method.

### `renderComponent(template)`

Renders a component based on the provided template.

- `template`: An object representing the component template. It should have the following structure:
  - `type`: (string) The type of component to render. It can be either a built-in HTML element tag name (e.g., 'div', 'p', 'span') or the name of a custom component defined in `customComponents`.
  - `className`: (string) CSS class name for the component.
  - `props`: (object) Props to be passed to the component.
  - `children`: (ReactNode | ReactNodeArray) Child elements or components.

Returns a React element representing the rendered component.
