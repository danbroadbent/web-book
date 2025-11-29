import { BaseCustomElement } from '../core/CustomElement.js';

class BookAudio extends BaseCustomElement {
  static get observedAttributes() {
    return ['src', 'caption', 'controls', 'autoplay', 'loop'];
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

    let audio = this.querySelector('audio');
    if (!audio) {
      audio = document.createElement('audio');
      this.prepend(audio);
    }

    audio.src = this.getAttribute('src');
    audio.controls = this.getAttribute('controls') !== 'false';
    audio.autoplay = this.getAttribute('autoplay') === 'true';
    audio.loop = this.getAttribute('loop') === 'true';

    audio.style.width = '100%';

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

if (!customElements.get('book-audio')) {
  customElements.define('book-audio', BookAudio);
}

export default BookAudio;
