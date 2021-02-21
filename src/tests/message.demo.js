/**
 * Developer    :   SongQian
 * Time         :   2020-12-01
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   ivsom 消息框组件Demo
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
            openAlert: function(opts = {}) {
                var me = this;
                me.$ivsom_message.alert(opts);
            },
            openAlertOn: function(opts) {
                var me = this;
                me.$ivsom_message.alert(opts, function(e){
                    alert("消息框被关闭了");
                });
            },
            openConfirmOn: function(opts) {
                var me = this;
                me.$ivsom_message.confirm(opts, function(e) {
                    alert("yes")
                }, function(e) {
                    alert("no")
                });
            },
            openToast: function(opts) {
                var me = this;
                var toast = me.$ivsom_message.toast(opts);
                setTimeout(function() {
                    toast.Hide();
                }, 3000)
            },
            openPrompt: function(opts) {
                var me = this;
                me.$ivsom_message.prompt(opts, function() {
                    alert("prompt leave");
                });
            }
        }
    })

})()