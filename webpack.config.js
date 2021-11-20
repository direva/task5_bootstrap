const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const StylelintPlugin = require('stylelint-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path')
module.exports = {
  target: 'web',
  entry: path.resolve(__dirname, 'src/main.css'),
  output: {
    path: path.resolve(__dirname, 'public_html')
  },  
  module: {
    rules: [
      {
        test: /.s?css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      }
    ],
  },
  optimization: {
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      // `...`,
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [new MiniCssExtractPlugin(), new StylelintPlugin({
    configFile: path.resolve(__dirname, 'stylelint.config.js'),
    context: path.resolve(__dirname, './src/'),
    files: '**/*.css',
  }),
  new CopyPlugin({
    patterns: [
      { from: "src/img", to: "img" },
      { from: "src/index.html", to: "index.html" },
    ],
  }),
],
};