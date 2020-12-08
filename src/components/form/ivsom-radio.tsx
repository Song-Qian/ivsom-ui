/**
 * Developer    :   SongQian
 * Time         :   2020-05-28
 * eMail        :   songqian@wtoe.cn
 * Description  :   radio组件
 */

import { Component, InjectReactive, ModelSync, Prop } from 'vue-property-decorator'
import * as tsx from 'vue-tsx-support'
import 'vue-tsx-support/enable-check'

type Props = {
    //Radio v-model值
    Value: any,
    //Radio 禁用
    Disabled: Boolean,
    //表单元素
    Name : String,
    //Radio 大小
    Size: 'medium' | 'small' | 'mini'
    //Radio 样式
    Type: 'circle' | 'check'
    //Radio 选中的值
    Chekced : any
}

type ScopedSlots = {
    default : void
}

@Component
export default class iVsomRadio extends tsx.Component<Props, Event, ScopedSlots>{
    constructor() {
        super()
    }

    @Prop({ default: 'medium' }) readonly size!: string;
    @Prop({ default: 'circle' }) readonly type!: string;
    @Prop({ default: false, type: Boolean }) readonly disabled!: boolean;
    @Prop({ default: '' }) readonly value!: any;
    @InjectReactive({ from: Symbol.for('radio-name'), default: '' }) @Prop({ default: '' }) readonly name!: string;

    @ModelSync("checked", "on-update", { default: '', type : Object }) checkValue!: any;

    @InjectReactive(Symbol.for('validate')) validate!: boolean;
    @InjectReactive(Symbol.for('trigger')) trigger!: 'blur' | 'change';

    protected onChange(e: MouseEvent, value: any) {
        let me = this;
        me.checkValue = value;
        me.$parent.$emit("click", value);
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

    protected render(): JSX.Element {
        const me = this;
        return (
            <div class={{ 'ivsom-radio': true, ['ivsom-radio__' + me.size]: true, 'ivsom-radio__disabled' : me.disabled, 'ivsom-radio__checked': me.checkValue === me.value, ['ivsom-radio__' + me.type] : true }} tabindex={999} onClick={(e) => me.disabled ? void 0 : me.onChange.apply(me, [e, me.value]) } onBlur={me.onBlur} >
                <div class="ivsom-radio__warp"><input type="radio" name={me.name} value={me.value} checked={me.checkValue === me.value} />
                    <label class="ivsom-radio__text">{ me.$scopedSlots.default() }</label>
                </div>
            </div>
        )
    }

}
