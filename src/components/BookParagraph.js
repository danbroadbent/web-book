import { BaseCustomElement } from '../core/CustomElement.js';

class BookParagraph extends BaseCustomElement {
  static get observedAttributes() {
    return ['align', 'indent', 'dropcap'];
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
    this.style.marginBottom = '1.5em';
    this.style.lineHeight = 'var(--book-line-height, 1.6)';
    this.style.fontSize = 'var(--book-font-size, 1rem)';

    const align = this.getAttribute('align');
    if (align) {
      this.style.textAlign = align;
    }

    const indent = this.getAttribute('indent');
    if (indent === 'true') {
      this.style.textIndent = '2em';
    } else {
      this.style.textIndent = '0';
    }

    const dropcap = this.getAttribute('dropcap');
    if (dropcap === 'true') {
      this.classList.add('has-dropcap');
      // We might need some CSS for this class in base.css or inject it here
      // For now, let's assume base.css will handle .has-dropcap::first-letter
      // Or we can inject a style tag if we want to be self-contained, but that's messy.
      // Let's add inline style for the first letter if possible? No, pseudo-elements can't be styled inline.
      // We'll rely on a class.
    } else {
      this.classList.remove('has-dropcap');
    }
  }
}

if (!customElements.get('book-paragraph')) {
  customElements.define('book-paragraph', BookParagraph);
}

export default BookParagraph;
