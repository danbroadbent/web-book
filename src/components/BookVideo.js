import { BaseCustomElement } from '../core/CustomElement.js';

class BookVideo extends BaseCustomElement {
  static get observedAttributes() {
    return [
      'src',
      'poster',
      'caption',
      'width',
      'height',
      'controls',
      'autoplay',
      'loop',
      'muted',
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
    this.style.textAlign = 'center';

    let video = this.querySelector('video');
    if (!video) {
      video = document.createElement('video');
      this.prepend(video);
    }

    video.src = this.getAttribute('src');
    if (this.getAttribute('poster')) video.poster = this.getAttribute('poster');
    video.controls = this.getAttribute('controls') !== 'false';
    video.autoplay = this.getAttribute('autoplay') === 'true';
    video.loop = this.getAttribute('loop') === 'true';
    video.muted = this.getAttribute('muted') === 'true';

    video.style.maxWidth = '100%';
    video.style.width = this.getAttribute('width') || '100%';
    if (this.getAttribute('height'))
      video.style.height = this.getAttribute('height');

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

if (!customElements.get('book-video')) {
  customElements.define('book-video', BookVideo);
}

export default BookVideo;
