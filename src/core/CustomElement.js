export class BaseCustomElement extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return [];
  }

  connectedCallback() {}
  disconnectedCallback() {}
  attributeChangedCallback() {}
  adoptedCallback() {}

  // Utility methods
  parseAttribute(value, type) {
    if (value === null) return null;
    switch (type) {
      case 'number':
        return Number(value);
      case 'boolean':
        return value !== 'false';
      case 'json':
        try {
          return JSON.parse(value);
        } catch (e) {
          return null;
        }
      default:
        return value;
    }
  }

  // DOM helpers
  createElement(tag, attributes = {}, children = []) {
    const element = document.createElement(tag);
    Object.entries(attributes).forEach(([key, value]) => {
      if (key === 'className') {
        element.className = value;
      } else if (key === 'dataset') {
        Object.entries(value).forEach(([dataKey, dataValue]) => {
          element.dataset[dataKey] = dataValue;
        });
      } else {
        element.setAttribute(key, value);
      }
    });

    children.forEach((child) => {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else {
        element.appendChild(child);
      }
    });

    return element;
  }

  query(selector) {
    return this.querySelector(selector);
  }

  queryAll(selector) {
    return Array.from(this.querySelectorAll(selector));
  }

  emit(eventName, detail = {}) {
    this.dispatchEvent(
      new CustomEvent(eventName, {
        detail,
        bubbles: true,
        composed: true,
      })
    );
  }

  on(eventName, handler) {
    this.addEventListener(eventName, handler);
  }

  off(eventName, handler) {
    this.removeEventListener(eventName, handler);
  }
}
