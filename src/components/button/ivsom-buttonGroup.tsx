/**
 * Developer    :   SongQian
 * Time         :   2020-04-29
 * eMail        :   songqian@wtoe.cn
 * Description  :   button Group组件
 */

 import * as tsx from 'vue-tsx-support'
 import { Component, Prop } from 'vue-property-decorator'

 type Props = {
    plain : Boolean
 }

 type Event = {

 }

 type scopedLSlots = {
    default : String
 }

 @Component
 export default class iVsomButtonGroup extends tsx.Component<Props, Event, scopedLSlots> {

    constructor() {
        super()
    }

    @Prop({ default : false, type : Boolean }) readonly plain !: Boolean;

    protected render() : JSX.Element {
        return (
            <div class={ `ivsom-btn-group ${ this.plain ? 'ivsom-btn-group__plain' : '' }` }>{ this.$scopedSlots.default('text') }</div>
        )
    }

 }