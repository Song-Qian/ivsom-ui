/**
 * Developer    :   SongQian
 * Time         :   2020-05-15
 * eMail        :   songqian@wtoe.cn
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
            },
            handlerMenuItemClick : function(e) {
                alert(e.target.innerText);
            },
            handlerSearchActivation : function(e) {
                console.log('我被激活了');
            },
            handlerSearchDeactivated : function(e) {
                console.log('我失去了激活状态');
            }
        }
    })

})()