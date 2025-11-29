import { BaseCustomElement } from '../core/CustomElement.js';

class BookCaption extends BaseCustomElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.style.display = 'block';
    this.style.marginTop = '0.5rem';
    this.style.fontSize = '0.9rem';
    this.style.color = 'var(--book-text-color-light, #666)';
    this.style.fontStyle = 'italic';
  }
}

if (!customElements.get('book-caption')) {
  customElements.define('book-caption', BookCaption);
}

export default BookCaption;
