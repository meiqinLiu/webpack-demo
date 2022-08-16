const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    output: {
        // path: path.resolve(__dirname,'../dist'),
        filename: undefined,
        // clean: true,
    },
    module: {
        rules: [
           {
            test: /\.(css|less)$/,
            use: [
              { loader: "style-loader" },
              { loader: "css-loader" },
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
    ],
    devServer: {
        host: 'localhost',
        port: 8080,
        open: true,
    },
    devtool: 'cheap-module-source-map', // 开发模式下使用
    mode: 'development',
}