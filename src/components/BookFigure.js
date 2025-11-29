import { BaseCustomElement } from '../core/CustomElement.js';

class BookFigure extends BaseCustomElement {
  static get observedAttributes() {
    return ['id', 'number', 'align'];
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

    const align = this.getAttribute('align') || 'center';

    if (align === 'center') {
      this.style.textAlign = 'center';
    } else if (align === 'left') {
      this.style.float = 'left';
      this.style.marginRight = '2rem';
      this.style.maxWidth = '50%';
    } else if (align === 'right') {
      this.style.float = 'right';
      this.style.marginLeft = '2rem';
      this.style.maxWidth = '50%';
    }
  }
}

if (!customElements.get('book-figure')) {
  customElements.define('book-figure', BookFigure);
}

export default BookFigure;
