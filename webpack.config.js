const path = require('path');

module.exports = {
  entry: './src/CommentWidget.js',  // Entry point to your component
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
    extensions: ['.js', '.jsx'],
  },
  mode: 'production',
};
