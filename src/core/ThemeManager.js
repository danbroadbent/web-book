export default class ThemeManager {
  constructor(element) {
    this.element = element;
    this.themes = {
      light: {
        '--book-background': '#ffffff',
        '--book-text-color': '#333333',
        '--book-selection-bg': '#b3d4fc',
      },
      dark: {
        '--book-background': '#1a1a1a',
        '--book-text-color': '#e0e0e0',
        '--book-selection-bg': '#264f78',
      },
      sepia: {
        '--book-background': '#f4ecd8',
        '--book-text-color': '#5b4636',
        '--book-selection-bg': '#e6d7b8',
      },
    };
  }

  applyTheme(themeName) {
    const theme = this.themes[themeName] || this.themes.light;
    this.updateCSSVariables(theme);
  }

  registerTheme(name, variables) {
    this.themes[name] = variables;
  }

  getTheme(name) {
    return this.themes[name];
  }

  getCurrentTheme() {
    // This is a bit tricky since we don't store the current theme name in the manager,
    // but we can infer it or just rely on the state manager for that.
    // For now, let's assume the element has a 'theme' attribute.
    return this.element.getAttribute('theme') || 'light';
  }

  updateCSSVariables(variables) {
    Object.entries(variables).forEach(([property, value]) => {
      this.element.style.setProperty(property, value);
    });
  }
}
