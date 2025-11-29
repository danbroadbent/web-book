import { BaseCustomElement } from '../core/CustomElement.js';

class BookListItem extends BaseCustomElement {
  static get observedAttributes() {
    return ['list-type', 'list-spacing', 'list-marker', 'index'];
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
    this.style.display = 'list-item';

    const type = this.getAttribute('list-type') || 'unordered';
    const spacing = this.getAttribute('list-spacing') || 'normal';
    const marker = this.getAttribute('list-marker');

    // Spacing
    if (spacing === 'compact') {
      this.style.marginBottom = '0.2em';
    } else if (spacing === 'relaxed') {
      this.style.marginBottom = '1em';
    } else {
      this.style.marginBottom = '0.5em';
    }

    // Marker style
    if (marker) {
      this.style.listStyleType = `"${marker} "`;
    } else {
      if (type === 'ordered') {
        this.style.listStyleType = 'decimal';
      } else {
        this.style.listStyleType = 'disc';
      }
    }
  }
}

if (!customElements.get('book-list-item')) {
  customElements.define('book-list-item', BookListItem);
}

export default BookListItem;
