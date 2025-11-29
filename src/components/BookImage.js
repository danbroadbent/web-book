import { BaseCustomElement } from '../core/CustomElement.js';

class BookImage extends BaseCustomElement {
  static get observedAttributes() {
    return [
      'src',
      'alt',
      'caption',
      'credit',
      'width',
      'height',
      'align',
      'size',
      'loading',
      'border',
      'shadow',
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
    this.style.margin = '2rem 0';

    const src = this.getAttribute('src');
    const alt = this.getAttribute('alt') || '';
    const caption = this.getAttribute('caption');
    const credit = this.getAttribute('credit');
    const align = this.getAttribute('align') || 'center';
    const size = this.getAttribute('size') || 'medium';
    const border = this.getAttribute('border') === 'true';
    const shadow = this.getAttribute('shadow') === 'true';

    // Alignment
    if (align === 'center') {
      this.style.textAlign = 'center';
      this.style.marginLeft = 'auto';
      this.style.marginRight = 'auto';
    } else if (align === 'left') {
      this.style.float = 'left';
      this.style.marginRight = '2rem';
      this.style.marginBottom = '1rem';
      this.style.maxWidth = '50%';
    } else if (align === 'right') {
      this.style.float = 'right';
      this.style.marginLeft = '2rem';
      this.style.marginBottom = '1rem';
      this.style.maxWidth = '50%';
    }

    // Size (only applies if not floated)
    if (align === 'center') {
      if (size === 'small') this.style.maxWidth = '300px';
      else if (size === 'medium') this.style.maxWidth = '600px';
      else if (size === 'large') this.style.maxWidth = '100%';
      else if (size === 'full') {
        this.style.maxWidth = '100vw';
        this.style.marginLeft = 'calc(50% - 50vw)';
        this.style.marginRight = 'calc(50% - 50vw)';
      }
    }

    // Image
    let img = this.querySelector('img');
    if (!img) {
      img = document.createElement('img');
      this.prepend(img);
    }

    img.src = src;
    img.alt = alt;
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
    img.style.display = 'block';
    if (align === 'center') img.style.margin = '0 auto';

    if (border) img.style.border = '1px solid #ddd';
    if (shadow) img.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';

    // Caption & Credit
    let figcaption = this.querySelector('figcaption');
    if ((caption || credit) && !figcaption) {
      figcaption = document.createElement('figcaption');
      this.appendChild(figcaption);
    }

    if (figcaption) {
      figcaption.style.marginTop = '0.5rem';
      figcaption.style.fontSize = '0.9rem';
      figcaption.style.color = 'var(--book-text-color-light, #666)';
      figcaption.style.textAlign = align === 'center' ? 'center' : 'left';

      figcaption.innerHTML = '';
      if (caption) {
        const span = document.createElement('span');
        span.textContent = caption;
        figcaption.appendChild(span);
      }
      if (credit) {
        const small = document.createElement('small');
        small.textContent = ` (${credit})`;
        small.style.opacity = '0.8';
        figcaption.appendChild(small);
      }
    }
  }
}

if (!customElements.get('book-image')) {
  customElements.define('book-image', BookImage);
}

export default BookImage;
