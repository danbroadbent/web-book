import { BaseCustomElement } from '../core/CustomElement.js';

class BookAccordion extends BaseCustomElement {
  static get observedAttributes() {
    return ['title', 'open', 'icon'];
  }

  constructor() {
    super();
    this.toggle = this.toggle.bind(this);
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    this.render();
  }

  toggle() {
    const isOpen = this.getAttribute('open') === 'true';
    this.setAttribute('open', !isOpen);
  }

  render() {
    const title = this.getAttribute('title') || 'Details';
    const isOpen = this.getAttribute('open') === 'true';

    this.style.display = 'block';
    this.style.border = '1px solid #ddd';
    this.style.borderRadius = '4px';
    this.style.margin = '1rem 0';

    // Header
    let header = this.querySelector('.book-accordion__header');
    if (!header) {
      header = document.createElement('div');
      header.className = 'book-accordion__header';
      header.style.padding = '1rem';
      header.style.backgroundColor = '#f5f5f5';
      header.style.cursor = 'pointer';
      header.style.fontWeight = 'bold';
      header.style.display = 'flex';
      header.style.justifyContent = 'space-between';
      header.style.alignItems = 'center';
      header.addEventListener('click', this.toggle);
      this.prepend(header);
    }

    header.innerHTML = '';
    const titleSpan = document.createElement('span');
    titleSpan.textContent = title;
    header.appendChild(titleSpan);

    const icon = document.createElement('span');
    icon.textContent = isOpen ? '−' : '+';
    icon.style.fontSize = '1.2em';
    header.appendChild(icon);

    // Content
    const contentNodes = Array.from(this.childNodes).filter(
      (n) => n !== header
    );
    contentNodes.forEach((node) => {
      if (node.nodeType === 1) {
        node.style.display = isOpen ? 'block' : 'none';
        if (isOpen) {
          node.style.padding = '1rem';
          node.style.borderTop = '1px solid #ddd';
        }
      }
    });
  }
}

if (!customElements.get('book-accordion')) {
  customElements.define('book-accordion', BookAccordion);
}

export default BookAccordion;
