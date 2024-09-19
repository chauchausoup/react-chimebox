import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';

export default {
  input: 'index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs',
    exports: 'named',
  },
  plugins: [
    resolve(),
    commonjs(),
    babel({
      exclude: 'node_modules/**', // Only transpile our source code
      babelHelpers: 'bundled',
      presets: ['@babel/preset-react'], // Add the React preset for JSX
    }),
  ],
  external: ['react', 'react-dom'], // Exclude React from the bundle
};
