/**
 * Developer    :   SongQian
 * Time         :   2019/03/09
 * eMail        :   songqian@wtoe.cn
 * Description  :   生产编译处理配置
 */
const merge = require('webpack-merge')
const extractTextPlugin = require('extract-text-webpack-plugin')
const basicExtract = new extractTextPlugin({ filename : 'iVsomUI.css', allChunks: true })
const entry = require('./entry')
const output = require('./output')
const rules = require('./rules')
const resolve = require('./resolve')
const plugins = require('./plugins')
const optimization = require('./optimization')
const devServer = require('./devServer')

module.exports = merge({}, {
    entry,
    output,
    resolve,
    optimization,
    devServer,
    externals: {
        vue: {
            root: 'Vue',
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue',
        },
    },
    plugins: [
        basicExtract,
        ...plugins()
    ],
    module : {
        rules : [
            ...rules(basicExtract)
        ]
    },
    devtool: process.env.NODE_ENV === 'production' ? false : "source-map",
    performance : {
        hints: process.env.NODE_ENV === 'production' ? false : 'warning'
    }
})