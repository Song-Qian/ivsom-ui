/**
 * Developer    :   SongQian
 * Time         :   2020-08-13
 * eMail        :   songqian@wtoe.cn
 * Description  :   表单组件
 */

 import * as tsx from 'vue-tsx-support'
 import { Component, Prop, ProvideReactive, Emit } from 'vue-property-decorator'

 import 'vue-tsx-support/enable-check'

 type Props = {
    // 表单验证实体
    Model : { [key : string]: any }
    // 表单Label 宽
    LabelWidth : Number | String
    // 表单Label 定位
    Position : 'left' | 'right' | 'center'
 }

 type ScopedSlots = {
     default : void
 }

 @Component
 export default class iVsomForm extends tsx.Component<Props, any, ScopedSlots> {

    @ProvideReactive(Symbol.for('model')) @Prop({ default: {} }) readonly model !: { [key : string]: any };
    
    @ProvideReactive(Symbol.for('labelWidth')) @Prop({ default: 'auto' }) readonly label_width !: number | string;
    
    @ProvideReactive(Symbol.for('position')) @Prop({ default: 'left' }) readonly position !: 'left' | 'right' | 'center';

    @Emit()
    protected onSubmit() {
        
    }

    protected render() : JSX.Element {
        let me = this;
        return (
            <form class="ivsom-form" action="#" method="post" onSubmit={ tsx.modifiers.prevent(me.onSubmit) }>
                { me.$scopedSlots.default() }
            </form>
        )
    }
 }