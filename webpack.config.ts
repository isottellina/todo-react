import { join, resolve } from 'path';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
const baseDir = resolve(__dirname)

import { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';

export interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration
}

const htmlPlugin = new HtmlWebPackPlugin({
  filename: './index.html',
  template: './static/index.html',
});

const cssPlugin = new MiniCssExtractPlugin();

const port = Number(process.env.PORT) || 8080

export const config: Configuration = {
  devServer: {
    compress: true,
    hot: false,
    liveReload: false,
    port,
    static: {
      directory: join(baseDir, 'dist/src'),
    },
  },
  entry: resolve(baseDir, 'src', 'index.tsx'),
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: [
          { loader: 'babel-loader' },
          { loader: 'ts-loader' },
        ],
      },
      {
        loader: 'file-loader',
        options: {
          esModule: false,
          name: 'assets/images/[name].[ext]',
        },
        test: /\.(png|jpg|gif|ico|svg)$/,
      },
      {
        test: /\.s[sc]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
      {
        exclude: /node_modules/,
        test: /\.ttf$/,
        use: { loader: 'file-loader?name=assets/fonts/[name].[ext]' },
      },
    ],
  },
  output: {
    filename: 'index.js',
    path: resolve(baseDir, 'dist/'),
    publicPath: '/',
  },
  plugins: [htmlPlugin, cssPlugin],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: ['src', 'node_modules'],
  },
}

export default config
