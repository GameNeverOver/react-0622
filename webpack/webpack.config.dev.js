const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const webpack = require('webpack');

const appSrc = path.resolve(__dirname, '../src');
const appDist = path.resolve(__dirname, '../dist');
const appPublic = path.resolve(__dirname, '../public');
const appIndex = path.resolve(appSrc, 'index.js');
const appHtml = path.resolve(appPublic, 'index.html');
const autoprefixer = require('autoprefixer');
module.exports = {
    entry: appIndex,
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: appPublic,
        hot: true,
        host: 'localhost',
        port: 8090,
        historyApiFallback: true,
        // 是否将错误展示在浏览器蒙层
        overlay: true,
        inline: true,
        // 打印信息
        stats: 'errors-only',
        // 设置代理
        proxy: {
            '/api': {
                changeOrigin: true,
                target: 'https://easy-mock.com/mock/5c2dc9665cfaa5209116fa40/example',
                pathRewrite: {
                    '^/api/': '/'
                }
            }
        }
    },
    output: {
        filename: 'public/js/[name].[hash:8].js',
        path: appDist,
        publicPath: '/'
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: appHtml,
            filename: 'index.html'
        }),
        new FriendlyErrorsWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                // loader: 'babel-loader?cacheDirectory',
                use: [
                    {
                        loader: 'babel-loader?cacheDirectory',
                    }
                ],
                enforce: "pre", // 编译前检查
                include: [ appSrc ],
                exclude: /node_modules/,
            },
            {
                test: /\.(css|less)$/,
                exclude: /node_modules/,
                use: [{
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            modules: true,
                            localIdentName: '[local].[hash:8]'
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [autoprefixer()]
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true
                        }
                    }
                ]
            },
            {
                test: /\.(css|less)$/,
                include: /node_modules/,
                use: [{
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {}
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [autoprefixer()]
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true
                             } 
                            // javascriptEnabled: true
                        }
                    }
                ]
            },
            // 解析图片资源
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            // 解析 字体
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            // 解析数据资源
            {
                test: /\.(csv|tsv)$/,
                use: [
                    'csv-loader'
                ]
            },
            // 解析数据资源
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            },
            // 解析 MakeDown 文件
            {
                test: /\.md$/,
                use: [
                    'html-loader',
                    'markdown-loader'
                ]
            },
            {
                test: /\.(js|mjs|jsx|ts|tsx)$/,
                enforce: 'pre',
                loader: 'eslint-loader',
                include: /src/
            }
        ]
    },
    resolve: {
        alias: {
            src: appSrc,
            utils: path.resolve(__dirname, '../src/utils'),
            pages: path.resolve(__dirname, '../src/pages'),
            components: path.resolve(__dirname, '../src/components')
        },
        modules: [path.resolve(__dirname, '../node_modules')],
    }
}
