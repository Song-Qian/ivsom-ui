
    (function() {
    
        Vue.use(iVsomUI);
    
        var app = new Vue({
            el : '#app',
            data : function() {
                return {
                    testArray:[{
                        name:"苹果",
                        value:1,
                    },{
                        name:"香蕉",
                        value:2,
                    },{
                        name:"梨子",
                        value:3,
                    }],
                    testArray1:[{
                        name:"苹果",
                        value:1,
                    },{
                        name:"香蕉",
                        value:2,
                    },{
                        name:"梨子",
                        value:3,
                    }],
                    testArray2:[{
                        name:"苹果",
                        value:1,
                        disabled:true
                    },{
                        name:"香蕉",
                        value:2,
                    },{
                        name:"梨子",
                        value:3,
                        disabled:true
                    }],
                    select:1,
                }
            },
            methods : {
                setRadioValue:function (value) {
                    const { val } = value.target 
                  console.log(value.target.value);
    
                }
            }
        })

    
    })()
   