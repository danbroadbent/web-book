import { BaseCustomElement } from '../core/CustomElement.js';
import StateManager from '../core/StateManager.js';
import ThemeManager from '../core/ThemeManager.js';
import { DEFAULTS } from '../constants/defaults.js';
import { parseAttribute } from '../utils/attributes.js';
import { loadPosition, savePosition } from '../utils/storage.js';

class WebBook extends BaseCustomElement {
  static get observedAttributes() {
    return [
      'mode',
      'theme',
      'font-family',
      'font-size',
      'line-height',
      'text-align',
      'columns',
      'max-width',
      'language',
      'reading-direction',
      'save-position',
      'show-progress',
    ];
  }

  constructor() {
    super();
    this.state = new StateManager(DEFAULTS);
    this.themeManager = new ThemeManager(this);
    this._isInitialized = false;
    this._resizeObserver = null;
  }

  connectedCallback() {
    this.init();
  }

  disconnectedCallback() {
    this.cleanup();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this._isInitialized) return;
    this.handleAttributeChange(name, newValue);
  }

  init() {
    if (this._isInitialized) return;

    // 1. Parse attributes and update state
    this.applyAttributes();

    // 2. Create DOM structure
    this.createWrapper();

    // 3. Apply initial theme
    this.themeManager.applyTheme(this.getAttribute('theme') || 'light');

    // 4. Set up CSS variables
    this.updateCSSVariables();

    // 5. Attach event listeners
    this.attachEventListeners();

    // 6. Restore position if enabled
    if (this.getAttribute('save-position') !== 'false') {
      this.restorePosition();
    }

    // 7. Set up resize observer
    this.observeResize();

    this._isInitialized = true;
    this.emit('book-ready', { element: this });
  }

  createWrapper() {
    // Get existing content
    const content = Array.from(this.childNodes);

    // Create wrapper structure
    const wrapper = document.createElement('div');
    wrapper.className = 'web-book__wrapper';

    // Create progress indicator (if enabled)
    if (this.getAttribute('show-progress') !== 'false') {
      const progress = document.createElement('div');
      progress.className = 'web-book__progress';
      progress.dataset.progress = '0';
      wrapper.appendChild(progress);
      this._progressBar = progress;
    }

    // Create content container
    const contentContainer = document.createElement('div');
    contentContainer.className = 'web-book__content';

    // Move content into container
    content.forEach((node) => contentContainer.appendChild(node));
    wrapper.appendChild(contentContainer);

    // Clear current content and append wrapper
    this.innerHTML = '';
    this.appendChild(wrapper);
  }

  updateCSSVariables() {
    const state = this.state.getState();
    this.style.setProperty('--book-font-size', state.fontSize);
    this.style.setProperty('--book-font-family', state.fontFamily);
    this.style.setProperty('--book-line-height', state.lineHeight);
    this.style.setProperty('--book-text-align', state.textAlign);
    this.style.setProperty('--book-max-width', state.maxWidth);
    this.style.setProperty('--book-columns', state.columns);
    this.style.setProperty('--book-reading-direction', state.readingDirection);
  }

  attachEventListeners() {
    // Window events
    window.addEventListener('resize', this.handleResize.bind(this));
    window.addEventListener('keydown', this.handleKeydown.bind(this));

    // Scroll events
    const content = this.querySelector('.web-book__content');
    if (content) {
      content.addEventListener('scroll', this.handleScroll.bind(this));
    }
  }

  observeResize() {
    this._resizeObserver = new ResizeObserver(() => {
      this.handleResize();
    });
    this._resizeObserver.observe(this);
  }

  applyAttributes() {
    const attrs = {};
    WebBook.observedAttributes.forEach((attr) => {
      if (this.hasAttribute(attr)) {
        // Simple mapping for now, ideally use camelCase conversion
        const prop = attr.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        attrs[prop] = parseAttribute(
          this.getAttribute(attr),
          typeof DEFAULTS[prop]
        );
      }
    });
    this.state.setState(attrs);
  }

  handleAttributeChange(name, value) {
    const prop = name.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    const parsedValue = parseAttribute(value, typeof DEFAULTS[prop]);

    this.state.setState({ [prop]: parsedValue });

    if (name === 'theme') {
      this.themeManager.applyTheme(value);
    } else {
      this.updateCSSVariables();
    }
  }

  // Public API Methods

  nextPage() {
    // Placeholder for pagination logic
    console.log('nextPage');
  }

  previousPage() {
    // Placeholder for pagination logic
    console.log('previousPage');
  }

  goToPage(pageNumber) {
    // Placeholder
    console.log('goToPage', pageNumber);
  }

  goToChapter(chapterIndex) {
    const chapters = this.querySelectorAll('book-chapter');
    if (chapters[chapterIndex]) {
      chapters[chapterIndex].scrollIntoView();
      this.emit('chapter-change', { chapter: chapterIndex });
    }
  }

  getCurrentPosition() {
    return this.state.getCurrentPosition();
  }

  setPosition(position) {
    this.state.setCurrentPosition(position);
    // Logic to scroll to position would go here
    this.emit('position-change', { position: this.getCurrentPosition() });
  }

  saveCurrentPosition() {
    if (!this.state.getState().savePosition) return;
    const position = this.getCurrentPosition();
    savePosition(this.id || 'default-book', position);
  }

  restorePosition() {
    if (!this.state.getState().savePosition) return;
    const position = loadPosition(this.id || 'default-book');
    if (position) {
      this.setPosition(position);
    }
  }

  setTheme(themeName) {
    this.setAttribute('theme', themeName);
  }

  setFontSize(size) {
    this.setAttribute('font-size', size);
  }

  setMode(mode) {
    this.setAttribute('mode', mode);
  }

  configure(options) {
    Object.entries(options).forEach(([key, value]) => {
      // Convert camelCase to kebab-case for attribute
      const attr = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      this.setAttribute(attr, value);
    });
  }

  addBookmark(position = null) {
    const bookmarkPosition = position || this.getCurrentPosition();
    const bookmarks = [
      ...this.state.getState().bookmarks,
      {
        id: Date.now(),
        position: bookmarkPosition,
        timestamp: new Date().toISOString(),
      },
    ];
    this.state.setState({ bookmarks });
    return bookmarks[bookmarks.length - 1].id;
  }

  getBookmarks() {
    return [...this.state.getState().bookmarks];
  }

  removeBookmark(bookmarkId) {
    const bookmarks = this.state
      .getState()
      .bookmarks.filter((b) => b.id !== bookmarkId);
    this.state.setState({ bookmarks });
    this.emit('bookmark-removed', { bookmarkId });
  }

  // Event Handlers

  handleResize() {
    // Debounce logic could go here
    this.updateCSSVariables();
  }

  handleScroll() {
    // Throttle logic could go here
    const content = this.querySelector('.web-book__content');
    if (!content) return;

    const { scrollTop, scrollHeight, clientHeight } = content;
    const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;

    this.state.setState({
      scrollPosition: scrollTop,
      readingProgress: progress,
    });

    if (this._progressBar) {
      this._progressBar.style.width = `${progress}%`;
      this._progressBar.dataset.progress = Math.round(progress);
    }
  }

  handleKeydown(e) {
    if (e.key === 'ArrowRight') {
      this.nextPage();
    } else if (e.key === 'ArrowLeft') {
      this.previousPage();
    }
  }

  cleanup() {
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
    }
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('keydown', this.handleKeydown);
  }
}

if (!customElements.get('web-book')) {
  customElements.define('web-book', WebBook);
}

export default WebBook;
