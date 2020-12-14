/**
 * Developer    :   SongQian
 * Time         :   2020-06-16
 * eMail        :   songqian@wtoe.cn
 * Description  :   ivsom 输入框表单
 */
;(function() {
    
    Vue.use(iVsomUI);

    var app = new Vue({
        el : '#app',
        data : function() {
            return {
                value : 0,
                value1 : 0,
                value2 : 0,
                value3 : 0,
                value4 : 0,
                value5 : 0,
                value6 : 0,
                value7 : 0,
                form : {
                    age : 1,
                    weight : 0.0
                }
            }
        }
    })

})()