import { BaseCustomElement } from '../core/CustomElement.js';

class BookSection extends BaseCustomElement {
  static get observedAttributes() {
    return ['title', 'level', 'id', 'show-in-toc'];
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
    this.style.marginBottom = '2rem';

    const title = this.getAttribute('title');
    const level = parseInt(this.getAttribute('level') || '2');

    // Check if we already have a heading
    let heading = this.querySelector('.book-section__title');

    if (title && !heading) {
      heading = document.createElement(`h${Math.min(Math.max(level, 1), 6)}`);
      heading.className = 'book-section__title';
      heading.textContent = title;
      heading.style.marginTop = '2em';
      heading.style.marginBottom = '1em';
      this.prepend(heading);
    } else if (title && heading) {
      heading.textContent = title;
    }
  }
}

if (!customElements.get('book-section')) {
  customElements.define('book-section', BookSection);
}

export default BookSection;
