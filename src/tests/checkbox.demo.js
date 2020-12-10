/**
 * Developer    :   SongQian
 * Time         :   2020-08-13
 * eMail        :   songqian@wtoe.cn
 * Description  :   form 表单应用
 */
; (function () {

    Vue.use(iVsomUI);

    var app = new Vue({
        el: '#app',
        data: function () {
            return {
                value: []
            }
        },
        watch: {
            value : function handler(val) {
                console.log(val);
            }
        }
    })

})()