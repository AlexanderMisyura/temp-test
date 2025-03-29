import 'webpack-dev-server';

import path from 'node:path';

import EslintPlugin from 'eslint-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import StylelintPlugin from 'stylelint-webpack-plugin';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import webpack from 'webpack';

const { dirname } = import.meta;
const BASE_PATH = '/temp-test/task-name/';
const ZERO_SEGMENTS_TO_KEEP = 0;
const TWO_SEGMENTS_TO_KEEP = 2;

const config = (environment: {
  production?: boolean;
}): webpack.Configuration => {
  const isDevelopment = !environment.production;

  return {
    entry: path.resolve(dirname, './src/index.ts'),
    devtool: 'source-map',
    mode: isDevelopment ? 'development' : 'production',

    devServer: {
      historyApiFallback: true,
      client: { overlay: { warnings: false } },
    },

    optimization: {
      minimize: false,
    },

    resolve: {
      extensions: ['.ts', '.js'],
      plugins: [new TsconfigPathsPlugin()],
    },

    output: {
      publicPath: isDevelopment ? '/' : BASE_PATH,
      filename: 'index.js',
      path: path.resolve(dirname, './dist'),
      assetModuleFilename: 'assets[name][est][query]',
      clean: true,
    },

    module: {
      rules: [
        {
          test: /\.(?:wav|mp3)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/audio/[hash][ext][query]',
          },
        },
        {
          test: /\.svg$/,
          loader: 'svg-sprite-loader',
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/img/[hash][ext][query]',
          },
        },
        {
          test: /\.woff2$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/fonts/[hash][ext][query]',
          },
        },
        {
          test: /\.(sa|sc|c)ss$/,
          exclude: /\.module\.(sa|sc|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: { sourceMap: true },
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: true },
            },
          ],
        },
        {
          test: /\.module\.(sa|sc|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: {
                  exportLocalsConvention: 'camel-case-only',
                  localIdentName: isDevelopment
                    ? '[local]_[hash:base64:8]'
                    : '[hash:base64:8]',
                },
              },
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: true },
            },
          ],
        },
        { test: /\.ts$/i, use: 'ts-loader' },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        base: isDevelopment ? '/' : BASE_PATH,
        title: 'Async Race',
        filename: 'index.html',
        favicon: './public/favicon.ico',
        template: './src/index.html',
      }),
      new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
      new EslintPlugin({ configType: 'flat', extensions: 'ts' }),
      new StylelintPlugin(),
      new webpack.DefinePlugin({
        PATH_SEGMENTS_TO_KEEP: JSON.stringify(
          isDevelopment ? ZERO_SEGMENTS_TO_KEEP : TWO_SEGMENTS_TO_KEEP
        ),
      }),
    ],
  };
};

export default config;
