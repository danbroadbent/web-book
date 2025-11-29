import { BaseCustomElement } from '../core/CustomElement.js';

class BookTooltip extends BaseCustomElement {
  static get observedAttributes() {
    return ['term', 'definition', 'position'];
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
    this.style.display = 'inline-block';
    this.style.borderBottom = '1px dotted var(--book-text-color, #333)';
    this.style.cursor = 'help';
    this.style.position = 'relative';

    const term = this.getAttribute('term');
    const definition = this.getAttribute('definition');

    // If term is not provided, use text content as term
    if (!term && this.textContent.trim()) {
      // Keep content as is
    } else if (term) {
      this.textContent = term;
    }

    // Create tooltip element
    let tooltip = this.querySelector('.book-tooltip__content');
    if (!tooltip) {
      tooltip = document.createElement('span');
      tooltip.className = 'book-tooltip__content';
      tooltip.style.visibility = 'hidden';
      tooltip.style.width = '200px';
      tooltip.style.backgroundColor = '#333';
      tooltip.style.color = '#fff';
      tooltip.style.textAlign = 'center';
      tooltip.style.borderRadius = '6px';
      tooltip.style.padding = '5px';
      tooltip.style.position = 'absolute';
      tooltip.style.zIndex = '1';
      tooltip.style.bottom = '125%';
      tooltip.style.left = '50%';
      tooltip.style.marginLeft = '-100px';
      tooltip.style.opacity = '0';
      tooltip.style.transition = 'opacity 0.3s';
      tooltip.style.fontSize = '0.8rem';
      tooltip.style.fontWeight = 'normal';

      this.appendChild(tooltip);

      // Hover events
      this.addEventListener('mouseenter', () => {
        tooltip.style.visibility = 'visible';
        tooltip.style.opacity = '1';
      });

      this.addEventListener('mouseleave', () => {
        tooltip.style.visibility = 'hidden';
        tooltip.style.opacity = '0';
      });
    }

    if (definition) {
      tooltip.textContent = definition;
    }
  }
}

if (!customElements.get('book-tooltip')) {
  customElements.define('book-tooltip', BookTooltip);
}

export default BookTooltip;
