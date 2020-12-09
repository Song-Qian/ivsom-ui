/**
 * Developer    :   SongQian
 * Time         :   2020-04-21
 * eMail        :   songqian@wtoe.cn
 * Description  :   ivsom按钮组件demo
 */
;(function() {
    
    Vue.use(iVsomUI);

    var app = new Vue({
        el : '#app',
        data : function() {
            return {
            }
        },
        methods : {
            onBtnClick : function(text) {
                alert(text);
            }
        }
    })

})()