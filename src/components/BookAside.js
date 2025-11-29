import { BaseCustomElement } from '../core/CustomElement.js';

class BookAside extends BaseCustomElement {
  static get observedAttributes() {
    return ['type', 'title', 'collapsible', 'collapsed', 'position'];
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
    const isCollapsed = this.getAttribute('collapsed') === 'true';
    this.setAttribute('collapsed', !isCollapsed);
  }

  render() {
    const type = this.getAttribute('type') || 'note';
    const title = this.getAttribute('title');
    const collapsible = this.getAttribute('collapsible') === 'true';
    const collapsed = this.getAttribute('collapsed') === 'true';
    const position = this.getAttribute('position') || 'inline';

    this.style.display = 'block';
    this.style.padding = '1rem';
    this.style.margin = '1.5rem 0';
    this.style.borderRadius = '4px';
    this.style.borderLeft = '4px solid';

    // Colors based on type
    const colors = {
      note: '#2196f3',
      tip: '#4caf50',
      warning: '#ff9800',
      info: '#00bcd4',
      sidebar: '#9e9e9e',
    };
    const color = colors[type] || colors.note;

    this.style.borderColor = color;
    this.style.backgroundColor = `${color}15`; // 15 is hex alpha for ~8%

    // Position
    if (position === 'float-left') {
      this.style.float = 'left';
      this.style.width = '40%';
      this.style.marginRight = '1.5rem';
    } else if (position === 'float-right') {
      this.style.float = 'right';
      this.style.width = '40%';
      this.style.marginLeft = '1.5rem';
    } else if (position === 'margin') {
      // Margin notes are tricky without grid/flex layout on parent
      // For now, treat as float right but smaller
      this.style.float = 'right';
      this.style.width = '25%';
      this.style.marginLeft = '1.5rem';
      this.style.fontSize = '0.9em';
    } else {
      this.style.float = 'none';
      this.style.width = 'auto';
    }

    // Header
    let header = this.querySelector('.book-aside__header');
    if ((title || collapsible) && !header) {
      header = document.createElement('div');
      header.className = 'book-aside__header';
      header.style.fontWeight = 'bold';
      header.style.marginBottom = '0.5rem';
      header.style.display = 'flex';
      header.style.justifyContent = 'space-between';
      header.style.alignItems = 'center';
      header.style.cursor = collapsible ? 'pointer' : 'default';
      if (collapsible) {
        header.addEventListener('click', this.toggle);
      }
      this.prepend(header);
    }

    if (header) {
      header.innerHTML = '';
      const titleSpan = document.createElement('span');
      titleSpan.textContent = title || type.toUpperCase();
      header.appendChild(titleSpan);

      if (collapsible) {
        const icon = document.createElement('span');
        icon.textContent = collapsed ? '▼' : '▲';
        icon.style.fontSize = '0.8em';
        header.appendChild(icon);
      }
    }

    // Content visibility
    const contentNodes = Array.from(this.childNodes).filter(
      (n) => n !== header
    );
    contentNodes.forEach((node) => {
      if (node.nodeType === 1) {
        // Element
        node.style.display = collapsed ? 'none' : 'block';
      }
    });
  }
}

if (!customElements.get('book-aside')) {
  customElements.define('book-aside', BookAside);
}

export default BookAside;
