/**
 * Developer    :   SongQian
 * Time         :   2020-05-09
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   Tabs Panel组件
 */

 import * as tsx from 'vue-tsx-support'
 import { Component, Prop } from 'vue-property-decorator'

 import 'vue-tsx-support/enable-check'

 type Props = {
    // Tabs label 标题
    Name : String
    //  Tab label 选中值
    Index : String
 }

 type ScopedSlots = {
     default : void
 }

 @Component
 export default class iVsomTabsPanel extends tsx.Component<Props, any, ScopedSlots> {

     constructor() {
         super()
     }

     @Prop({ default : '', type : String }) readonly name !: string;

     @Prop({ default : '', type : String }) readonly index !: string;

     protected render() : JSX.Element {
        const me = this;
        const { value, flex } = me.$vnode.parent as any;
    
        return (
            <div class= { ['ivsom-tabs-panel', value  === me.index ? 'ivsom-tabs-panel__active' : '', flex ? 'ivsom-tabs-panel__flex' : ''] }>
                { me.$scopedSlots.default && me.$scopedSlots.default() }
            </div>
        )
     }
 }