/**
 * Developer    :   SongQian
 * Time         :   2019/03/09
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   生产依赖插件配置
 */
const path = require('path')
const webpack = require('webpack')
const { pages } = require('../page.json')
const htmlWebpackPlugin = require('html-webpack-plugin')
const copyWebpackPlugin = require('copy-webpack-plugin')

module.exports = function() {

    const bannerPlugin = new webpack.BannerPlugin({
        banner : `Developer :   SongQian
Time    :   2020-04-21
eMail   :   onlylove1172559463@vip.qq.com
Description :  武汉微创光电股份公司 iVsomUI 组件库`,
        raw : false,
        entryOnly : false,
        test : /(\.tsx|js)/,
        exclude : /node_modules/
    });

    const copyPlugin = new copyWebpackPlugin([
        {
            from : {
                glob : path.join(__dirname, '../src', 'tests', '*.js'),
                dot : true
            },
            to : path.join(__dirname, '../docs', 'demo', '[name].js'),
            force : true,
            flatten : true,
            copyUnmodified : true
        },
        {
            from : {
                glob : path.join(__dirname, '../src', 'assets/utils/iconfont.js'),
                dot : true
            },
            to : path.join(__dirname, '../docs', 'iconfont.js'),
            force : true,
            flatten : true,
            copyUnmodified : true
        },
        {
            from : {
                glob : path.join(__dirname, '../node_modules', 'vue', 'dist', 'vue.min.js'),
                dot : true
            },
            to : path.join(__dirname, '../docs', 'vue.min.js'),
            force : true,
            flatten : true,
            copyUnmodified : true
        },
        {
            from : {
                glob : path.join(__dirname, '../src', 'tests', '*.css'),
                dot : true
            },
            to : path.join(__dirname, '../docs', 'demo', '[name].css'),
            force : true,
            flatten : true,
            copyUnmodified : true
        }
    ])

    const extensionPlugin = [];
    pages.forEach((page, n) => {
        extensionPlugin.push(new htmlWebpackPlugin({
            filename : path.join(__dirname, '../docs', 'demo', page),
            template : path.join(__dirname, '../src', 'tests', page),
            inject : 'head',
            minify : false,
            chunks : ['index']
        }))
    })

    extensionPlugin.push(new htmlWebpackPlugin({
        filename : path.join(__dirname, '../docs', 'index.html'),
        template : path.join(__dirname, '../src', 'tests', 'index.html'),
        inject : 'head',
        minify : false,
        // templateParameters : {
        //     vue : process.env.NODE_ENV === 'production' ? './vue.min.js' : '/vue.min.js'
        // },
        chunks : ['index']
    }))
    // if(process.env.NODE_ENV === 'production') {
    //     const uglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
    //         sourceMap: false,
    //         test : /\.(js|ts)$/,
    //         compress: {
    //           warnings: false,
    //           drop_debugger : true,
    //           dead_code : true,    //删除没有引用的代码
    //           sequences : 20,    //使用逗号运算符
    //           conditionals : true,  //优化if条件表达式
    //           booleans : true,     //优化boolean值
    //           drop_console: true   //删除console
    //         },
    //         output : {
    //             beautify : true
    //         }
    //     });

    //     extensionPlugin.push(uglifyJsPlugin);
    // }

    return [
        bannerPlugin,
        copyPlugin,
        ...extensionPlugin
    ]
}