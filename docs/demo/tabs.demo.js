/**
 * Developer    :   SongQian
 * Time         :   2020-05-09
 * eMail        :   songqian@wtoe.cn
 * Description  :   ivsom按钮组件demo
 */
;(function() {
    
    Vue.use(iVsomUI);

    var app = new Vue({
        el : '#app',
        data : function() {
            return {
                index : '1',
                index_1 : '1',
                index_2 : '1',
                index_3 : '1',
                index_4 : '1',
                index_5 : '1',
                index_6 : '1',
                index_7 : '1',
                index_8 : 0,
                index_9 : '1',
                index_10 : '0',
                index_11 : '0',
                tabs : [
                    { name : "Tabs - 1", index : "1" },
                    { name : "Tabs - 2", index : "2" },
                    { name : "Tabs - 3", index : "3" },
                    { name : "Tabs - 4", index : "4" }
                ],
                navs : {
                    '0' : 'Tabs - 0',
                    '1' : 'Tabs - 1',
                    '2' : 'Tabs - 2',
                    '3' : 'Tabs - 3',
                    '4' : 'Tabs - 4',
                    '5' : 'Tabs - 5',
                    '6' : 'Tabs - 6',
                    '7' : 'Tabs - 7',
                    '8' : 'Tabs - 8',
                    '9' : 'Tabs - 9',
                    '10' : 'Tabs - 10',
                    '11' : 'Tabs - 11',
                    '12' : 'Tabs - 12',
                    '13' : 'Tabs - 13',
                    '14' : 'Tabs - 14',
                    '15' : 'Tabs - 15',
                    '16' : 'Tabs - 16',
                    '17' : 'Tabs - 17',
                }
            }
        },
        methods : {
            onTabsNavClose : function(panes) {
                var me = this;
                var index = panes.index;
                me.tabs = me.tabs.filter(function(item) { return item.index !== index });
                if(me.index_9 === index) {
                    me.index_9 = me.tabs[0].index;
                }
            },
            onTabsNavClose_1 : function(panes) {
                var me = this;
                var index = panes.index;
                me.$delete(me.navs, index);
                if(me.index_10 === index) {
                    me.index_10 = Object.keys(me.navs)[0];
                }
            },
            onTabsNavClose_2 : function(panes) {
                alert(panes.name);
            },
            onTabsNavChange : function(e, index) {
                alert(index);
            }
        }
    })

})()