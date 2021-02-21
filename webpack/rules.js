/**
 * Developer    :   SongQian
 * Time         :   2019/03/09
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   生产编译处理配置
 */

let path = require("path");

module.exports = function(basicExtract) {

    const JS_Loader = {
        test: /\.(js|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets:['@babel/preset-env']
          }
        }
    }

    const TS_Loader = { 
      test: /\.ts$/,
      loader: 'ts-loader',
      exclude: /node_modules/,
      // options: { appendTsSuffixTo: [/\.vue$/] }
    }

    const URL_Loaer  = {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
        options: {
            limit: 6144,
            name: 'assets/Images/[name].[ext]?cache=[hash:8]'
        }
    }

    const sassLoader = {
        test: /\.(css|sass|scss)$/,
        use : basicExtract.extract({ fallback: 'css-loader!sass-loader', use : 'css-loader!sass-loader' })
    }

    const jsonLoader = {
        test: /\.json$/,
        loader: 'file-loader',
        options: {
            name: '[hash:8].[name].json'
        }
    }

    const fileLoader = {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: 'font/[name].[ext]'
        }
    }

    return [
        JS_Loader,
        TS_Loader,
        URL_Loaer,
        sassLoader,
        jsonLoader,
        fileLoader
    ]
}