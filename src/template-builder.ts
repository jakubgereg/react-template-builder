import React from 'react';

import { ComponentTemplate, ComponentCollection, HtmlComponent, ComponentType } from './types';
import { isHtmlElement } from './utils';

export const defineComponent = <HtmlTag extends keyof React.JSX.IntrinsicElements = never>(
  component: HtmlComponent<HtmlTag>
): HtmlComponent<HtmlTag> => component;

export const defineCustom =
  <CollectionType>(mapping?: ComponentCollection<CollectionType>) =>
  <Key extends keyof CollectionType>(
    component: ComponentType<CollectionType, Key>
  ): ComponentType<CollectionType, Key> =>
    component;

const renderComponent =
  (mapping?: ComponentCollection<any>) =>
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

export const createTemplateBuilder = <CollectionType>(mapping?: ComponentCollection<CollectionType>) => ({
  renderComponent: renderComponent(mapping),
  defineComponent,
  defineCustom: defineCustom(mapping)
});
