# Web Book Library - AI Coding Instructions

## Project Overview

This is a vanilla JavaScript library for creating responsive book reading experiences using Web Components. It relies on standard web APIs without any frontend frameworks (React, Vue, etc.).

## Architecture

- **Core Pattern**: All components extend `BaseCustomElement` (`src/core/CustomElement.js`).
- **DOM Strategy**: Uses **Light DOM** (no Shadow DOM) to allow easy styling and composition.
- **State Management**: `WebBook` (`src/components/WebBook.js`) acts as the root orchestrator, managing global state (theme, progress) via `StateManager`.
- **Styling**: heavily relies on CSS Variables (`--book-*`) defined in `src/styles/variables.css` and theme files.

## Component Pattern

When creating or modifying components in `src/components/`:

1.  **Inheritance**: Extend `BaseCustomElement`.
2.  **Attributes**: Define `static get observedAttributes()` for reactive props.
3.  **Reactivity**: Implement `attributeChangedCallback(name, oldValue, newValue)` to trigger updates.
4.  **Rendering**: Use a `render()` method to update `this.style` or child elements.
    - _Example_: See `src/components/BookParagraph.js` for simple styling updates.
    - _Example_: See `src/components/BookQuote.js` for conditional rendering based on attributes.
5.  **Naming**: Use `book-` prefix for all components (e.g., `book-chapter`, `book-image`), except the root `web-book`.

## Development Workflow

- **Dev Server**: `npm run dev` starts Vite for the sandbox (`sandbox/index.html`).
- **Build**: `npm run build` uses Rollup to generate `dist/` (IIFE, ESM, CSS).
- **Linting**: `npm run lint` (ESLint) and `npm run format` (Prettier).
- **Testing**: Currently manual verification via `sandbox/index.html`.

## Key Conventions

- **No Frameworks**: Do not import React, Vue, or Lit. Use native `HTMLElement` APIs.
- **CSS Variables**: Use variables for all themable properties (colors, fonts, spacing).
- **Exports**: Ensure all new components are exported in `src/components/index.js` and `src/index.js`.
- **Attributes**: Use kebab-case for attributes (e.g., `save-position`) and handle type conversion manually or via helper methods.

## File Structure

- `src/core/`: Base classes and managers (`CustomElement.js`, `StateManager.js`).
- `src/components/`: Individual web components.
- `src/styles/`: CSS files (base, variables, themes).
- `sandbox/`: HTML file for testing components during development.
