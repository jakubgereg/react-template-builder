export type ComponentTemplate = {
  type?: string;
  className?: string;
  props?: Record<string, any>;
  children?: React.ReactNode | ComponentTemplate[];
};

export type HtmlComponent<T extends keyof React.JSX.IntrinsicElements> = Omit<
  ComponentTemplate,
  'component' | 'props'
> & {
  type: T;
  props?: Omit<React.JSX.IntrinsicElements[T], 'className'>;
};

export type CustomComponentMapping = Record<string, React.ElementType>;
