const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname,'../dist'),
        filename: 'static/js/main.js',
        clean: true,
    },
    module: {
        rules: [
           {
            test: /\.(css|less)$/,
            use: [
              MiniCssExtractPlugin.loader,
            //   { loader: "style-loader" },
              { loader: "css-loader" },
            //   css兼容性设置，要配置兼容到的浏览器版本
              {
                loader: "postcss-loader",
                options: {
                  postcssOptions: {
                    plugins: [
                      [
                        "postcss-preset-env",
                      ],
                    ],
                  },
                },
              },
              { loader: "less-loader" },
            ]
           },
           {
                test: /\.(png|svg|jpe?g|gif)$/,  
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                    maxSize: 20 * 1024 // 4kb
                    }
                },
                // 资源的输入
                generator: {
                    filename: 'static/images/[hash][ext]',
                }
            },
           {
                test: /\.(ttf|woff2?|mp3|mp4|avi)$/,  
                type: 'asset/resource',
                // 资源的输入
                generator: {
                    filename: 'static/font/[hash][ext]',
                }
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                //   options: {
                //     presets: ['@babel/preset-env']
                //   }
                }
              }
        ]
    },
    plugins: [
        new ESLintPlugin({
            context: path.resolve(__dirname,'../src')
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html')
        }),
        new MiniCssExtractPlugin({
            filename: 'static/css/mystyle.css'
        }),
        new CssMinimizerWebpackPlugin(),
    ],
    devServer: {
        host: 'localhost',
        port: 8080,
        open: true,
    },
    devtool: 'source-map', // 生产模式下使用，会额外生存源代码的映射文件
    mode: 'production',
}