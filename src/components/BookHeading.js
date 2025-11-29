import { BaseCustomElement } from '../core/CustomElement.js';

class BookHeading extends BaseCustomElement {
  static get observedAttributes() {
    return ['level', 'align', 'id'];
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
    const level = parseInt(this.getAttribute('level') || '2');
    const align = this.getAttribute('align') || 'left';

    this.style.display = 'block';
    this.style.textAlign = align;
    this.style.fontWeight = 'bold';
    this.style.lineHeight = '1.3';

    // Map levels to font sizes roughly
    const sizes = {
      1: '2.5rem',
      2: '2rem',
      3: '1.75rem',
      4: '1.5rem',
      5: '1.25rem',
      6: '1rem',
    };

    this.style.fontSize = sizes[level] || sizes[2];
    this.style.marginTop = '1.5em';
    this.style.marginBottom = '0.8em';
  }
}

if (!customElements.get('book-heading')) {
  customElements.define('book-heading', BookHeading);
}

export default BookHeading;
