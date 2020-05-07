/**
 * Developer    :   SongQian
 * Time         :   2019/03/09
 * eMail        :   songqian@wtoe.cn
 * Description  :   生产配置
 */
var path = require("path");

module.exports = {
  path : path.resolve(__dirname, '../', 'dist'),
  chunkFilename : '[name].min.js',
  publicPath: '/',
  filename: '[name].[hash:8].min.js',
  library: 'iVsomUI',
  libraryExport: 'default',
  libraryTarget : 'umd'
}