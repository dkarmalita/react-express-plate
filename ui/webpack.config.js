const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const pkg = require('./package.json');

module.exports = (env, argv) => {
  const isProduction = () => argv.mode === 'production';
  const filename = `[name]${isProduction() ? '.[contenthash].js' : '.js'}`;

  return {
    entry: {
      main: './src/index.jsx',
    },

    output: {
      filename,
      clean: true,
      path: path.resolve(__dirname, '../dist'),
    },

    target: 'web',

    devtool: (isProduction() ? false : 'eval-cheap-source-map'),

    module: {
      rules: [
        {
          test: /.s?css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
        {
          test: /.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
        {
          test: /.m?js[x]$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
              ],
            },
          },
        },
      ],
    },

    plugins: [
      new MiniCssExtractPlugin(),
      new HtmlWebpackPlugin({
        title: `${pkg.name} - ${pkg.version}`,
        template: './src/index.ejs',
      }),
      new CompressionPlugin({
        threshold: 8192,
      }),
    ],

    resolve: {
      extensions: [
        '.js',
        '.jsx',
        '.scss',
      ],
    },

    devServer: {
      contentBase: '../dist',
      hot: true,
      proxy: [
        {
          context: [
            '/api/v1',
          ],
          changeOrigin: true,
          target: 'http://localhost:8081',
          secure: true,
        },
        {
          context: [
            '/posts',
            '/comments',
            '/albums',
            '/photos',
            '/todos',
            '/users',
          ],
          changeOrigin: true,
          target: 'https://jsonplaceholder.typicode.com',
          secure: true,
        },
      ],
    },
  };
};
