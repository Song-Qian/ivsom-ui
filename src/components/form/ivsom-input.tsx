/**
 * Developer    :   SongQian
 * Time         :   2020-06-16
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   button组件
 */

import { Component, InjectReactive, Prop, PropSync } from 'vue-property-decorator'
import * as tsx from 'vue-tsx-support'
import 'vue-tsx-support/enable-check'


type Props = {
    //是否密码输入框
    Password: Boolean
    //描述提示信息
    Placeholder: String
    //文本值
    Value: String
    //是否禁用
    Disabled: Boolean
    //头部 icon
    Prefix: String
    //尾部 icon
    Suffix: String
    //width
    Width: String | Number
    //表单大小
    Size: 'medium' | 'small' | 'mini'
    //多行文本
    limit: Boolean
}

type ScopedSlots = {
    prefix: String
    suffix: String
}

@Component
export default class iVsomInput extends tsx.Component<Props, any, ScopedSlots> {

    constructor() {
        super()
    }

    @Prop({ default: false, type: Boolean }) readonly password !: boolean;

    @Prop({ default: '请输入' }) readonly placeholder !: string;

    @PropSync('value', { default: '', type: String }) syncedValue !: string;

    @Prop({ default: false, type: Boolean }) readonly disabled !: boolean;

    @Prop({ default: '' }) readonly prefix !: string;

    @Prop({ default: '' }) readonly suffix !: string;

    @Prop({ default: 220 }) readonly width !: string | number;

    @Prop({ default: 'medium' }) readonly size !: string;

    @Prop({ default: false, type: Boolean }) readonly limit !: boolean;

    @InjectReactive(Symbol.for('validate')) validate !: boolean;

    @InjectReactive(Symbol.for('trigger')) trigger !: 'blur' | 'change';

    protected onChange(e: any) {
        let me = this;
        me.syncedValue = e.target.value;
        me.$emit('input', e.target.value);
        if (me.trigger === 'change') {
            me.$parent.$emit('on-validate');
        }
    }

    protected onBlur() {
        let me = this;
        if (me.trigger === 'blur') {
            me.$parent.$emit('on-validate');
        }
    }

    protected render(): JSX.Element {
        const me = this;
        const prefixEl = (me.$scopedSlots.prefix ? <div class='ivsom-input__prefix'>{me.$scopedSlots.prefix && me.$scopedSlots.prefix(me.prefix)}</div> :
            me.prefix ? <div class='ivsom-input__prefix'><i class={['iconfont', me.prefix]}></i></div> :
                null)
        const suffixEl = (me.$scopedSlots.suffix ? <div class='ivsom-input__suffix'>{me.$scopedSlots.suffix && me.$scopedSlots.suffix(me.suffix)}</div> :
            me.suffix ? <div class='ivsom-input__suffix'><i class={['iconfont', me.suffix]}></i></div> :
                null)
        const inputEl = me.limit ? <textarea value={me.syncedValue} onInput={me.onChange} placeholder={me.placeholder} disabled={me.disabled} onBlur={me.onBlur}></textarea> :
            <input type={me.password ? 'password' : 'text'} placeholder={me.placeholder} value={me.syncedValue} onInput={me.onChange} onBlur={me.onBlur} disabled={me.disabled}></input>;
        const w = typeof me.width === 'number' ? `${me.width}px` : me.width;
        return (
            <div class={{ 'ivsom-input': true, ['ivsom-input__' + me.size]: true, 'ivsom-input__disabled': me.disabled, 'ivsom-input__hasErorr': me.validate === false, 'ivsom-input__limit': me.limit }} style={{ width: w }} >
                { prefixEl}
                { inputEl}
                { suffixEl}
            </div>
        )
    }
}