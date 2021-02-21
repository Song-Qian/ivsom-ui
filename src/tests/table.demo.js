/**
 * Developer    :   SongQian
 * Time         :   2021-01-01
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   ivsom 表格组件
 */
;(function() {
    
    Vue.use(iVsomUI);

    var app = new Vue({
        el : '#app',
        data : function() {
            return {
                data : new Array(100).fill(0).map((_, i) => {
                    return { name : '测试数据' + i, age : Math.floor(Math.random() * 100), phone : '13888888888', job : '工程师', interest : ['javascript', 'java', 'golang', 'sql'][Math.floor(Math.random() * 4)] }
                }),
                data1 : new Array(100).fill(0).map((_, i) => {
                    return { name : '文本溢出文本溢出文本溢出文本溢出文本溢出文本溢出文本溢出文本溢出文本溢出文本溢出文本溢出文本溢出文本溢出文本溢出', age : Math.floor(Math.random() * 100), phone : '13888888888', job : '工程师', interest : ['javascript', 'java', 'golang', 'sql'][Math.floor(Math.random() * 4)] }
                })
            }
        },
        computed : {
            getSource: function() {
                var me = this;
                return me.data;
            },
            getSource1: function() {
                var me = this;
                return me.data1;
            }
        },
        methods : {
            onSort: function(e, field, sort) {
                var me = this;
                if (sort === "desc") {
                    me.data.sort( function(prev,next) {
                        var prevCode = prev[field], nextCode = next[field];
                        if(typeof prev[field] === 'string') {
                            prevCode = prev[field].split('').reduce(function(a, b){ 
                                a = typeof a === 'number' ? a : a.charCodeAt(0);
                                b = typeof b === 'number' ? b : b.charCodeAt(0);
                                return a + b;
                            });
                        }
                        if(typeof next[field] === 'string') {
                            nextCode = next[field].split('').reduce(function(a, b){ 
                                a = typeof a === 'number' ? a : a.charCodeAt(0);
                                b = typeof b === 'number' ? b : b.charCodeAt(0);
                                return a + b;
                            });
                        }
                        return nextCode - prevCode;
                    })
                } else if (sort === "asc") {
                    me.data.sort( function(prev,next) {
                        var prevCode = prev[field], nextCode = next[field];
                        if(typeof prev[field] === 'string') {
                            prevCode = prev[field].split('').reduce(function(a, b){ 
                                a = typeof a === 'number' ? a : a.charCodeAt(0);
                                b = typeof b === 'number' ? b : b.charCodeAt(0);
                                return a + b;
                            });
                        }
                        if(typeof next[field] === 'string') {
                            nextCode = next[field].split('').reduce(function(a, b){ 
                                a = typeof a === 'number' ? a : a.charCodeAt(0);
                                b = typeof b === 'number' ? b : b.charCodeAt(0);
                                return a + b;
                            });
                        }
                        return prevCode - nextCode;
                    })
                }
            },
            onTableRowHighLight: function(rIndex) {
                console.log(rIndex);
            },
            onCellClick: function(e, row, rowIndex, field) {
                var me = this;
                me.$ivsom_message.prompt({ title : '提示', type : 'success', message : '当前点击的是第' + rowIndex + '行,' + field + '字段!' });
            },
            onCellDbClick: function(e, row, rowIndex, field) {
                var me = this;
                me.$ivsom_message.prompt({ title : '提示', type : 'success', message : '当前双击的是第' + rowIndex + '行,' + field + '字段!' });
            },
            onRowHighlight: function(rowIndex) {
                var me = this;
                me.$ivsom_message.prompt({ title : '提示', type : 'success', message : '当前高亮行是' + rowIndex + '行' });
            },
            onTableSort: function(field, sort) {
                var me = this;
                var isAsc = sort === 'asc' ? '正序' : '倒序';
                me.$ivsom_message.prompt({ title : '提示', type : 'success', message : '当前'+ isAsc +'排序字段是' + field });
            },
            handlerRowStyle: function(index, data) {
                if(index % 4 === 0) {
                    return { 'background-color' : '#2999f7' }
                }

                if(index % 4 === 1) {
                    return { 'background-color' : '#3bd134' }
                }

                if(index % 4 === 2) {
                    return { 'background-color' : '#ecc025' }
                }

                return { 'background-color' : '#f75f3c' }
            },
            handlerColStyle: function(rowIndex, value) {
                if( value > 50) {
                    return { color : 'red' }
                }
                return { color : '#fff' }
            }
        }
    })
    
})()