/**
 * Developer    :   SongQian
 * Time         :   2020-10-23
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   switch 开关
 */
;(function() {
    
    Vue.use(iVsomUI);

    var app = new Vue({
        el : '#app',
        data : function() {
            return {
                value: true,
                value1 : true,
                value2 : true,
                value3 : true,
                value4 : true,
                value5 : true,
                form : {
                    open: false
                }
            }
        },
        methods : {
            onChange : function(e, value) {
                console.log(value);
            }
        }
    })

})()