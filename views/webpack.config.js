const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // 独立文件存放
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    entry: {
        login: './src/views/login/main',
        system: './src/views/system/main',
        mall: './src/views/mall/main',
        manageSystem: './src/views/manageSystem/main'
    },
    output: {
        path: path.join(__dirname, './'),
        publicPath: '/', // 资源路径
        filename: '[name]/main.js', // 入口js文件名
        chunkFilename: 'chunks/[id].chunk.js' // 路由js命名
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [{
                    loader: 'vue-loader',
                    options: {
                        //https://github.com/ai/browserslist
                        postcss: [require('autoprefixer')({
                            browsers: ['last 99 versions']
                        })],
                        loaders: {
                            css: ExtractTextPlugin.extract({
                                use: [
                                    'css-loader',
                                    'postcss-loader'
                                ],
                                fallback: 'vue-style-loader' 
                            }),
                            less: ExtractTextPlugin.extract({
                                use: [
                                    'css-loader', 
                                    'postcss-loader',
                                    'less-loader'
                                ],
                                fallback: 'vue-style-loader' 
                            })
                        },
                        sourceMap:true
                    }
                }],
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/ // 排出node_nodules文件夹
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: 'url-loader?limit=10240&name=images/[name].[ext]'
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                use: 'file-loader'
            },
            {
                test: /\.less/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'postcss-loader',
                        'less-loader'
                    ]
                })
            },
            {
                test: /\.css/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'postcss-loader'
                    ]
                })
            }
        ]
    },
    resolve: {
        // require时省略的扩展名
        extensions: ['.js', '.vue'],
        // 设置引用地址别名
        alias: {
            publicSource: path.resolve(__dirname, './src/publicSource'),
            publicComponents: path.resolve(__dirname, './src/publicSource/components'),
            publicContains: path.resolve(__dirname, './src/publicSource/contains'),
            vender: path.resolve(__dirname, './src/vender'),
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'login/index.html',
            template: 'index.ejs',
            chunks: ['login']
        }),
        new HtmlWebpackPlugin({
            filename: 'system/index.html',
            template: 'index.ejs',
            chunks: ['system']
        }),
        new HtmlWebpackPlugin({
            filename: 'mall/index.html',
            template: 'index.ejs',
            chunks: ['mall']
        }),
        new HtmlWebpackPlugin({
            filename: 'manageSystem/index.html',
            template: 'index.ejs',
            chunks: ['manageSystem'],
        }),
        new ExtractTextPlugin({
            filename: "[name]/main.css", 
            allChunks : true
        }),
        new webpack.LoaderOptionsPlugin({ //浏览器加前缀
            options: {
                postcss: [
                    require('autoprefixer')({
                        browsers: ['last 99 versions']
                    })
                ]
            }
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '\"' + process.env.NODE_ENV + '\"'
        })
    ]
}

module.exports = config;