/**
 * Developer    :   SongQian
 * Time         :   2020-08-13
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   表单组件
 */

import { Component, Emit, Prop, ProvideReactive } from 'vue-property-decorator'
import * as tsx from 'vue-tsx-support'
import 'vue-tsx-support/enable-check'


type Props = {
    // 表单验证实体
    Model: { [key: string]: any }
    // 表单Label 宽
    LabelWidth: Number | String
    // 表单Label 定位
    Position: 'left' | 'center' | 'right'
}

type ScopedSlots = {
    default: void
}

@Component
export default class iVsomForm extends tsx.Component<Props, any, ScopedSlots> {

    @ProvideReactive(Symbol.for('model')) @Prop({ default: {} }) readonly model !: { [key: string]: any };

    @ProvideReactive(Symbol.for('labelWidth')) @Prop({ default: 'auto' }) readonly labelWidth !: number | string;

    @ProvideReactive(Symbol.for('position')) @Prop({ default: 'left' }) readonly position !: 'left' | 'center' | 'right';

    private validates: Map<Symbol, tsx.Component<any>> = new Map()

    @Emit()
    protected onSubmit() {

    }

    protected async validateForm() {
        let me = this;
        let vali = true;
        for (let [sym, validator] of me.validates.entries()) {
            if (!(validator as any).validateField()) {
                vali = false;
            }
        }
        return vali;
    }

    protected validateField(prop: string) {
        let me = this;
        let validator = me.validates.get(Symbol.for(prop));
        return (validator as any).validateField();
    }

    protected clearValidates() {
        let me = this;
        for (let [sym, validator] of me.validates.entries()) {
            (validator as any).clearValidate()
        }
    }

    protected clearValidate(prop: string) {
        let me = this;
        let validator = me.validates.get(Symbol.for(prop));
        (validator as any).clearValidate()
    }

    protected created() {
        let me = this;
        me.$on("emitPushValidator", function (validator: tsx.Component<any>) {
            me.validates.set(Symbol.for(validator.$props.prop), validator);
        })
        me.$on("emitRemoveValidator", function (validator: tsx.Component<any>) {
            me.validates.delete(Symbol.for(validator.$props.prop));
        })
    }

    protected render(): JSX.Element {
        let me = this;
        return (
            <form class="ivsom-form" action="#" method="post" onSubmit={tsx.modifiers.prevent(me.onSubmit)}>
                {me.$scopedSlots.default()}
            </form>
        )
    }
}