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
                ]
            }
        }
    })

})()