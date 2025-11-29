export default class StateManager {
  constructor(initialState = {}) {
    this.state = { ...initialState };
    this.listeners = new Set();
  }

  getState() {
    return this.state;
  }

  setState(updates) {
    this.state = { ...this.state, ...updates };
    this.notify();
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notify() {
    this.listeners.forEach((listener) => listener(this.state));
  }

  // Specific getters/setters
  getCurrentPosition() {
    return {
      chapter: this.state.currentChapter,
      page: this.state.currentPage,
      scrollPosition: this.state.scrollPosition,
      progress: this.state.readingProgress,
    };
  }

  setCurrentPosition(position) {
    this.setState({
      currentChapter: position.chapter,
      currentPage: position.page,
      scrollPosition: position.scrollPosition,
      readingProgress: position.progress,
    });
  }

  getTheme() {
    return this.state.theme;
  }

  setTheme(theme) {
    this.setState({ theme });
  }
}
