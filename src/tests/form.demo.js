/**
 * Developer    :   SongQian
 * Time         :   2020-08-13
 * eMail        :   songqian@wtoe.cn
 * Description  :   form 表单应用
 */
;(function() {
    
    Vue.use(iVsomUI);

    var app = new Vue({
        el : '#app',
        data : function() {
            return {
                str : '',
                entity : {
                    name : ''
                }
            }
        },
        methods : {
            trigger : function() {
                var me = this;
                me.$refs.valid.clearValidate();
            }
        }
    })

})()