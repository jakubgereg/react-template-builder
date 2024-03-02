import { HtmlElements, htmlElements } from './html-elements';

export const isHtmlElement = (component: string): component is HtmlElements =>
  (htmlElements as readonly string[]).includes(component);
