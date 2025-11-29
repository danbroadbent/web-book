# Web Book API Documentation

## Overview

The Web Book library provides a set of custom HTML elements (Web Components) for creating rich, interactive book and magazine content in web browsers. This declarative API allows you to structure your content semantically while the library handles layout, pagination, and responsive behavior automatically.

## Quick Start

```html
<web-book>
  <book-chapter title="Getting Started">
    <book-paragraph>Your content here...</book-paragraph>
  </book-chapter>
</web-book>
```

---

## Core Elements

### `<web-book>`

The root container element for all book content. Every web book must be wrapped in this element.

#### Attributes

| Attribute           | Type      | Default    | Description                                                                |
| ------------------- | --------- | ---------- | -------------------------------------------------------------------------- |
| `mode`              | `string`  | `"scroll"` | Navigation mode: `"scroll"`, `"page"`, or `"hybrid"`                       |
| `theme`             | `string`  | `"light"`  | Color theme: `"light"`, `"dark"`, `"sepia"`, or custom theme name          |
| `font-family`       | `string`  | `"serif"`  | Font family: `"serif"`, `"sans-serif"`, `"monospace"`, or custom font name |
| `font-size`         | `string`  | `"16px"`   | Base font size (px, em, rem)                                               |
| `line-height`       | `number`  | `1.6`      | Line height multiplier                                                     |
| `text-align`        | `string`  | `"left"`   | Text alignment: `"left"`, `"right"`, `"center"`, `"justify"`               |
| `columns`           | `number`  | `1`        | Number of text columns (for multi-column layouts)                          |
| `max-width`         | `string`  | `"800px"`  | Maximum content width                                                      |
| `language`          | `string`  | `"en"`     | Content language (ISO 639-1 code)                                          |
| `reading-direction` | `string`  | `"ltr"`    | Reading direction: `"ltr"` or `"rtl"`                                      |
| `save-position`     | `boolean` | `true`     | Automatically save and restore reading position                            |
| `show-progress`     | `boolean` | `true`     | Show reading progress indicator                                            |

#### Methods

```javascript
// Get the web-book element
const book = document.querySelector("web-book");

// Navigation
book.nextPage();
book.previousPage();
book.goToPage(pageNumber);
book.goToChapter(chapterIndex);

// Position
const position = book.getCurrentPosition(); // Returns { chapter, page, percentage }
book.setPosition({ chapter: 0, page: 5 });

// Customization
book.setTheme("dark");
book.setFontSize("18px");
book.setMode("page");

// Reading features
book.addBookmark(position);
book.getBookmarks();
book.removeBookmark(bookmarkId);
```

#### Events

```javascript
book.addEventListener("page-change", (e) => {
  console.log("Current page:", e.detail.page);
});

book.addEventListener("chapter-change", (e) => {
  console.log("Current chapter:", e.detail.chapter);
});

book.addEventListener("position-change", (e) => {
  console.log("Reading position:", e.detail.position);
});

book.addEventListener("theme-change", (e) => {
  console.log("Theme changed to:", e.detail.theme);
});
```

#### Example

```html
<web-book
  mode="page"
  theme="dark"
  font-size="18px"
  line-height="1.8"
  max-width="700px"
  save-position="true"
>
  <!-- Content here -->
</web-book>
```

---

### `<book-metadata>`

Optional element for defining book metadata. Should be placed at the beginning of the `<web-book>` element.

#### Attributes

| Attribute          | Type     | Default | Description                        |
| ------------------ | -------- | ------- | ---------------------------------- |
| `title`            | `string` | -       | Book title                         |
| `author`           | `string` | -       | Author name(s)                     |
| `isbn`             | `string` | -       | ISBN number                        |
| `publisher`        | `string` | -       | Publisher name                     |
| `publication-date` | `string` | -       | Publication date (ISO 8601 format) |
| `language`         | `string` | -       | Book language                      |
| `cover`            | `string` | -       | URL to cover image                 |
| `description`      | `string` | -       | Book description                   |

#### Example

```html
<web-book>
  <book-metadata
    title="The Great Novel"
    author="Jane Doe"
    isbn="978-3-16-148410-0"
    publisher="Example Press"
    publication-date="2025-01-15"
    cover="cover.jpg"
  >
  </book-metadata>
  <!-- Chapters here -->
</web-book>
```

---

### `<book-chapter>`

Represents a chapter or major section of the book.

#### Attributes

| Attribute      | Type      | Default | Description                                        |
| -------------- | --------- | ------- | -------------------------------------------------- |
| `title`        | `string`  | -       | Chapter title (required)                           |
| `subtitle`     | `string`  | -       | Optional chapter subtitle                          |
| `number`       | `number`  | auto    | Chapter number (auto-incremented if not specified) |
| `id`           | `string`  | -       | Unique identifier for deep linking                 |
| `show-in-toc`  | `boolean` | `true`  | Include in table of contents                       |
| `break-before` | `boolean` | `true`  | Force page break before chapter in page mode       |

#### Example

```html
<book-chapter title="The Beginning" subtitle="A New Adventure" number="1">
  <book-paragraph>It was a dark and stormy night...</book-paragraph>
</book-chapter>
```

---

### `<book-section>`

A subsection within a chapter.

#### Attributes

| Attribute     | Type      | Default | Description                  |
| ------------- | --------- | ------- | ---------------------------- |
| `title`       | `string`  | -       | Section title                |
| `level`       | `number`  | `2`     | Heading level (2-6)          |
| `id`          | `string`  | -       | Unique identifier            |
| `show-in-toc` | `boolean` | `true`  | Include in table of contents |

#### Example

```html
<book-chapter title="Chapter 1">
  <book-section title="Introduction">
    <book-paragraph>Content here...</book-paragraph>
  </book-section>

  <book-section title="Main Content" level="2">
    <book-paragraph>More content...</book-paragraph>
  </book-section>
</book-chapter>
```

---

## Content Elements

### `<book-paragraph>`

Standard paragraph of text.

#### Attributes

| Attribute | Type      | Default | Description                                                  |
| --------- | --------- | ------- | ------------------------------------------------------------ |
| `align`   | `string`  | inherit | Text alignment: `"left"`, `"right"`, `"center"`, `"justify"` |
| `indent`  | `boolean` | `false` | First-line indentation                                       |
| `dropcap` | `boolean` | `false` | Apply drop cap to first letter                               |
| `class`   | `string`  | -       | Custom CSS class                                             |

#### Example

```html
<book-paragraph dropcap="true">
  In the beginning, there was a story waiting to be told.
</book-paragraph>

<book-paragraph align="center"> * * * </book-paragraph>
```

---

### `<book-heading>`

Standalone heading element (for headings not part of chapter/section structure).

#### Attributes

| Attribute | Type     | Default  | Description         |
| --------- | -------- | -------- | ------------------- |
| `level`   | `number` | `2`      | Heading level (1-6) |
| `align`   | `string` | `"left"` | Text alignment      |
| `id`      | `string` | -        | Unique identifier   |

#### Example

```html
<book-heading level="3">Important Note</book-heading>
```

---

### `<book-quote>`

Block quotation element.

#### Attributes

| Attribute     | Type     | Default     | Description                                           |
| ------------- | -------- | ----------- | ----------------------------------------------------- |
| `attribution` | `string` | -           | Quote source/author                                   |
| `cite`        | `string` | -           | URL to quote source                                   |
| `align`       | `string` | `"left"`    | Text alignment                                        |
| `style`       | `string` | `"default"` | Quote style: `"default"`, `"pullquote"`, `"epigraph"` |

#### Example

```html
<book-quote attribution="Albert Einstein" style="pullquote">
  Imagination is more important than knowledge.
</book-quote>
```

---

### `<book-list>`

Ordered or unordered list.

#### Attributes

| Attribute | Type     | Default       | Description                                        |
| --------- | -------- | ------------- | -------------------------------------------------- |
| `type`    | `string` | `"unordered"` | List type: `"ordered"`, `"unordered"`              |
| `marker`  | `string` | auto          | Custom list marker (bullet style or numbering)     |
| `spacing` | `string` | `"normal"`    | Item spacing: `"compact"`, `"normal"`, `"relaxed"` |

#### Child Element: `<book-list-item>`

Each list item should be wrapped in a `<book-list-item>` element.

#### Example

```html
<book-list type="ordered">
  <book-list-item>First item</book-list-item>
  <book-list-item>Second item</book-list-item>
  <book-list-item>Third item</book-list-item>
</book-list>

<book-list type="unordered" marker="→">
  <book-list-item>Custom bullet</book-list-item>
</book-list>
```

---

### `<book-code>`

Code block for technical content.

#### Attributes

| Attribute      | Type      | Default       | Description                                                 |
| -------------- | --------- | ------------- | ----------------------------------------------------------- |
| `language`     | `string`  | `"plaintext"` | Programming language for syntax highlighting                |
| `line-numbers` | `boolean` | `false`       | Show line numbers                                           |
| `highlight`    | `string`  | -             | Comma-separated line numbers to highlight (e.g., "1,3-5,8") |
| `caption`      | `string`  | -             | Code block caption                                          |

#### Example

```html
<book-code
  language="javascript"
  line-numbers="true"
  caption="Hello World Example"
>
  function greet(name) { console.log(`Hello, ${name}!`); }
</book-code>
```

---

## Media Elements

### `<book-image>`

Image element with responsive handling and captions.

#### Attributes

| Attribute | Type      | Default    | Description                                             |
| --------- | --------- | ---------- | ------------------------------------------------------- |
| `src`     | `string`  | -          | Image URL (required)                                    |
| `alt`     | `string`  | -          | Alt text for accessibility (required)                   |
| `caption` | `string`  | -          | Image caption                                           |
| `credit`  | `string`  | -          | Image credit/attribution                                |
| `width`   | `string`  | `"auto"`   | Image width                                             |
| `height`  | `string`  | `"auto"`   | Image height                                            |
| `align`   | `string`  | `"center"` | Image alignment: `"left"`, `"right"`, `"center"`        |
| `size`    | `string`  | `"medium"` | Preset size: `"small"`, `"medium"`, `"large"`, `"full"` |
| `loading` | `string`  | `"lazy"`   | Loading strategy: `"lazy"`, `"eager"`                   |
| `border`  | `boolean` | `false`    | Show border around image                                |
| `shadow`  | `boolean` | `false`    | Add shadow effect                                       |

#### Example

```html
<book-image
  src="illustration.jpg"
  alt="A beautiful landscape"
  caption="Figure 1.2: Mountain vista at sunset"
  credit="Photo by John Smith"
  size="large"
  shadow="true"
>
</book-image>
```

---

### `<book-figure>`

Container for images or other media with integrated caption and numbering.

#### Attributes

| Attribute | Type     | Default    | Description                      |
| --------- | -------- | ---------- | -------------------------------- |
| `id`      | `string` | -          | Unique identifier for references |
| `number`  | `string` | auto       | Figure number (auto-incremented) |
| `align`   | `string` | `"center"` | Figure alignment                 |

#### Child Elements

Should contain a media element (`<book-image>`, `<book-video>`, etc.) and optionally a `<book-caption>`.

#### Example

```html
<book-figure id="fig-diagram">
  <book-image src="diagram.png" alt="System architecture diagram"></book-image>
  <book-caption>Figure 3.1: System Architecture Overview</book-caption>
</book-figure>
```

---

### `<book-video>`

Embedded video player.

#### Attributes

| Attribute  | Type      | Default  | Description                |
| ---------- | --------- | -------- | -------------------------- |
| `src`      | `string`  | -        | Video URL (required)       |
| `poster`   | `string`  | -        | Poster/thumbnail image URL |
| `caption`  | `string`  | -        | Video caption              |
| `width`    | `string`  | `"100%"` | Video width                |
| `height`   | `string`  | `"auto"` | Video height               |
| `controls` | `boolean` | `true`   | Show video controls        |
| `autoplay` | `boolean` | `false`  | Autoplay video             |
| `loop`     | `boolean` | `false`  | Loop video                 |
| `muted`    | `boolean` | `false`  | Mute video by default      |

#### Example

```html
<book-video
  src="tutorial.mp4"
  poster="thumbnail.jpg"
  caption="Tutorial: Getting Started"
  controls="true"
>
</book-video>
```

---

### `<book-audio>`

Embedded audio player.

#### Attributes

| Attribute  | Type      | Default | Description          |
| ---------- | --------- | ------- | -------------------- |
| `src`      | `string`  | -       | Audio URL (required) |
| `caption`  | `string`  | -       | Audio caption        |
| `controls` | `boolean` | `true`  | Show audio controls  |
| `autoplay` | `boolean` | `false` | Autoplay audio       |
| `loop`     | `boolean` | `false` | Loop audio           |

#### Example

```html
<book-audio src="narration.mp3" caption="Chapter 1 Narration"> </book-audio>
```

---

### `<book-embed>`

Generic embed container for iframes or external content.

#### Attributes

| Attribute | Type     | Default    | Description                                 |
| --------- | -------- | ---------- | ------------------------------------------- |
| `src`     | `string` | -          | Embedded content URL                        |
| `type`    | `string` | `"iframe"` | Embed type: `"iframe"`, `"svg"`, `"custom"` |
| `width`   | `string` | `"100%"`   | Embed width                                 |
| `height`  | `string` | `"400px"`  | Embed height                                |
| `caption` | `string` | -          | Embed caption                               |
| `allow`   | `string` | -          | iframe allow attribute                      |
| `sandbox` | `string` | -          | iframe sandbox attribute                    |

#### Example

```html
<book-embed
  src="https://example.com/interactive-map"
  type="iframe"
  height="500px"
  caption="Interactive Map"
>
</book-embed>
```

---

## Interactive Elements

### `<book-aside>`

Sidebar content, notes, or tangential information.

#### Attributes

| Attribute     | Type      | Default    | Description                                                       |
| ------------- | --------- | ---------- | ----------------------------------------------------------------- |
| `type`        | `string`  | `"note"`   | Aside type: `"note"`, `"tip"`, `"warning"`, `"info"`, `"sidebar"` |
| `title`       | `string`  | -          | Aside title                                                       |
| `collapsible` | `boolean` | `false`    | Allow collapsing/expanding                                        |
| `collapsed`   | `boolean` | `false`    | Initially collapsed state                                         |
| `position`    | `string`  | `"inline"` | Position: `"inline"`, `"margin"`, `"float-left"`, `"float-right"` |

#### Example

```html
<book-aside type="tip" title="Pro Tip" collapsible="true">
  <book-paragraph>
    You can speed up this process by using keyboard shortcuts.
  </book-paragraph>
</book-aside>

<book-aside type="warning" title="Important">
  <book-paragraph>
    Make sure to back up your data before proceeding.
  </book-paragraph>
</book-aside>
```

---

### `<book-footnote>`

Footnote reference and content.

#### Attributes

| Attribute | Type     | Default | Description                        |
| --------- | -------- | ------- | ---------------------------------- |
| `id`      | `string` | -       | Unique footnote identifier         |
| `number`  | `number` | auto    | Footnote number (auto-incremented) |

#### Usage

Place `<book-footnote>` inline where the reference should appear. The footnote content goes inside the element.

#### Example

```html
<book-paragraph>
  This is a fact that needs citation<book-footnote id="fn1">
    Source: Example Journal, 2025
  </book-footnote>
  and we can continue the sentence.
</book-paragraph>
```

---

### `<book-tooltip>`

Inline tooltip for definitions or additional context.

#### Attributes

| Attribute    | Type     | Default | Description                                                |
| ------------ | -------- | ------- | ---------------------------------------------------------- |
| `term`       | `string` | -       | Term to display (required)                                 |
| `definition` | `string` | -       | Definition text                                            |
| `position`   | `string` | `"top"` | Tooltip position: `"top"`, `"bottom"`, `"left"`, `"right"` |

#### Example

```html
<book-paragraph>
  The
  <book-tooltip term="protagonist" definition="The main character of a story"
    >protagonist</book-tooltip
  >
  embarked on their journey.
</book-paragraph>
```

---

### `<book-accordion>`

Collapsible accordion section.

#### Attributes

| Attribute | Type      | Default   | Description                               |
| --------- | --------- | --------- | ----------------------------------------- |
| `title`   | `string`  | -         | Accordion header title (required)         |
| `open`    | `boolean` | `false`   | Initially open state                      |
| `icon`    | `string`  | `"arrow"` | Icon style: `"arrow"`, `"plus"`, `"none"` |

#### Example

```html
<book-accordion title="Additional Information" open="true">
  <book-paragraph>
    This content is hidden until the user clicks to expand.
  </book-paragraph>
</book-accordion>
```

---

### `<book-tabs>`

Tabbed content interface.

#### Attributes

| Attribute  | Type     | Default | Description                                            |
| ---------- | -------- | ------- | ------------------------------------------------------ |
| `active`   | `number` | `0`     | Initially active tab index                             |
| `position` | `string` | `"top"` | Tab position: `"top"`, `"bottom"`, `"left"`, `"right"` |

#### Child Element: `<book-tab>`

| Attribute | Type     | Default | Description          |
| --------- | -------- | ------- | -------------------- |
| `title`   | `string` | -       | Tab title (required) |
| `icon`    | `string` | -       | Optional icon        |

#### Example

```html
<book-tabs>
  <book-tab title="Overview">
    <book-paragraph>Overview content here...</book-paragraph>
  </book-tab>

  <book-tab title="Details">
    <book-paragraph>Detailed content here...</book-paragraph>
  </book-tab>

  <book-tab title="Examples">
    <book-code language="javascript">console.log('example');</book-code>
  </book-tab>
</book-tabs>
```

---

## Table Elements

### `<book-table>`

Responsive table element.

#### Attributes

| Attribute    | Type      | Default | Description                                                     |
| ------------ | --------- | ------- | --------------------------------------------------------------- |
| `caption`    | `string`  | -       | Table caption                                                   |
| `striped`    | `boolean` | `false` | Striped row styling                                             |
| `bordered`   | `boolean` | `true`  | Show borders                                                    |
| `hover`      | `boolean` | `false` | Highlight row on hover                                          |
| `responsive` | `boolean` | `true`  | Enable responsive behavior (horizontal scroll on small screens) |
| `sortable`   | `boolean` | `false` | Enable column sorting                                           |

#### Child Elements

- `<book-table-header>`: Table header row
- `<book-table-row>`: Table body row
- `<book-table-cell>`: Table cell (use `header="true"` attribute for header cells)

#### Example

```html
<book-table caption="Sales Data 2025" striped="true" sortable="true">
  <book-table-header>
    <book-table-cell header="true">Quarter</book-table-cell>
    <book-table-cell header="true">Revenue</book-table-cell>
    <book-table-cell header="true">Growth</book-table-cell>
  </book-table-header>

  <book-table-row>
    <book-table-cell>Q1</book-table-cell>
    <book-table-cell>$1.2M</book-table-cell>
    <book-table-cell>15%</book-table-cell>
  </book-table-row>

  <book-table-row>
    <book-table-cell>Q2</book-table-cell>
    <book-table-cell>$1.5M</book-table-cell>
    <book-table-cell>25%</book-table-cell>
  </book-table-row>
</book-table>
```

---

## Special Elements

### `<book-toc>`

Auto-generated table of contents.

#### Attributes

| Attribute     | Type      | Default               | Description                                             |
| ------------- | --------- | --------------------- | ------------------------------------------------------- |
| `title`       | `string`  | `"Table of Contents"` | TOC title                                               |
| `depth`       | `number`  | `2`                   | Maximum heading depth to include (1-6)                  |
| `numbered`    | `boolean` | `true`                | Show chapter/section numbers                            |
| `collapsible` | `boolean` | `false`               | Allow collapsing sections                               |
| `position`    | `string`  | `"start"`             | Position: `"start"`, `"end"`, `"fixed"` (fixed sidebar) |

#### Example

```html
<web-book>
  <book-toc title="Contents" depth="3" collapsible="true"></book-toc>

  <book-chapter title="Chapter 1">
    <!-- Content -->
  </book-chapter>
</web-book>
```

---

### `<book-index>`

Auto-generated index of terms.

#### Attributes

| Attribute      | Type      | Default   | Description         |
| -------------- | --------- | --------- | ------------------- |
| `title`        | `string`  | `"Index"` | Index title         |
| `columns`      | `number`  | `2`       | Number of columns   |
| `alphabetical` | `boolean` | `true`    | Sort alphabetically |

#### Usage

Mark terms in your content with `<book-index-term>`:

```html
<book-paragraph>
  The concept of <book-index-term>object-oriented programming</book-index-term>
  is fundamental to modern software development.
</book-paragraph>

<!-- Later in the book -->
<book-index></book-index>
```

---

### `<book-glossary>`

Glossary of terms and definitions.

#### Attributes

| Attribute      | Type      | Default      | Description         |
| -------------- | --------- | ------------ | ------------------- |
| `title`        | `string`  | `"Glossary"` | Glossary title      |
| `alphabetical` | `boolean` | `true`       | Sort alphabetically |
| `columns`      | `number`  | `1`          | Number of columns   |

#### Child Element: `<book-glossary-term>`

| Attribute | Type     | Default | Description          |
| --------- | -------- | ------- | -------------------- |
| `term`    | `string` | -       | Term name (required) |

#### Example

```html
<book-glossary title="Key Terms">
  <book-glossary-term term="Algorithm">
    A step-by-step procedure for solving a problem or accomplishing a task.
  </book-glossary-term>

  <book-glossary-term term="Variable">
    A named storage location in computer memory that holds a value.
  </book-glossary-term>
</book-glossary>
```

---

### `<book-bibliography>`

Bibliography or references section.

#### Attributes

| Attribute | Type     | Default          | Description                                               |
| --------- | -------- | ---------------- | --------------------------------------------------------- |
| `title`   | `string` | `"Bibliography"` | Bibliography title                                        |
| `style`   | `string` | `"apa"`          | Citation style: `"apa"`, `"mla"`, `"chicago"`, `"custom"` |

#### Child Element: `<book-citation>`

| Attribute   | Type     | Default | Description                |
| ----------- | -------- | ------- | -------------------------- |
| `id`        | `string` | -       | Unique citation identifier |
| `author`    | `string` | -       | Author(s)                  |
| `title`     | `string` | -       | Work title                 |
| `year`      | `string` | -       | Publication year           |
| `publisher` | `string` | -       | Publisher                  |
| `url`       | `string` | -       | URL (for online sources)   |

#### Example

```html
<book-bibliography title="References" style="apa">
  <book-citation
    id="smith2025"
    author="Smith, J."
    title="Modern Web Development"
    year="2025"
    publisher="Tech Press"
  >
  </book-citation>
</book-bibliography>

<!-- Reference in text -->
<book-paragraph>
  According to recent research <book-cite ref="smith2025"></book-cite>, web
  components are becoming mainstream.
</book-paragraph>
```

---

### `<book-page-break>`

Force a page break (in page mode).

#### Attributes

| Attribute | Type     | Default  | Description                                     |
| --------- | -------- | -------- | ----------------------------------------------- |
| `type`    | `string` | `"auto"` | Break type: `"auto"`, `"always"`, `"page"` only |

#### Example

```html
<book-paragraph>End of section.</book-paragraph>
<book-page-break></book-page-break>
<book-paragraph>Start of new section.</book-paragraph>
```

---

### `<book-separator>`

Visual separator or scene break.

#### Attributes

| Attribute | Type     | Default     | Description                                                             |
| --------- | -------- | ----------- | ----------------------------------------------------------------------- |
| `style`   | `string` | `"default"` | Separator style: `"default"`, `"stars"`, `"line"`, `"dots"`, `"custom"` |
| `content` | `string` | `"* * *"`   | Custom separator content                                                |

#### Example

```html
<book-paragraph>End of scene.</book-paragraph>
<book-separator style="stars"></book-separator>
<book-paragraph>New scene begins.</book-paragraph>
```

---

## Text Formatting Elements

### `<book-em>`

Emphasized text (typically italic).

```html
<book-paragraph>This is <book-em>emphasized</book-em> text.</book-paragraph>
```

---

### `<book-strong>`

Strong emphasis (typically bold).

```html
<book-paragraph
  >This is <book-strong>important</book-strong> text.</book-paragraph
>
```

---

### `<book-highlight>`

Highlighted text (user-generated or pre-highlighted).

#### Attributes

| Attribute        | Type      | Default    | Description                         |
| ---------------- | --------- | ---------- | ----------------------------------- |
| `color`          | `string`  | `"yellow"` | Highlight color                     |
| `note`           | `string`  | -          | Optional note attached to highlight |
| `user-generated` | `boolean` | `false`    | Whether highlight is user-created   |

```html
<book-paragraph>
  This <book-highlight color="yellow">important point</book-highlight> should be
  noted.
</book-paragraph>
```

---

### `<book-link>`

Hyperlink (internal or external).

#### Attributes

| Attribute | Type     | Default  | Description                                                                |
| --------- | -------- | -------- | -------------------------------------------------------------------------- |
| `href`    | `string` | -        | Link URL or internal reference                                             |
| `target`  | `string` | -        | Link target (e.g., `"_blank"`)                                             |
| `type`    | `string` | `"auto"` | Link type: `"auto"`, `"internal"`, `"external"`, `"chapter"`, `"footnote"` |

```html
<book-paragraph>
  See <book-link href="#chapter-2" type="chapter">Chapter 2</book-link> for more
  details. Visit
  <book-link href="https://example.com" target="_blank" type="external"
    >our website</book-link
  >.
</book-paragraph>
```

---

## Configuration & Customization

### JavaScript API

```javascript
// Initialize with custom configuration
const book = document.querySelector("web-book");

book.configure({
  theme: "dark",
  fontSize: "18px",
  lineHeight: 1.8,
  fontFamily: "Georgia, serif",
  mode: "page",
  enableHighlighting: true,
  enableBookmarks: true,
  savePosition: true,
  analytics: {
    trackReadingTime: true,
    trackProgress: true,
  },
});

// Listen for user interactions
book.addEventListener("highlight-created", (e) => {
  console.log("User highlighted:", e.detail.text);
  // Save to backend
});

book.addEventListener("bookmark-added", (e) => {
  console.log("Bookmark added:", e.detail.position);
});

// Custom themes
book.addTheme("ocean", {
  background: "#0a1929",
  text: "#b8c5d6",
  accent: "#3ea8ff",
  link: "#5eb3ff",
});
```

---

### CSS Custom Properties

All elements can be styled using CSS custom properties:

```css
web-book {
  --book-font-family: "Merriweather", serif;
  --book-font-size: 18px;
  --book-line-height: 1.8;
  --book-text-color: #1a1a1a;
  --book-background: #fefefe;
  --book-link-color: #0066cc;
  --book-accent-color: #ff6b6b;
  --book-max-width: 750px;
  --book-padding: 2rem;
  --book-heading-font: "Playfair Display", serif;
}
```

---

## Complete Example

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Web Book</title>
    <script type="module" src="web-book.js"></script>
  </head>
  <body>
    <web-book mode="page" theme="light" font-size="17px" save-position="true">
      <book-metadata
        title="The Art of Web Development"
        author="Jane Developer"
        publisher="Tech Press"
      >
      </book-metadata>

      <book-toc title="Contents" depth="2"></book-toc>

      <book-chapter title="Introduction" number="1">
        <book-paragraph dropcap="true">
          Welcome to the world of modern web development. In this book, we'll
          explore the latest techniques and best practices.
        </book-paragraph>

        <book-section title="What You'll Learn">
          <book-list type="ordered">
            <book-list-item>Web Components fundamentals</book-list-item>
            <book-list-item>Responsive design patterns</book-list-item>
            <book-list-item>Performance optimization</book-list-item>
          </book-list>
        </book-section>

        <book-aside type="tip" title="Getting Started">
          <book-paragraph>
            Make sure you have a modern browser installed before proceeding.
          </book-paragraph>
        </book-aside>
      </book-chapter>

      <book-chapter title="Core Concepts" number="2">
        <book-paragraph>
          Let's dive into the core concepts that power modern web applications.
        </book-paragraph>

        <book-figure id="fig-architecture">
          <book-image
            src="architecture.png"
            alt="System architecture diagram"
            size="large"
          >
          </book-image>
          <book-caption>Figure 2.1: Application Architecture</book-caption>
        </book-figure>

        <book-code language="javascript" line-numbers="true">
          class WebComponent extends HTMLElement { connectedCallback() {
          this.render(); } render() { this.innerHTML = '
          <p>Hello, World!</p>
          '; } }
        </book-code>
      </book-chapter>

      <book-glossary title="Key Terms">
        <book-glossary-term term="Web Component">
          A reusable custom element built with web standards.
        </book-glossary-term>
      </book-glossary>
    </web-book>

    <script>
      const book = document.querySelector("web-book");

      // Customize on load
      book.addEventListener("book-ready", () => {
        console.log("Book loaded successfully!");
      });
    </script>
  </body>
</html>
```

---

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

For older browsers, consider using polyfills for Web Components.

---

## License

This documentation is for the Web Book library, an open-source project under development.

---

## Contributing

We welcome contributions! Please see the contributing guidelines in the main repository.
