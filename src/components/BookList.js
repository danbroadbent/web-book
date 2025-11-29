import { BaseCustomElement } from '../core/CustomElement.js';

class BookList extends BaseCustomElement {
  static get observedAttributes() {
    return ['type', 'marker', 'spacing'];
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
    this.style.margin = '1.5rem 0';
    this.style.paddingLeft = '2rem';

    const type = this.getAttribute('type') || 'unordered';
    const marker = this.getAttribute('marker');
    const spacing = this.getAttribute('spacing') || 'normal';

    // We can't easily change the tag name of the host or children without shadow DOM
    // But we can style the children (book-list-item)

    // Pass attributes to children via CSS variables or direct manipulation
    // Direct manipulation is easier for now
    const items = this.querySelectorAll('book-list-item');
    items.forEach((item, index) => {
      item.setAttribute('list-type', type);
      item.setAttribute('list-spacing', spacing);
      if (marker) item.setAttribute('list-marker', marker);
      if (type === 'ordered') item.setAttribute('index', index + 1);
    });
  }
}

if (!customElements.get('book-list')) {
  customElements.define('book-list', BookList);
}

export default BookList;
