/**
 * Developer    :   SongQian
 * Time         :   2020-08-13
 * eMail        :   songqian@wtoe.cn
 * Description  :   表单组件
 */

 import * as tsx from 'vue-tsx-support'
 import { Component, Prop, ProvideReactive } from 'vue-property-decorator'

 import 'vue-tsx-support/enable-check'

 type Props = {
    Model : { [key : string]: any }
 }

 type ScopedSlots = {
     default : void
 }

 @Component
 export default class iVsomForm extends tsx.Component<Props, any, ScopedSlots> {

    @ProvideReactive(Symbol.for('model')) @Prop({ default: {} }) readonly model !: { [key : string]: any };

    protected render() : JSX.Element {
        let me = this;
        return (
            <form class="ivsom-form" action="#" method="post">
                { me.$scopedSlots.default() }
            </form>
        )
    }
 }