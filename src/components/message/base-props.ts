/**
 * Developer    :   SongQian
 * Time         :   2020-12-01
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   消息框组件公共属性
 */

 export type MessageProps = {
    //消息内容
    Message : string
    //是否遮罩
    Mask : boolean
    //消息框弹出时，追加到哪个元素里面。
    Target : JSX.Element
    //消息框移除时，是否销毁
    IsDestroy : boolean
 }

 export type MessageEventsWith = {

 }

 export type MessageScopeSlots = {

 }
