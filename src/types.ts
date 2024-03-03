export interface ComponentTemplateBase {
  type?: string;
  className?: string;
  children?: React.ReactNode | ComponentTemplate[];
}

export interface ComponentTemplate extends ComponentTemplateBase {
  props?: Record<string, any>;
}

export type ComponentType<T extends any, K extends keyof T> = ComponentTemplateBase & {
  type: K;
  props?: T[K];
};

export type HtmlComponent<T extends keyof React.JSX.IntrinsicElements> = ComponentTemplateBase &
  ComponentType<React.JSX.IntrinsicElements, T>;

export type ComponentCollection<T> = {
  [K in keyof T]: React.ComponentType<T[K]>;
};
