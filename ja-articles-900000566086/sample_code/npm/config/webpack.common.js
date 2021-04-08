const { resolve } = require('path')
const isDev = process.env.NODE_ENV !== 'production'
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const cssLoaders = (preNumber) => [
  isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
  {
    loader: 'css-loader',
    options: {
      sourceMap: isDev,
      importLoaders: preNumber + 1,
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: [
          'postcss-flexbugs-fixes',
          [
            'postcss-preset-env',
            {
              autoprefixer: {
                grid: true,
                flexbox: 'no-2009',
              },
            },
          ],
          'postcss-normalize',
        ],
      },
      sourceMap: isDev,
    },
  },
]

module.exports = {
  target: isDev ? 'web' : 'browserslist',
  entry: {
    app: resolve(__dirname, '../src/index.js'),
  },
  output: {
    filename: `js/[name]${isDev ? '' : '.[contenthash:8]'}.js`,
    path: resolve(__dirname, '../dist'),
  },
  resolve: {
    extensions: ['.js', '.json'],
  },
  plugins: [
  ],
  module: {
    rules: [
      {
        test: /.js$/,
        loader: 'babel-loader',
        options: { cacheDirectory: true },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: cssLoaders(0),
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
        use: 'url-loader',
      },
      {
        test: /\.(ttf|woff|woff2|eot|otf)$/,
        use: 'url-loader',
      },
    ],
  },
}
