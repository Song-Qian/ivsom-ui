/**
 * Developer    :   SongQian
 * Time         :   2019/03/09
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   生产配置
 */
var path = require("path");

module.exports = {
  path : path.resolve(__dirname, '../', 'docs'),
  chunkFilename : '[name].min.js',
  publicPath: process.env.NODE_ENV === 'production' ? '/ivsom-ui/' : '/',
  filename: '[name].[hash:8].min.js',
  library: 'iVsomUI',
  libraryExport: 'default',
  libraryTarget : 'umd'
}