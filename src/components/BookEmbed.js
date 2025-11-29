import { BaseCustomElement } from '../core/CustomElement.js';

class BookEmbed extends BaseCustomElement {
  static get observedAttributes() {
    return ['src', 'type', 'width', 'height', 'caption', 'allow', 'sandbox'];
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
    this.style.textAlign = 'center';

    const type = this.getAttribute('type') || 'iframe';

    if (type === 'iframe') {
      let iframe = this.querySelector('iframe');
      if (!iframe) {
        iframe = document.createElement('iframe');
        this.prepend(iframe);
      }

      iframe.src = this.getAttribute('src');
      iframe.width = this.getAttribute('width') || '100%';
      iframe.height = this.getAttribute('height') || '400px';
      iframe.style.border = 'none';

      if (this.getAttribute('allow')) iframe.allow = this.getAttribute('allow');
      if (this.getAttribute('sandbox'))
        iframe.sandbox = this.getAttribute('sandbox');
    }

    const caption = this.getAttribute('caption');
    let figcaption = this.querySelector('figcaption');
    if (caption && !figcaption) {
      figcaption = document.createElement('figcaption');
      this.appendChild(figcaption);
    }

    if (figcaption) {
      figcaption.textContent = caption;
      figcaption.style.marginTop = '0.5rem';
      figcaption.style.fontSize = '0.9rem';
      figcaption.style.color = 'var(--book-text-color-light, #666)';
    }
  }
}

if (!customElements.get('book-embed')) {
  customElements.define('book-embed', BookEmbed);
}

export default BookEmbed;
