const path = require('path');

module.exports = {
  entry: './src/CommentWidget.tsx',  // Entry point to your TypeScript component
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    library: 'CommentWidget',       // Name of your library
    libraryTarget: 'umd',           // Universal module definition for compatibility
    globalObject: 'this',           // Ensures compatibility for Node.js
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,        // For TypeScript and TSX files
        exclude: /node_modules/,
        use: 'ts-loader',           // Use ts-loader for transpiling TypeScript
      },
      {
        test: /\.(js|jsx)$/,        // For JavaScript and JSX files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'React',                // Externalize React to avoid bundling it
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
      root: 'ReactDOM',             // Externalize ReactDOM to avoid bundling it
    },
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],  // Support TypeScript and JavaScript extensions
  },
  mode: 'production',
};
