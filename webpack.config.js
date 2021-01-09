const path = require("path");
const glob = require("glob");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require("vue-loader");

const IS_DEVELOPMENT = true;

const WOLA_SOUNDS_COVERS_CWD = "./src/components/pages/wola-retro-page/assets/";
const DIST_ASSETS_PATH = "./assets/";

module.exports = {
  mode: IS_DEVELOPMENT ? "development" : "production",
  entry: glob.sync("./src/main.mjs"),
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
  },
  resolve: {
    alias: {
      Modules:  path.resolve(__dirname, "src/modules/"),
      Pages:    path.resolve(__dirname, "src/components/pages/"),
      Assets:   path.resolve(__dirname, "src/assets/"),
      Services: path.resolve(__dirname, "src/services/"),
      Utils:    path.resolve(__dirname, "src/utils/"),
      Src:      path.resolve(__dirname, "src/"),
      LocalComponents: "./local-components/"
      // vue$:     "vue/dist/vue.esm.js"
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      Vue: [require.resolve('vue/dist/vue.esm.js'), "default"]
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
    new VueLoaderPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader"
      },
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
        // test: /\.css$/i,
        // use: [MiniCssExtractPlugin.loader, "css-loader"],
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        // use: ['MiniCssExtractPlugin.loader', 'css-loader', 'sass-loader'],
        // use: ['style-loader', 'css-loader', 'sass-loader'],
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
