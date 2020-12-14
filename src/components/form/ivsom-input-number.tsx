/**
 * Developer    :   SongQian
 * Time         :   2020-06-04
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   Number Input 组件
 */

import * as tsx from 'vue-tsx-support'
import { Component, Prop, ModelSync, Emit, InjectReactive } from 'vue-property-decorator'

import 'vue-tsx-support/enable-check'

type Props = {
    //最大值
    Max: Number,
    //最小值
    Min: Number,
    //跳跃值的步伐
    Step: Number,
    //是否禁用
    Disabled: Boolean
    //表单大小
    Size: 'medium' | 'small' | 'mini'
    //数值精度
    Precision: Number
    //表单属性
    Name : String,
    //控制输入框
    Input : Boolean
}

@Component
export default class iVsomNumber extends tsx.Component<Props>{
    
    @Prop({ default : Infinity, type : Number}) readonly max!: number;
    @Prop({ default : 0, type : Number}) readonly min!: number;
    @Prop({ default : 1, type : Number}) readonly step!: number;
    @Prop({ default : false, type : Boolean}) readonly disabled!: boolean;
    @Prop({ default : '', type : String}) readonly name!: string;
    @Prop({ default : 0, type : Number}) readonly precision!: number;
    @Prop({ default : 'medium' }) readonly size !: 'medium' | 'small' | 'mini';
    @Prop({ default : true, type : Boolean }) readonly input !: boolean;

    @ModelSync('value', 'on-update', { default: 0 }) changeValue !: string;

    @InjectReactive(Symbol.for('validate')) validate!: boolean;
    @InjectReactive(Symbol.for('trigger')) trigger!: 'blur' | 'change';

    @Emit()
    protected onLess(e : MouseEvent) {
        let me = this;
        let val = me.changeValue;
        val = me.precision ? Number.prototype.toFixed.apply((Number(val) - me.step), [me.precision]) : String(~~(Number(val) - me.step));
        if(Number(val) < me.min) {
            val = String(me.min);
        } 
        me.changeValue = val;
        if(me.trigger === "change") {
            me.$parent.$emit('on-validate');
        }
        me.$emit("on-change", e, val);
    }

    @Emit()
    protected onPlus(e : MouseEvent) {
        let me = this;
        let val = me.changeValue;
        val = me.precision ? Number.prototype.toFixed.apply((Number(val) + me.step), [me.precision]) : String(~~(Number(val) + me.step));
        if(Number(val) > Number.MAX_VALUE || Number(val) > me.max) {
            val = String(me.max);
        }
        me.changeValue = val;
        if(me.trigger === "change") {
            me.$parent.$emit('on-validate');
        }
        me.$emit("on-change", e, val);
    }

    protected onChange(e : Event, value : string) {
        let me = this;
        value = value.endsWith(".") ? value + "0" : value;
        if(!/^((-?[1-9]\d{0,}(\.\d+)?)|(-?0(\.\d+)[1-9]{0,})|(-?\d+))$/.test(value)) {
            me.changeValue = String(me.min);
        } else if(Number(value) < me.min) {
            me.changeValue = String(me.min);
        } else if(Number(value) > Number.MAX_VALUE || Number(value) > me.max) {
            me.changeValue = String(me.max);
        } else {
            me.changeValue = isNaN(Number(value)) ? String(me.min) : me.precision ? Number.prototype.toFixed.apply(Number(value), [me.precision]) : String(~~Number(value));
        }
        me.$forceUpdate();
        
        if(me.trigger === "change") {
            me.$parent.$emit('on-validate');
        }
        me.$emit("on-change", e, me.changeValue);
    }

    @Emit()
    protected onBlur(e: FocusEvent) {
        let me = this;
        if(me.trigger === "blur") {
            me.$parent.$emit('on-validate');
        }
    }

    protected render() : JSX.Element {
        let me = this;
        let input = me.input ? (<div class="ivsom-input-number__warp"><input class="ivsom-input-number__inner" type="text" value={ me.changeValue } name={ me.name } onInput={ (e) => me.disabled ? void 0 : me.onChange(e, String(e.target.value)) } disabled={ me.disabled } onBlur={ me.onBlur } /></div>) : null;
        return (
            <div class={{ "ivsom-input-number" : true, ['ivsom-input-number__' + me.size] : true, "ivsom-input-number__hide_input" : me.input === false, "ivsom-input-number__disabled" : me.disabled, "ivsom-input-number__hasError" : me.validate === false }}>
                <div class="ivsom-input-number__less" onClick={ (e : MouseEvent) =>  me.disabled ? void 0 : me.onLess(e) }><i class="iconfont icon-gongnengtubiao-43" /></div>
                { input }
                <div class="ivsom-input-number__plus" onClick={ (e : MouseEvent) => me.disabled ? void 0 : me.onPlus(e) }><i class="iconfont icon-gongnengtubiao-42" /></div>
            </div>
        )
    }

}