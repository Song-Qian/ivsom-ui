/**
 * Developer    :   SongQian
 * Time         :   2020-04-30
 * eMail        :   songqian@wtoe.cn
 * Description  :   ivsom 面包屑组件demo
 */
;(function() {
    
    Vue.use(iVsomUI);

    var app = new Vue({
        el : '#app',
        data : function() {
            return {
            }
        },
        computed : {
            getDebris : function() {
                return [
                    { text : '面包屑一', url : '#1'},
                    { text : '面包屑二', url : '#2'},
                    { text : '面包屑三', url : '#3'},
                    { text : '面包屑四', url : '#4'},
                    { text : '面包屑五', url : '#5'},
                    { text : '面包屑六', url : '#6'},
                    { text : '面包屑七', url : '#7'}
                ]
            }
        },
        methods : {
        }
    })

})()