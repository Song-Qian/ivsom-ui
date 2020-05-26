/**
 * Developer    :   SongQian
 * Time         :   2020-05-15
 * eMail        :   songqian@wtoe.cn
 * Description  :   ivsom 菜单组件Demo
 */
;(function() {
    
    Vue.use(iVsomUI);

    var app = new Vue({
        el : '#app',
        data : function() {
            return {
                menu : [
                    { text : '一级菜单 - 1', icon : 'icon-gongnengtubiao-95', children : [
                            { text : '二级菜单 - 1', icon : 'icon-gongnengtubiao-97', children : [
                                    { text : '三级菜单 - 1', icon : 'icon-gongnengtubiao-114' },
                                    { text : '三级菜单 - 2', icon : 'icon-gongnengtubiao-114' },
                                    { text : '三级菜单 - 3', icon : 'icon-gongnengtubiao-114' },
                                    { text : '三级菜单 - 4', icon : 'icon-gongnengtubiao-114' },
                                    { text : '三级菜单 - 5', icon : 'icon-gongnengtubiao-114' },
                                    { text : '三级菜单 - 6', icon : 'icon-gongnengtubiao-114' },
                                    { text : '三级菜单 - 7', icon : 'icon-gongnengtubiao-114' }
                                ] 
                            },
                            { text : '二级菜单 - 2', icon : 'icon-gongnengtubiao-97', children : [
                                    { text : '三级菜单 - 1', icon : 'icon-gongnengtubiao-114' },
                                    { text : '三级菜单 - 2', icon : 'icon-gongnengtubiao-114' },
                                    { text : '三级菜单 - 3', icon : 'icon-gongnengtubiao-114' },
                                    { text : '三级菜单 - 4', icon : 'icon-gongnengtubiao-114' },
                                    { text : '三级菜单 - 5', icon : 'icon-gongnengtubiao-114' },
                                    { text : '三级菜单 - 6', icon : 'icon-gongnengtubiao-114' },
                                    { text : '三级菜单 - 7', icon : 'icon-gongnengtubiao-114' }
                                ] 
                            },
                            { text : '二级菜单 - 3', icon : 'icon-gongnengtubiao-97', children : [
                                    { text : '三级菜单 - 1', icon : 'icon-gongnengtubiao-114' },
                                    { text : '三级菜单 - 2', icon : 'icon-gongnengtubiao-114' },
                                    { text : '三级菜单 - 3', icon : 'icon-gongnengtubiao-114' },
                                    { text : '三级菜单 - 4', icon : 'icon-gongnengtubiao-114' },
                                    { text : '三级菜单 - 5', icon : 'icon-gongnengtubiao-114' },
                                    { text : '三级菜单 - 6', icon : 'icon-gongnengtubiao-114' },
                                    { text : '三级菜单 - 7', icon : 'icon-gongnengtubiao-114' }
                                ] 
                            }
                        ] 
                    },
                    { text : '一级菜单 - 2', icon : 'icon-gongnengtubiao-95', children : [
                            { text : '二级菜单 - 1', icon : 'icon-gongnengtubiao-97', children : [
                                    { text : '三级菜单 - 1', icon : 'icon-gongnengtubiao-114' },
                                    { text : '三级菜单 - 2', icon : 'icon-gongnengtubiao-114' },
                                    { text : '三级菜单 - 3', icon : 'icon-gongnengtubiao-114' },
                                    { text : '三级菜单 - 4', icon : 'icon-gongnengtubiao-114' },
                                    { text : '三级菜单 - 5', icon : 'icon-gongnengtubiao-114' },
                                    { text : '三级菜单 - 6', icon : 'icon-gongnengtubiao-114' },
                                    { text : '三级菜单 - 7', icon : 'icon-gongnengtubiao-114' }
                                ] 
                            },
                            { text : '二级菜单 - 2', icon : 'icon-gongnengtubiao-97', children : [
                                    { text : '三级菜单 - 1', icon : 'icon-gongnengtubiao-114' },
                                    { text : '三级菜单 - 2', icon : 'icon-gongnengtubiao-114' },
                                    { text : '三级菜单 - 3', icon : 'icon-gongnengtubiao-114' },
                                    { text : '三级菜单 - 4', icon : 'icon-gongnengtubiao-114' },
                                    { text : '三级菜单 - 5', icon : 'icon-gongnengtubiao-114' },
                                    { text : '三级菜单 - 6', icon : 'icon-gongnengtubiao-114' },
                                    { text : '三级菜单 - 7', icon : 'icon-gongnengtubiao-114' }
                                ] 
                            },
                            { text : '二级菜单 - 3', icon : 'icon-gongnengtubiao-97', children : [
                                    { text : '三级菜单 - 1', icon : 'icon-gongnengtubiao-114' },
                                    { text : '三级菜单 - 2', icon : 'icon-gongnengtubiao-114' },
                                    { text : '三级菜单 - 3', icon : 'icon-gongnengtubiao-114' },
                                    { text : '三级菜单 - 4', icon : 'icon-gongnengtubiao-114' },
                                    { text : '三级菜单 - 5', icon : 'icon-gongnengtubiao-114' },
                                    { text : '三级菜单 - 6', icon : 'icon-gongnengtubiao-114' },
                                    { text : '三级菜单 - 7', icon : 'icon-gongnengtubiao-114' }
                                ] 
                            }
                        ] 
                    },
                    { text : '一级菜单 - 3', icon : 'icon-gongnengtubiao-95', children : [
                            { text : '二级菜单 - 1', icon : 'icon-gongnengtubiao-97', children : [
                                    { text : '三级菜单 - 1', icon : 'icon-gongnengtubiao-114' },
                                    { text : '三级菜单 - 2', icon : 'icon-gongnengtubiao-114' },
                                    { text : '三级菜单 - 3', icon : 'icon-gongnengtubiao-114' },
                                    { text : '三级菜单 - 4', icon : 'icon-gongnengtubiao-114' },
                                    { text : '三级菜单 - 5', icon : 'icon-gongnengtubiao-114' },
                                    { text : '三级菜单 - 6', icon : 'icon-gongnengtubiao-114' },
                                    { text : '三级菜单 - 7', icon : 'icon-gongnengtubiao-114' }
                                ] 
                            },
                            { text : '二级菜单 - 2', icon : 'icon-gongnengtubiao-97', children : [
                                    { text : '三级菜单 - 1', icon : 'icon-gongnengtubiao-114' },
                                    { text : '三级菜单 - 2', icon : 'icon-gongnengtubiao-114' },
                                    { text : '三级菜单 - 3', icon : 'icon-gongnengtubiao-114' },
                                    { text : '三级菜单 - 4', icon : 'icon-gongnengtubiao-114' },
                                    { text : '三级菜单 - 5', icon : 'icon-gongnengtubiao-114' },
                                    { text : '三级菜单 - 6', icon : 'icon-gongnengtubiao-114' },
                                    { text : '三级菜单 - 7', icon : 'icon-gongnengtubiao-114' }
                                ] 
                            },
                            { text : '二级菜单 - 3', icon : 'icon-gongnengtubiao-97', children : [
                                    { text : '三级菜单 - 1', icon : 'icon-gongnengtubiao-114' },
                                    { text : '三级菜单 - 2', icon : 'icon-gongnengtubiao-114' },
                                    { text : '三级菜单 - 3', icon : 'icon-gongnengtubiao-114' },
                                    { text : '三级菜单 - 4', icon : 'icon-gongnengtubiao-114' },
                                    { text : '三级菜单 - 5', icon : 'icon-gongnengtubiao-114' },
                                    { text : '三级菜单 - 6', icon : 'icon-gongnengtubiao-114' },
                                    { text : '三级菜单 - 7', icon : 'icon-gongnengtubiao-114' }
                                ] 
                            }
                        ] 
                    }
                ],
                searchText : ''
            }
        },
        methods : {
            handlerFilter : function(els, text, deepLevel) {
                var me = this;
                if(els.$children.length && !!me.searchText && els.$children.every(function(item) { return item.hasFilter; })  && text.indexOf(me.searchText) === -1) {
                    return true;
                } else if (!els.$children.length && !!me.searchText && text.indexOf(me.searchText) === -1 ) {
                    return true;
                }
                return false;
            }
        }
    })

})()