/**
 * Developer    :   SongQian
 * Time         :   2020-06-10
 * eMail        :   songqian@wtoe.cn
 * Description  :   switch组件
 */
import * as tsx from 'vue-tsx-support'
import { Component, Emit, Prop, ModelSync, InjectReactive } from 'vue-property-decorator'

import 'vue-tsx-support/enable-check'

type Props = {
    //禁用
    Disabled: Boolean
    //激活的颜色
    ActiveColor: String
    //失活的颜色
    InactiveColor: String
    //表单字段名字
    Name : String
    // 开关的大小
    Size : 'medium' | 'small' | 'mini',
    // 默认选中的值
    Checked: Boolean
}

@Component
export default class iVsomSwitch extends tsx.Component<Props> {

  @Prop({ default: false, type: Boolean }) readonly disabled!: boolean;
  @Prop({ default: '#3bd134', type: String }) readonly activeColor!: string;
  @Prop({ default: '#f75f3c', type: String }) readonly inactiveColor!: string;
  @Prop({ default: 'medium', type: String }) readonly size!: string;
  @Prop({ default: '' }) readonly name!: string;

  @ModelSync('checked', 'on-update', { default: false, type: Boolean }) checkedValue!: boolean;

  @InjectReactive(Symbol.for('validate')) validate!: boolean;
  @InjectReactive(Symbol.for('trigger')) trigger!: 'blur' | 'change';

  @Emit()
  protected onChange(e: MouseEvent, value: Boolean) {
    let me = this;
    me.checkedValue = !value;
    if(me.trigger === "change") {
      me.$parent.$emit('on-validate');
    }
  }

  protected onBlur(e: FocusEvent) {
    let me = this;
    if(me.trigger === "blur") {
      me.$parent.$emit('on-validate');
    }
  }

  protected render() : JSX.Element{
    let me = this;
    return (
      <div class={{ 'ivsom-switch' : true, ['ivsom-switch__' + me.size] : true, 'ivsom-switch__active' : me.checkedValue, 'ivsom-switch__disabled' : me.disabled }} style={{ 'backgroundColor' : me.checkedValue ? me.activeColor : me.inactiveColor }} onClick={(e: MouseEvent) => me.disabled ? void 0 : me.onChange(e, me.checkedValue)} onBlur={me.onBlur} tabindex={999}>
        <div class="ivsom-switch__tocuh"></div>
        <input type="hidden" name={me.name} value={ String(me.checkedValue) } />
      </div>
    )
  }
}
