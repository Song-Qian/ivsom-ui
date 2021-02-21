/**
 * Developer    :   SongQian
 * Time         :   2020-04-30
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   ivsom 面包屑组件demo
 */
;(function() {
    
    Vue.use(iVsomUI);

    var app = new Vue({
        el : '#app',
        data : function() {
            return {
                num : 0,
                items : [
                    { text : '面包屑一', to : '#1'},
                    { text : '面包屑二', to : '#2'},
                    { text : '面包屑三', to : '#3'},
                    { text : '面包屑四', to : '#4'},
                    { text : '面包屑五', to : '#5'},
                    { text : '面包屑六', to : '#6'},
                    { text : '面包屑七', to : '#7'}
                ],
                items_1 :  [
                    { text : '面包屑一', to : '#1'},
                    { text : '面包屑二', to : '#2'},
                    { text : '面包屑三', to : '#3'},
                    { text : '面包屑四', to : '#4'},
                    { text : '面包屑五', to : '#5'},
                    { text : '面包屑六', to : '#6'},
                    { text : '面包屑七', to : '#7'}
                ],
                items_2 :  [
                    { text : '面包屑一', to : '#1'},
                    { text : '面包屑二', to : '#2'},
                    { text : '面包屑三', to : '#3'},
                    { text : '面包屑四', to : '#4'},
                    { text : '面包屑五', to : '#5'},
                    { text : '面包屑六', to : '#6'},
                    { text : '面包屑七', to : '#7'}
                ],
                items_3 :  [
                    { text : '面包屑一', to : '#1'},
                    { text : '面包屑二', to : '#2'},
                    { text : '面包屑三', to : '#3'},
                    { text : '面包屑四', to : '#4'},
                    { text : '面包屑五', to : '#5'},
                    { text : '面包屑六', to : '#6'},
                    { text : '面包屑七', to : '#7'}
                ],
                items_4 :  [
                    { text : '面包屑一', to : '#1'},
                    { text : '面包屑二', to : '#2'},
                    { text : '面包屑三', to : '#3'},
                    { text : '面包屑四', to : '#4'},
                    { text : '面包屑五', to : '#5'},
                    { text : '面包屑六', to : '#6'},
                    { text : '面包屑七', to : '#7'}
                ]
            }
        },
        methods : {
            JumpTo : function(e, key) {
                var me = this;
                alert("路由地址：" +  me.$refs.breadcrumbs.map.get(key).to);
            }
        }
    })

})()