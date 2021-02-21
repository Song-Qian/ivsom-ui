/**
 * Developer    :   SongQian
 * Time         :   2020-04-29
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   button Group组件
 */

 import * as tsx from 'vue-tsx-support'
 import { Component, Prop } from 'vue-property-decorator'

 import 'vue-tsx-support/enable-check'

 type Props = {
    Plain : Boolean
 }
 
 type scopedLSlots = {
    default : void
 }

 @Component
 export default class iVsomButtonGroup extends tsx.Component<Props, any, scopedLSlots> {

    constructor() {
        super()
    }

    @Prop({ default : false, type : Boolean }) readonly plain !: Boolean;

    protected render() : JSX.Element {
        return (
            <div class={ `ivsom-btn-group ${ this.plain ? 'ivsom-btn-group__plain' : '' }` }>{ this.$scopedSlots.default() }</div>
        )
    }

 }