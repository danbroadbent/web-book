# Web Book Library

A vanilla JavaScript library for beautiful, responsive book reading experiences on the web.

## Overview

The Web Book library provides a set of custom HTML elements (Web Components) for creating rich, interactive book and magazine content in web browsers. This declarative API allows you to structure your content semantically while the library handles layout, pagination, and responsive behavior automatically.

## Features

- **Zero Layout Shift:** Content loads stable without jumping.
- **Smooth Scrolling:** Optimized for performance.
- **Theme Switching:** Light, Dark, and Sepia modes.
- **Position Restoration:** Automatically saves and restores reading position.
- **Customizable:** Adjustable font size and family.

## Available Components

### Core

- `<web-book>`: The root container.

### Structure

- `<book-metadata>`: Book cover and metadata.
- `<book-chapter>`: Chapter container.
- `<book-section>`: Section container.
- `<book-heading>`: Headings (levels 1-6).

### Text

- `<book-paragraph>`: Standard paragraph with dropcap support.
- `<book-quote>`: Blockquotes (pullquote, epigraph).
- `<book-list>`: Ordered and unordered lists.
- `<book-code>`: Code blocks with captions.

### Media

- `<book-image>`: Responsive images with captions.
- `<book-figure>`: Figures with captions.
- `<book-video>`: HTML5 video wrapper.
- `<book-audio>`: HTML5 audio wrapper.
- `<book-embed>`: Iframes and embeds.

### Interactive

- `<book-aside>`: Sidebars and notes (tip, warning, info).
- `<book-footnote>`: Inline footnotes.
- `<book-tooltip>`: Inline tooltips.
- `<book-accordion>`: Collapsible sections.

## Installation

```bash
npm install @web-book/core
```

## Usage

```html
<script type="module" src="dist/web-book.esm.js"></script>

<web-book theme="light" font-size="18px">
  <book-chapter title="Chapter 1">
    <book-paragraph> It was a dark and stormy night... </book-paragraph>
  </book-chapter>
</web-book>
```

## Documentation

- [API Documentation](docs/API.md)

## Development

For detailed instructions on how to contribute, please see [CONTRIBUTING.md](CONTRIBUTING.md).

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start development server:

   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## License

MIT
