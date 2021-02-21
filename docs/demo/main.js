/**
 * Developer    :   SongQian
 * Time         :   2020-05-15
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   入口文件
 */
;(function() {
    
    Vue.use(iVsomUI);

    var app = new Vue({
        el : '#app',
        data : function() {
            return {
                searchText: ''
            }
        },
        methods : {
            handlerFilter : function(els, text, deepLevel) {
                var me = this;
                if(els.$children.length && !!me.searchText && els.$children.every(function(item) { return item.hasFilter; })  && text.indexOf(me.searchText) === -1) {
                    return true;
                } else if (!els.$children.length && !!me.searchText && text.indexOf(me.searchText) === -1 ) {
                    return true;
                }
                return false;
            }
        }
    })

})()