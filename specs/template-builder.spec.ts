import ReactTestRendered from 'react-test-renderer';
import { createTemplateBuilder } from '../src/template-builder';
import { TestComponent, Box, List } from './TestComponent';

const basicBuilder = createTemplateBuilder();
const customBuilder = createTemplateBuilder({
  TestComponent,
  Box,
  List
});

describe('TemplateBuilder', () => {
  it('should match a snapshot', () => {
    const component = basicBuilder.renderComponent({ type: 'main', className: 'main', children: 'Hello, World!' });
    let result = ReactTestRendered.create(component).toJSON();
    expect(result).toMatchSnapshot();
  });

  it('should match a snapshot with custom components', () => {
    const component = customBuilder.renderComponent({
      type: 'TestComponent',
      className: 'test-class-name',
      props: { value: { array: ['one', 'two', 1, 2], object: { dynamic: true }, number: 1, string: 'X' } }
    });
    let result = ReactTestRendered.create(component).toJSON();
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

    let result = ReactTestRendered.create(component).toJSON();
    console.log(result);
    expect(result).toMatchSnapshot();
  });
});
