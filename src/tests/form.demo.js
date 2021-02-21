/**
 * Developer    :   SongQian
 * Time         :   2020-08-13
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   form 表单应用
 */
; (function () {

    Vue.use(iVsomUI);

    var app = new Vue({
        el: '#app',
        data: function () {
            return {
                str: '',
                width: 60,
                entity: {
                    name: '',
                    email: '',
                    password: '',
                    address: ''
                },
                Form: {
                    name: '',
                    password: '',
                    email: '',
                    id: '',
                    phone: '',
                    age: 1,
                    address: '',
                    weight: 0.0
                },
                Form1: {
                    password: '',
                    confirmPassword: ''
                },
                Form2 : {
                    name : '',
                    role : '',
                    sex : '',
                    phone : '',
                    age : 1
                },
                position: 'left'
            }
        },
        methods: {
            trigger: function () {
                var me = this;
                me.$refs.valid.clearValidate();
            },
            submitForm: function (form) {
                var me = this;
                me.$refs[form].validateForm().then(function (valid) {
                    if (valid) {
                        alert("验证成功");
                    }
                })
            },
            clearForm: function (form) {
                var me = this;
                me.$refs[form].clearValidates();
            },
            confirmForm: function (callback) {
                var me = this;
                if (!me.$refs.form2.validateField("password")) {
                    return callback(new Error("原密码验证失败"));
                }

                if (me.Form1.password !== me.Form1.confirmPassword) {
                    return callback(new Error());
                }
                return callback();
            }
        }
    })

})()