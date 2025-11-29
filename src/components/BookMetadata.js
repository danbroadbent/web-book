import { BaseCustomElement } from '../core/CustomElement.js';

class BookMetadata extends BaseCustomElement {
  static get observedAttributes() {
    return [
      'title',
      'author',
      'isbn',
      'publisher',
      'publication-date',
      'language',
      'cover',
      'description',
    ];
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
    this.style.marginBottom = '4rem';
    this.style.textAlign = 'center';
    this.innerHTML = '';

    const cover = this.getAttribute('cover');
    if (cover) {
      const img = document.createElement('img');
      img.src = cover;
      img.alt = 'Book Cover';
      img.style.maxWidth = '100%';
      img.style.maxHeight = '80vh';
      img.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
      img.style.marginBottom = '2rem';
      this.appendChild(img);
    }

    const title = this.getAttribute('title');
    if (title) {
      const h1 = document.createElement('h1');
      h1.textContent = title;
      h1.style.fontSize = '3rem';
      h1.style.marginBottom = '1rem';
      this.appendChild(h1);
    }

    const author = this.getAttribute('author');
    if (author) {
      const div = document.createElement('div');
      div.textContent = `by ${author}`;
      div.style.fontSize = '1.5rem';
      div.style.fontStyle = 'italic';
      div.style.marginBottom = '2rem';
      this.appendChild(div);
    }

    const description = this.getAttribute('description');
    if (description) {
      const p = document.createElement('p');
      p.textContent = description;
      p.style.maxWidth = '600px';
      p.style.margin = '0 auto 2rem auto';
      p.style.lineHeight = '1.6';
      this.appendChild(p);
    }

    // Metadata footer
    const meta = [];
    const publisher = this.getAttribute('publisher');
    const date = this.getAttribute('publication-date');
    const isbn = this.getAttribute('isbn');

    if (publisher) meta.push(publisher);
    if (date) meta.push(new Date(date).getFullYear());
    if (isbn) meta.push(`ISBN: ${isbn}`);

    if (meta.length > 0) {
      const footer = document.createElement('div');
      footer.textContent = meta.join(' • ');
      footer.style.fontSize = '0.9rem';
      footer.style.opacity = '0.7';
      footer.style.marginTop = '3rem';
      this.appendChild(footer);
    }
  }
}

if (!customElements.get('book-metadata')) {
  customElements.define('book-metadata', BookMetadata);
}

export default BookMetadata;
