import { BaseCustomElement } from '../core/CustomElement.js';

class BookFootnote extends BaseCustomElement {
  static get observedAttributes() {
    return ['id', 'number'];
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
    this.style.display = 'inline';
    this.style.verticalAlign = 'super';
    this.style.fontSize = '0.7em';
    this.style.cursor = 'pointer';
    this.style.color = 'var(--book-link-color, #0066cc)';

    const number = this.getAttribute('number') || '*';

    // We want to show the number, but hide the content until clicked/hovered
    // Or move content to bottom of page/chapter.
    // For MVP, let's just show the number and maybe a tooltip or simple toggle.

    // Clear existing content display
    // Actually, the content IS the footnote text. We shouldn't display it inline.
    // We should hide the children and only show the number.

    // Create a shadow root or just hide children?
    // Let's hide children and append a number span.

    // But wait, if we hide children, we can't read them.
    // We need to move them or show them in a tooltip.

    // Let's use a simple approach:
    // 1. Create a span for the number.
    // 2. Hide the rest of the content.
    // 3. On click, toggle a popup/tooltip with the content.

    let numberSpan = this.querySelector('.book-footnote__number');
    if (!numberSpan) {
      numberSpan = document.createElement('span');
      numberSpan.className = 'book-footnote__number';
      numberSpan.textContent = `[${number}]`;
      this.prepend(numberSpan);
    } else {
      numberSpan.textContent = `[${number}]`;
    }

    // Hide other nodes
    Array.from(this.childNodes).forEach((node) => {
      if (node !== numberSpan && node.nodeType === 1) {
        node.style.display = 'none';
      } else if (node.nodeType === 3 && node.textContent.trim()) {
        // Text nodes - wrap them to hide?
        // This is getting complicated for light DOM.
        // Let's assume the user wraps content in tags or we just use title attribute for simple footnotes?
        // The example shows: <book-footnote>Content</book-footnote>

        // Let's wrap all non-number content in a hidden div
        let contentDiv = this.querySelector('.book-footnote__content');
        if (!contentDiv) {
          contentDiv = document.createElement('span');
          contentDiv.className = 'book-footnote__content';
          contentDiv.style.display = 'none';
          contentDiv.style.position = 'absolute';
          contentDiv.style.backgroundColor = 'var(--book-background, #fff)';
          contentDiv.style.border = '1px solid #ccc';
          contentDiv.style.padding = '0.5rem';
          contentDiv.style.zIndex = '100';
          contentDiv.style.width = '200px';
          contentDiv.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
          contentDiv.style.fontSize = '1rem'; // Reset font size
          contentDiv.style.lineHeight = '1.4';
          contentDiv.style.color = 'var(--book-text-color, #333)';

          // Move all other nodes into contentDiv
          const nodesToMove = Array.from(this.childNodes).filter(
            (n) => n !== numberSpan && n !== contentDiv
          );
          nodesToMove.forEach((n) => contentDiv.appendChild(n));
          this.appendChild(contentDiv);
        }
      }
    });

    // Toggle logic
    this.onclick = (e) => {
      e.stopPropagation();
      const content = this.querySelector('.book-footnote__content');
      if (content) {
        const isVisible = content.style.display !== 'none';
        content.style.display = isVisible ? 'none' : 'block';
      }
    };
  }
}

if (!customElements.get('book-footnote')) {
  customElements.define('book-footnote', BookFootnote);
}

export default BookFootnote;
