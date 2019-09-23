const path = require('path');
const webpack = require('webpack');

const config = {
    entry: {
        vendors: ['vue', 'vue-router', 'axios', 'vuex']
    },
    output: {
        path: path.join(__dirname, './'),
        publicPath: '/', // 资源路径
        filename: '[name]/main.js', // 入口js文件名
        library: '[name]'
    },
    plugins: [
        new webpack.DllPlugin({
            path: 'manifest.json',
            name: '[name]',
            context: __dirname,
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendors'], 
            filename: '[name].js'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false
            },
            compress: {
                warnings: false
            }
        })
    ]
}

module.exports = config;