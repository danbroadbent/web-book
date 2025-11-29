// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import BookParagraph from '../../src/components/BookParagraph.js';

describe('BookParagraph', () => {
  let element;

  beforeEach(() => {
    element = document.createElement('book-paragraph');
    document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('renders with default styles', () => {
    expect(element).toBeInstanceOf(BookParagraph);
    expect(element.style.display).toBe('block');
    expect(element.style.marginBottom).toBe('1.5em');
  });

  it('handles align attribute', () => {
    element.setAttribute('align', 'center');
    expect(element.style.textAlign).toBe('center');
  });

  it('handles indent attribute', () => {
    element.setAttribute('indent', 'true');
    expect(element.style.textIndent).toBe('2em');

    element.setAttribute('indent', 'false');
    // Browsers might normalize '0' to '0px'
    expect(element.style.textIndent).toMatch(/^0(px)?$/);
  });

  it('handles dropcap attribute', () => {
    element.setAttribute('dropcap', 'true');
    expect(element.classList.contains('has-dropcap')).toBe(true);

    element.setAttribute('dropcap', 'false');
    expect(element.classList.contains('has-dropcap')).toBe(false);
  });
});
