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
                values : null,
                source : [
                    { name : '选项1', value : 1 },
                    { name : '选项2', value : 2, disabled : true },
                    { name : '选项3', value : 3 },
                    { name : '选项4', value : 4 },
                    { name : '选项5', value : 5 },
                    { name : '选项6', value : 6 },
                    { name : '选项7', value : 7, disabled : true },
                    { name : '选项8', value : 8 },
                    { name : '选项9', value : 9 },
                    { name : '选项10', value : 10 },
                    { name : '选项11', value : 11, disabled : true },
                    { name : '选项12', value : 12 },
                    { name : '选项13', value : 13 },
                    { name : '选项14', value : 14 },
                ]
            }
        }
    })

})()