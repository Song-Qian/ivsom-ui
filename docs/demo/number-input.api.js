/**
 * Developer    :   
 * Time         :   
 * eMail        :   
 * Description  :   
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
            change: function(e, val) {
                alert(val);
            }
        }
    })

})()