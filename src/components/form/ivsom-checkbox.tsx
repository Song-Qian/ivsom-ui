/**
 * Developer    :   SongQian
 * Time         :   2020-06-04
 * eMail        :   songqian@wtoe.cn
 * Description  :   checkbox组件
 */
import { Component, ModelSync, Prop, InjectReactive } from 'vue-property-decorator'
import * as tsx from 'vue-tsx-support'
import 'vue-tsx-support/enable-check'

import uuid from '~/utils/uuid'

type Props = {
    //checkbox 指定复选框的值
    Value: any
    //checkbox 禁用
    Disabled: Boolean
    //checkbox 表单字段名称
    Name: String
    //checkbox 表单大小
    Size: 'medium' | 'small' | 'mini'
    // checkbox 选中的值
    Checked: any
}

type ScopedSlots = {
    default: void
}

@Component
export default class iVsomCheckBox extends tsx.Component<Props, any, ScopedSlots> {

    @Prop({ default : '', type: Object }) readonly value !: any;
    @Prop({ default : false, type: Boolean }) readonly disabled !: Boolean;
    @Prop({ default : 'medium', type: String }) readonly size !: 'medium' | 'small' | 'mini';
    @InjectReactive({ from: Symbol.for('checkbox-name'), default: '' }) @Prop({ default : '' }) readonly name !: string;
    @InjectReactive({ from: Symbol.for('checkbox-value'), default: {} }) readonly includedValue !: { [key: string]: any }

    @ModelSync('checked', 'on-update', { default : '', type: Object }) checkedValue !: any;

    private readonly id : string = uuid();

    protected onChange(e : MouseEvent, value: any) {
        let me = this;
        let isModify = false;
        if(typeof me.checkedValue === "boolean") {
            let value  = !Boolean(me.checkedValue);
            isModify = Boolean(value === me.value || me.includedValue && me.includedValue[me.id] !== me.value);
            me.checkedValue = value;
            me.$parent.$emit("on-modify", me.id, isModify, value)
        } else {
            if(me.checkedValue === me.value || me.includedValue && me.includedValue[me.id] === me.value) {
                isModify = Boolean('' === me.value || me.includedValue && me.includedValue[me.id] !== me.value);
                me.checkedValue = '';
                me.$parent.$emit("on-modify", me.id, isModify, '')
            } else {
                isModify = Boolean(value === me.value || me.includedValue && me.includedValue[me.id] === me.value);
                me.checkedValue = value;
                me.$parent.$emit("on-modify", me.id, isModify, value)
            }
        }
    }

    protected render() : JSX.Element {
        let me = this;
        return (
            <div class={{ 'ivsom-checkbox' : true, ['ivsom-checkbox__' + me.size] : true,'ivsom-checkbox__disabled' : me.disabled, 'ivsom-checkbox__checked' : me.checkedValue === me.value || me.includedValue && me.includedValue[me.id] === me.value }} onClick={ (e : MouseEvent) => me.disabled ? void 0 : me.onChange(e, me.value) }>
                <div class="ivsom-checkbox__warp">
                    <input type="checkbox" name={me.name} value={me.value} checked={ me.checkedValue === me.value || me.includedValue && me.includedValue[me.id] === me.value } />
                    <label class="ivsom-checkbox__text">{ me.$scopedSlots.default && me.$scopedSlots.default() }</label>
                </div>
            </div>
        )
    }

}