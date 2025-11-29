# Contributing to Web Book

Thank you for your interest in contributing to Web Book! We welcome contributions from the community to help make this library better.

## Getting Started

1.  **Fork the repository** on GitHub.
2.  **Clone your fork** locally:
    ```bash
    git clone https://github.com/YOUR_USERNAME/web-book.git
    cd web-book
    ```
3.  **Install dependencies**:
    ```bash
    npm install
    ```

## Development Workflow

We use standard web technologies (Vanilla JS, CSS) and avoid frameworks for the core library.

- **Start the development server**:

  ```bash
  npm run dev
  ```

  This will start Vite and serve the `sandbox/index.html` file where you can test your changes.

- **Build the project**:

  ```bash
  npm run build
  ```

  This generates the production files in the `dist/` directory.

- **Linting**:

  ```bash
  npm run lint
  ```

  Please ensure your code passes the linting checks before submitting a PR.

- **Formatting**:
  ```bash
  npm run format
  ```
  We use Prettier to format code.

## Project Structure

- `src/core/`: Base classes and managers.
- `src/components/`: Individual web components.
- `src/styles/`: CSS files (base, variables, themes).
- `sandbox/`: HTML file for testing components during development.

## Guidelines

- **No Frameworks**: Do not import React, Vue, or Lit. Use native `HTMLElement` APIs.
- **CSS Variables**: Use variables for all themable properties.
- **Naming**: Use `book-` prefix for all components.
- **Commits**: Please write clear and concise commit messages.

## Pull Requests

1.  Create a new branch for your feature or fix.
2.  Make your changes.
3.  Run `npm run lint` and `npm run format`.
4.  Push your branch and open a Pull Request against the `main` branch.
5.  Describe your changes and why they are needed.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
