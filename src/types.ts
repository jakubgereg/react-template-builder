export interface ComponentTemplateBase {
  type?: string;
  className?: string;
  children?: React.ReactNode | ComponentTemplate[];
}

export interface ComponentTemplate extends ComponentTemplateBase {
  props?: { [key: string]: any };
}

export type ComponentType<Type extends any, Key extends keyof Type> = ComponentTemplateBase & {
  type: K;
  props?: Omit<Type[Key], 'className' | 'children'>;
};

export type HtmlComponent<HtmlTag extends keyof React.JSX.IntrinsicElements> = ComponentTemplateBase &
  ComponentType<React.JSX.IntrinsicElements, HtmlTag>;

export type ComponentCollection<CollectionType> = {
  [K in keyof CollectionType]: React.ComponentType<CollectionType[K]>;
};
}