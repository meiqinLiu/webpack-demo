const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const threads = require('os').cpus().length -1; // 电脑cup数量-1

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
            // 当规则匹配时，只使用第一个匹配规则。
            oneOf: [
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
                    // exclude: /(node_modules|bower_components)/, // 不处理某些文件
                    include: path.resolve(__dirname,'../src'), // 只处理某些文件
                    use: [
                      {
                       loader: 'thread-loader',  // 耗时的 loader使用多线程 （例如 babel-loader）
                       options: {
                           workers: threads, // 进程数量
                       }
                      },
                      {
                       loader: 'babel-loader',
                       options: {
                         // presets: ['@babel/preset-env'], // 配置到bebel.config.js文件里
                         cacheDirectory: true, // babel缓存
                         cacheCompression: false, // 压缩
                         plugins: ['@babel/plugin-transform-runtime'] // 使所有辅助代码从这里引用
                       }
                     }
                   ]
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
        new MiniCssExtractPlugin({
            filename: 'static/css/mystyle.css'
        }),
       
    ],
    optimization: {
      minimize: true,
      // 压缩的操作
      minimizer: [
        // 压缩css
        new CssMinimizerWebpackPlugin(),
        // 压缩js，生产环境默认开启，因为多线程，所以手动配置
        new TerserPlugin({
          parallel: threads,
        }),
      ],
    },
    devServer: {
        host: 'localhost',
        port: 8080,
        open: true,
    },
    devtool: 'source-map', // 生产模式下使用，会额外生存源代码的映射文件
    mode: 'production',
}