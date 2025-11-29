import { BaseCustomElement } from '../core/CustomElement.js';

class BookChapter extends BaseCustomElement {
  static get observedAttributes() {
    return ['title', 'subtitle', 'number', 'id', 'show-in-toc', 'break-before'];
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
    const title = this.getAttribute('title');
    const subtitle = this.getAttribute('subtitle');
    const number = this.getAttribute('number');

    // We want to wrap the content in a semantic section
    // But we also want to preserve the light DOM children
    // So we'll use a shadow DOM or just manipulate the light DOM carefully.
    // Given the MVP plan says "Renders a semantic <section>", and we want to avoid complex shadow DOM issues with global styles for now (unless we use constructed stylesheets which might be overkill),
    // let's try to keep it simple.
    // Actually, for a custom element wrapping content, it's often better to just BE the container or wrap internal content.
    // Let's use a simple render that adds a header if title is present.

    // However, if we modify innerHTML, we lose the original children.
    // A better approach for content wrapping components without Shadow DOM is to just style the host or prepend/append elements.

    // Let's check if we already have a header, if not create one.
    let header = this.querySelector('.book-chapter__header');
    if (!header && (title || subtitle || number)) {
      header = document.createElement('header');
      header.className = 'book-chapter__header';
      this.prepend(header);
    }

    if (header) {
      header.innerHTML = '';
      if (number) {
        const numEl = document.createElement('div');
        numEl.className = 'book-chapter__number';
        numEl.textContent = `Chapter ${number}`;
        header.appendChild(numEl);
      }
      if (title) {
        const titleEl = document.createElement('h2');
        titleEl.className = 'book-chapter__title';
        titleEl.textContent = title;
        header.appendChild(titleEl);
      }
      if (subtitle) {
        const subEl = document.createElement('div');
        subEl.className = 'book-chapter__subtitle';
        subEl.textContent = subtitle;
        header.appendChild(subEl);
      }
    }

    this.style.display = 'block';
    this.style.marginBottom = '4rem';

    if (this.getAttribute('break-before') === 'true') {
      this.style.breakBefore = 'page';
    }
  }
}

if (!customElements.get('book-chapter')) {
  customElements.define('book-chapter', BookChapter);
}

export default BookChapter;
