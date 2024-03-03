import React from 'react';

import { ComponentTemplate, CustomComponentMapping } from './types';
import { defineComponent, isHtmlElement } from './utils';

const renderComponent =
  (mapping?: CustomComponentMapping) =>
  ({ type = 'div', className, children: childrenFromProps, props }: ComponentTemplate): React.ReactElement => {
    const children = Array.isArray(childrenFromProps)
      ? childrenFromProps.map((child, idx) =>
          React.createElement(React.Fragment, { key: idx }, renderComponent(mapping)(child))
        )
      : childrenFromProps;

    if (typeof type !== 'string') throw new Error('component key must be a string');

    const combinedProps = { ...props, className };
    if (isHtmlElement(type)) return React.createElement(type, combinedProps, children);
    if (mapping && mapping[type]) {
      const Component = mapping[type];
      return React.createElement(Component, combinedProps, children);
    }
    console.error(`Component type=[${type}] not found`);
    return React.createElement('div', combinedProps, children);
  };

export const createTemplateBuilder = (mapping?: CustomComponentMapping) => ({
  renderComponent: renderComponent(mapping),
  defineComponent
});
