/**
 * Developer    :   SongQian
 * Time         :   2020/04/20
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   本地webpack server服务代理配置
 */

 var path = require('path');
 module.exports = {
    historyApiFallback : true,
    noInfo : true,
    overlay : true,
    contentBase: path.join(__dirname, '../', 'dist')
 }