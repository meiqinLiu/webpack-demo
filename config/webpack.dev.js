const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const threads = require('os').cpus().length -1; // 电脑cup数量-1

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
                use: [
                   {
                    loader: 'thread-loader',
                    options: {
                        workers: threads, // 进程数量
                    }
                   },
                   {
                    loader: 'babel-loader', // 耗时的 loader使用多线程 （例如 babel-loader）
                    options: {
                      // presets: ['@babel/preset-env'], // 配置到bebel.config.js文件里
                      cacheDirectory: true, // babel缓存
                      cacheCompression: false, // 压缩
                    }
                  }
                ]
              }
        ]
    },
    plugins: [
        new ESLintPlugin({
            context: path.resolve(__dirname,'../src'),
            exclude: 'node_modules', // 默认值
            cache: true, // 开启缓存
            cacheLocation: path.resolve(__dirname,'../node_modules/.cache/eslintcache'),
            threads, // 开启多进程和进程数量
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