import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import css from 'rollup-plugin-css-only';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/web-book.js',
      format: 'iife',
      name: 'WebBook',
      sourcemap: true,
    },
    {
      file: 'dist/web-book.esm.js',
      format: 'es',
      sourcemap: true,
    },
    {
      file: 'dist/web-book.min.js',
      format: 'iife',
      name: 'WebBook',
      plugins: [terser()],
      sourcemap: true,
    },
  ],
  plugins: [resolve(), css({ output: 'web-book.css' })],
};
