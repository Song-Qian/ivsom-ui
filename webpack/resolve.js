/**
 * Developer    :   SongQian
 * Time         :   2019/03/09
 * eMail        :   songqian@wtoe.cn
 * Description  :   路径语法糖配置
 */

var path = require("path")

module.exports =  {
  extensions: ['.ts', '.tsx', '.js', '.scss'],
  alias: {
      '~' : path.join(__dirname, '../', 'src')
  }
}