import ReactTestRendered from 'react-test-renderer';
import { createTemplateBuilder } from '../src/template-builder';
import { HtmlComponent } from '../src/types';
import { Box, List, TestComponent } from './TestComponent';

const basicBuilder = createTemplateBuilder();
const customBuilder = createTemplateBuilder({
  TestComponent,
  Box,
  List
});

describe('TemplateBuilder', () => {
  describe('renderComponent', () => {
    it('should match a snapshot', () => {
      const component = basicBuilder.renderComponent({ type: 'main', className: 'main', children: 'Hello, World!' });
      const result = ReactTestRendered.create(component).toJSON();
      expect(result).toMatchSnapshot();
    });

    it('should render div by default', () => {
      const component = basicBuilder.renderComponent({ className: 'div-class', children: 'Hello, from div!' });
      const result = ReactTestRendered.create(component).toJSON();
      expect(result).toMatchSnapshot();
    });

    it('should match a snapshot with custom components', () => {
      const component = customBuilder.renderComponent({
        type: 'TestComponent',
        className: 'test-class-name',
        props: { value: { array: ['one', 'two', 1, 2], object: { dynamic: true }, number: 1, string: 'X' } }
      });
      const result = ReactTestRendered.create(component).toJSON();
      expect(result).toMatchSnapshot();
    });

    it('should match a snapshot with custom nested components', () => {
      const component = customBuilder.renderComponent({
        type: 'Box',
        className: 'main-box',
        children: [
          {
            type: 'Box',
            className: 'nested-box',
            children: [
              {
                type: 'TestComponent',
                className: 'test-class-name',
                props: { value: { array: ['one', 'two', 1, 2], object: { dynamic: true }, number: 1, string: 'X' } }
              }
            ]
          },
          {
            type: 'List',
            className: 'list-class-name',
            props: { items: ['one', 'two', 'three'] }
          },
          {
            type: 'a',
            className: 'link-class-name',
            props: { href: 'github.com', children: 'Google' }
          }
        ]
      });

      const result = ReactTestRendered.create(component).toJSON();
      expect(result).toMatchSnapshot();
    });
  });
  describe('defineComponent', () => {
    it('should be and image tag', () => {
      const image = basicBuilder.defineComponent({
        type: 'img',
        props: {
          src: './img'
        }
      });
      expect(image).toEqual(expect.objectContaining<HtmlComponent<'img'>>({ type: 'img' }));
    });

    it('should be and a tag', () => {
      const anchor = basicBuilder.defineComponent({
        type: 'a',
        props: {
          href: 'github.com'
        }
      });
      expect(anchor).toEqual(expect.objectContaining<HtmlComponent<'a'>>({ type: 'a' }));
    });
  });
  describe('defineCustom', () => {
    it('should be a custom TestComponent', () => {
      const testComponent = customBuilder.defineCustom({
        type: 'TestComponent',
        props: {
          value: { number: 1 }
        }
      });

      expect(testComponent).toEqual(expect.objectContaining({ type: 'TestComponent' }));
    });
    it('should be a custom List', () => {
      const testComponent = customBuilder.defineCustom({
        type: 'List',
        props: {
          items: ['1', '2', '3']
        }
      });
      expect(testComponent).toEqual(expect.objectContaining({ type: 'List' }));
    });
  });
});
