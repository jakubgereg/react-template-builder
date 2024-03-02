import { isHtmlElement } from '../src/utils';

describe('isHtmlElement', () => {
  it('should return true for a valid html element', () => {
    expect(isHtmlElement('div')).toBe(true);
    expect(isHtmlElement('span')).toBe(true);
    expect(isHtmlElement('a')).toBe(true);
    expect(isHtmlElement('p')).toBe(true);
    expect(isHtmlElement('input')).toBe(true);
  });

  it('should return false for an invalid html element', () => {
    expect(isHtmlElement('foo')).toBe(false);
    expect(isHtmlElement('bar')).toBe(false);
    expect(isHtmlElement('baz')).toBe(false);
    expect(isHtmlElement('qux')).toBe(false);
  });
});
