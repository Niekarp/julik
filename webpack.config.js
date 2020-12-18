const path = require("path");
const glob = require("glob");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const IS_DEVELOPMENT = true;

const WOLA_SOUNDS_COVERS_CWD = "./src/modules/wola-retro-mode/assets/";
const DIST_ASSETS_PATH = "./assets/";

module.exports = {
  mode: IS_DEVELOPMENT ? "development" : "production",
  entry: glob.sync("./src/**/*.mjs"),
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
  },
  resolve: {
    alias: {
      Modules: path.resolve(__dirname, 'src/modules/'),
      Services: path.resolve(__dirname, 'src/services/'),
      Utils: path.resolve(__dirname, 'src/utils/'),
      Src: path.resolve(__dirname, 'src/'),
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new webpack.DefinePlugin({
      LAST_UPDATE_DATE: JSON.stringify(require("./package.json").lastReleaseDate),
      DEV: JSON.stringify(IS_DEVELOPMENT),
      ASSETS_PATH: JSON.stringify(DIST_ASSETS_PATH),
      WOLA_SOUNDS: JSON.stringify(glob.sync("./*", { cwd: WOLA_SOUNDS_COVERS_CWD + "sounds/" })),
      WOLA_COVERS: JSON.stringify(glob.sync("./*", { cwd: WOLA_SOUNDS_COVERS_CWD + "covers/" })),
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: WOLA_SOUNDS_COVERS_CWD + "sounds/", to: DIST_ASSETS_PATH },
        { from: WOLA_SOUNDS_COVERS_CWD + "covers/", to: DIST_ASSETS_PATH },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          attributes: {
            list: [
              {
                // Tag name
                tag: 'link',
                // Attribute name
                attribute: 'href',
                // Type of processing, can be `src` or `scrset`
                type: 'src',
              },
              {
                tag: "img",
                attribute: "src",
                type: "src",
              }
            ]
          }
        }
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
        // use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|cur|gif|ico)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'assets/[name].[ext]',
          },
        }],
      },
      {
        test: /\.(mp3|mp4|m4a|wav)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'assets/[name].[ext]',
          },
        }],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'assets/[name].[ext]',
          },
        }],
      },
    ],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "",
  },
};
