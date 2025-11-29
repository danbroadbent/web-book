import { BaseCustomElement } from '../core/CustomElement.js';

class BookCode extends BaseCustomElement {
  static get observedAttributes() {
    return ['language', 'line-numbers', 'highlight', 'caption'];
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    this.render();
  }

  render() {
    this.style.display = 'block';
    this.style.margin = '2rem 0';
    this.style.fontFamily = 'monospace';
    this.style.backgroundColor = '#f5f5f5';
    this.style.borderRadius = '4px';
    this.style.overflow = 'hidden';

    // Check for dark theme to adjust background
    // This is a bit hacky, ideally we use CSS variables
    this.style.backgroundColor = 'var(--book-code-bg, #f5f5f5)';
    this.style.color = 'var(--book-code-color, #333)';

    const caption = this.getAttribute('caption');
    let figcaption = this.querySelector('figcaption');

    if (caption && !figcaption) {
      figcaption = document.createElement('div');
      figcaption.style.padding = '0.5rem 1rem';
      figcaption.style.backgroundColor = 'rgba(0,0,0,0.05)';
      figcaption.style.borderBottom = '1px solid rgba(0,0,0,0.1)';
      figcaption.style.fontSize = '0.9em';
      figcaption.style.fontWeight = 'bold';
      this.prepend(figcaption);
    }

    if (figcaption) {
      figcaption.textContent = caption;
    }

    // Wrap content in pre if not already
    let pre = this.querySelector('pre');
    if (!pre) {
      // Move all non-figcaption children into pre
      pre = document.createElement('pre');
      pre.style.margin = '0';
      pre.style.padding = '1rem';
      pre.style.overflowX = 'auto';

      const children = Array.from(this.childNodes).filter(
        (n) => n !== figcaption
      );
      children.forEach((child) => pre.appendChild(child));
      this.appendChild(pre);
    } else {
      pre.style.margin = '0';
      pre.style.padding = '1rem';
      pre.style.overflowX = 'auto';
    }
  }
}

if (!customElements.get('book-code')) {
  customElements.define('book-code', BookCode);
}

export default BookCode;
