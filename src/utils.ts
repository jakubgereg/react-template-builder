import { HtmlElements, htmlElements } from './html-elements';
import { HtmlComponent } from './types';

export const isHtmlElement = (component: string): component is HtmlElements =>
  (htmlElements as readonly string[]).includes(component);

export const defineComponent = <K extends keyof React.JSX.IntrinsicElements = never>(
  component: HtmlComponent<K>
): HtmlComponent<K> => component;
