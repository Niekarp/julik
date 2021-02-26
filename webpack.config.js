const path = require("path");
const glob = require("glob");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require("vue-loader");
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const IS_DEVELOPMENT = true;

const WOLA_SOUNDS_COVERS_CWD = "./src/components/pages/wola-retro-page/assets/";
const JULIK_AVATARS_PATH = "./src/components/pages/julik-page/local-components/dog-picture-dialog/assets/avatars/";
const DIST_ASSETS_PATH = "./assets/";

module.exports = {
  mode: IS_DEVELOPMENT ? "development" : "production",
  entry: glob.sync("./src/main.ts"),
  devtool: "inline-source-map",
  devServer: {
    // TODO: consider using contentBase to seve assets
    publicPath: "/",
  },
  resolve: {
    alias: {
      "@":           path.resolve(__dirname, "src/"),
      "@Modules":    path.resolve(__dirname, "src/modules/"),
      "@Components": path.resolve(__dirname, "src/components/"),
      "@Pages":      path.resolve(__dirname, "src/components/pages"),
      "@Assets":     path.resolve(__dirname, "src/assets/"),
      "@Services":   path.resolve(__dirname, "src/services/"),
      "@Utils":      path.resolve(__dirname, "src/utils/"),
      "@LocalComponents": "./local-components/",
      'jquery-ui':   'jquery-ui-dist/jquery-ui.js',
      'touch-punch': 'jquery-ui-touch-punch/jquery.ui.touch-punch.min.js'
    },
    plugins: [new TsconfigPathsPlugin()],
    extensions: [ '.ts', '.tsx', '.js', ".vue" ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new webpack.ProvidePlugin({
      $:      "jquery",
      jQuery: "jquery",
    }),
    new webpack.DefinePlugin({
      LAST_UPDATE_DATE: JSON.stringify(require("./package.json").lastReleaseDate),
      DEV: JSON.stringify(IS_DEVELOPMENT),
      ASSETS_PATH: JSON.stringify(DIST_ASSETS_PATH),
      WOLA_SOUNDS_OLAF: JSON.stringify(glob.sync("./*", { cwd: WOLA_SOUNDS_COVERS_CWD + "olaf/" + "sounds/" })),
      WOLA_COVERS_OLAF: JSON.stringify(glob.sync("./*", { cwd: WOLA_SOUNDS_COVERS_CWD + "olaf/" + "covers/" })),
      WOLA_SOUNDS_OLO:  JSON.stringify(glob.sync("./*", { cwd: WOLA_SOUNDS_COVERS_CWD + "olo/"  + "sounds/" })),
      WOLA_COVERS_OLO:  JSON.stringify(glob.sync("./*", { cwd: WOLA_SOUNDS_COVERS_CWD + "olo/"  + "covers/" })),
      JULIK_AVATARS:    JSON.stringify(glob.sync("./*", { cwd: JULIK_AVATARS_PATH }))
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: WOLA_SOUNDS_COVERS_CWD + "olaf/" + "sounds/", to: DIST_ASSETS_PATH },
        { from: WOLA_SOUNDS_COVERS_CWD + "olaf/" + "covers/", to: DIST_ASSETS_PATH },
        { from: WOLA_SOUNDS_COVERS_CWD + "olo/"  + "sounds/", to: DIST_ASSETS_PATH },
        { from: WOLA_SOUNDS_COVERS_CWD + "olo/"  + "covers/", to: DIST_ASSETS_PATH },
        { from: JULIK_AVATARS_PATH, to: DIST_ASSETS_PATH }
      ],
    }),
    new VueLoaderPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.tsx?$/,
        use: [{
          loader: 'ts-loader',
          options: { appendTsSuffixTo: [/\.vue$/] }
        }],
        exclude: /node_modules/,
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          attributes: {
            list: [
              {
                tag: 'link',
                attribute: 'href',
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
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
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
        test: /\.(mp3|mp4|m4a|wav|aif)$/i,
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
