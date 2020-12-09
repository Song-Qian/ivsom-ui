/**
 * Developer    :   SongQian
 * Time         :   2020-10-23
 * eMail        :   songqian@wtoe.cn
 * Description  :   ivsom 面包屑组件demo
 */
;(function() {
    
    Vue.use(iVsomUI);

    var app = new Vue({
        el : '#app',
        data : function() {
            return {
                value: null,
                value1 : null,
                value2 : null,
                value3 : null,
                value4 : null,
                value5 : null,
                value6 : null,
                value7 : null,
                value8 : null,
                value9 : null,
                source1 : [
                    { name : '苹果', value : 1 },
                    { name : '草莓', value : 2 },
                    { name : '香蕉', value : 3 },
                    { name : '荔枝', value : 4 },
                    { name : '火龙果', value : 5 },
                    { name : '百香果', value : 6 }
                ],
                source2 : [
                    { name : '苹果', value : 1 },
                    { name : '草莓', value : 2 },
                    { name : '香蕉', value : 3, disabled : true },
                    { name : '荔枝', value : 4 },
                    { name : '火龙果', value : 5 },
                    { name : '百香果', value : 6, disabled : true }
                ],
                form : {
                    fruit : null,
                }
            }
        },
        methods : {
            validateForm : function(callback) {
                var me = this;
                var result = me.form.fruit.map(function(el) { return el.name; });
                if(result.indexOf('百香果') > -1) {
                    return callback(new Error('百香果暂未进货'))
                }

                if(result.indexOf('香蕉') > -1) {
                    return callback(new Error())
                }

                callback();
            },
            onChange: function(e, item) {
                alert("name: " + item.name + ", value: " + item.value);
            },
            onRemove: function(e, item) {
                alert("name: " + item.name + ", value: " + item.value);
            }
        }
    })

})()