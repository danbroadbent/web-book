import { BaseCustomElement } from '../core/CustomElement.js';

class BookQuote extends BaseCustomElement {
  static get observedAttributes() {
    return ['attribution', 'cite', 'align', 'type'];
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

    const type = this.getAttribute('type') || 'default';
    const align = this.getAttribute('align') || 'left';

    // Reset styles
    this.style.borderLeft = 'none';
    this.style.padding = '0';
    this.style.fontStyle = 'normal';
    this.style.textAlign = align;
    this.style.width = '100%';
    this.style.float = 'none';

    if (type === 'default') {
      this.style.borderLeft = '4px solid var(--book-accent-color, #ccc)';
      this.style.paddingLeft = '1.5rem';
      this.style.fontStyle = 'italic';
    } else if (type === 'pullquote') {
      this.style.fontSize = '1.5em';
      this.style.textAlign = 'center';
      this.style.borderTop = '2px solid var(--book-accent-color, #ccc)';
      this.style.borderBottom = '2px solid var(--book-accent-color, #ccc)';
      this.style.padding = '1.5rem 0';
    } else if (type === 'epigraph') {
      this.style.fontSize = '0.9em';
      this.style.width = '60%';
      this.style.marginLeft = 'auto';
      this.style.marginRight = 'auto';
    }

    // Handle attribution
    let footer = this.querySelector('footer');
    const attribution = this.getAttribute('attribution');
    const cite = this.getAttribute('cite');

    if ((attribution || cite) && !footer) {
      footer = document.createElement('footer');
      this.appendChild(footer);
    }

    if (footer) {
      footer.style.marginTop = '0.5rem';
      footer.style.fontSize = '0.9em';
      footer.style.fontStyle = 'normal';
      footer.style.textAlign = 'right';
      footer.innerHTML = '';

      if (attribution) {
        const span = document.createElement('span');
        span.textContent = `— ${attribution}`;
        footer.appendChild(span);
      }

      if (cite) {
        const link = document.createElement('a');
        link.href = cite;
        link.textContent = ' (Source)';
        link.style.marginLeft = '0.5rem';
        footer.appendChild(link);
      }
    }
  }
}

if (!customElements.get('book-quote')) {
  customElements.define('book-quote', BookQuote);
}

export default BookQuote;
