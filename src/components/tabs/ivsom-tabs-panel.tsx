/**
 * Developer    :   SongQian
 * Time         :   2020-05-09
 * eMail        :   songqian@wtoe.cn
 * Description  :   Tabs Panel组件
 */

 import * as tsx from 'vue-tsx-support'
 import { Component, Prop, Inject } from 'vue-property-decorator'

 type Props = {
    // Tabs label 标题
    Name : string
    //  Tab label 选中值
    Index : string
 }

 type ScopedSlots = {
     default : void
 }

 @Component
 export default class iVsomTabsPanel extends tsx.Component<Props, any, ScopedSlots> {

     constructor() {
         super()
     }

     @Prop({ default : '', type : String }) readonly Name !: string;

     @Prop({ default : '', type : String }) readonly Index !: string;

     protected created() {
         const me = this;
         me.$on('tabs-updated-active', () => {
            console.log("test");
         })
     }

     protected render() : JSX.Element {
        const me = this;
        const { Value, Flex} = me.$vnode.parent as any;
    
        return (
            <div class= { ['ivsom-tabs-panel', Value  === me.Index ? 'ivsom-tabs-panel__active' : '', Flex ? 'ivsom-tabs-panel__flex' : ''] }>
                { me.$scopedSlots.default && me.$scopedSlots.default() }
            </div>
        )
     }
 }