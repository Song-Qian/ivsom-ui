
(function () {

    Vue.use(iVsomUI);

    var app = new Vue({
        el: '#app',
        data: function () {
            return {
                radio_value: '',
                radio_value1: '',
                radio_value2: '',
                radio_value3: '',
                radio_value4: ''
            }
        },
        watch : {
            radio_value : function (val) {
                console.log("update :" + val);
            }
        },
        methods: {
            onChange: function (val) {
                alert(val);
            }
        }
    })
})()
