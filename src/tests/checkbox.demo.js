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
                value: '',
                value1: '',
                value2: '',
                value3: ['榴莲', '火龙果'],
                value4: [],
                form: {
                    fruit : []
                }
            }
        },
        methods : {
            validateForm : function(callback) {
                let me = this;
                if(me.form.fruit.indexOf('香蕉') > -1) {
                    return callback(new Error('香蕉未进货。'))
                }

                if(me.form.fruit.indexOf('百香果') > -1) {
                    return callback(new Error('当前选中的水果已售完'))
                }
                return callback()
            },
            onChange: function(data) {
                alert(data.join(','));
            }
        }
    })

})()