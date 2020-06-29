/**
 * Developer    :   SongQian
 * Time         :   2020-06-16
 * eMail        :   songqian@wtoe.cn
 * Description  :   button组件
 */

 import * as tsx from 'vue-tsx-support'
 import { Component, Prop } from 'vue-property-decorator'

 import 'vue-tsx-support/enable-check'

 type Props = {
     //是否密码输入框
     Password : Boolean
     //描述提示信息
     Placeholder : String
     //文本值
     Value : String
     //是否禁用
     Disabled : Boolean
     //头部 icon
     Prefix : String
     //尾部 icon
     Suffix : String
     //width
     Width : String | number
     //表单大小
     Size : 'medium' | 'small' | 'mini'
     //多行文本
     limit : Boolean
 }

 type ScopedSlots = {
     Prefix : String
     Suffix : String
 }
 
 @Component
 export default class iVsomInput extends tsx.Component<Props, any, ScopedSlots> {

    constructor() {
        super()
    }

    @Prop({ default : false, type : Boolean}) readonly password !: boolean;

    @Prop({ default : '请输入'}) readonly placeholder !: string;

    @Prop({ default : '' }) readonly value !: string;

    @Prop({ default : false, type : Boolean}) readonly disabled !: boolean;

    @Prop({ default : '' }) readonly prefix !: string;

    @Prop({ default : '' }) readonly suffix !: string;

    @Prop({ default : 220 }) readonly width !: string | number;

    @Prop({ default : 'medium'}) readonly size !: string;

    @Prop({ default : false, type : Boolean }) readonly limit !: boolean;

    private validate : boolean = true;

    public ValidateField(regexp : RegExp) {
        const me = this;
        me.validate = regexp.test(me.value);
        return me.validate;
    }

    protected render() : JSX.Element {
        const me = this;
        const prefixEl = ( me.$scopedSlots.Prefix ? <div class='ivsom-input__prefix'>{ me.$scopedSlots.Prefix && me.$scopedSlots.Prefix(me.prefix) }</div> : 
                me.prefix ? <div class='ivsom-input__prefix'><i class={ ['iconfont', me.prefix ] }></i></div> :
                    null )
        const suffixEl = ( me.$scopedSlots.Suffix ? <div class='ivsom-input__suffix'>{ me.$scopedSlots.Suffix && me.$scopedSlots.Suffix(me.suffix) }</div> : 
                me.suffix ? <div class='ivsom-input__suffix'><i class={ ['iconfont', me.suffix ] }></i></div> :
                    null )
        const inputEl = me.limit ? <textarea value={ me.value } onInput={ (e) => me.$emit('input', e.target.value) } placeholder={ me.placeholder } disabled={ me.disabled }></textarea> :
                <input type={ me.password ? 'password' : 'text' } placeholder={ me.placeholder } value={ me.value } onInput={ (e) => me.$emit('input', e.target.value) } disabled={ me.disabled }></input>;
        const w = typeof me.width === 'number' ? `${me.width}px` : me.width;
        return (
            <div class={ { 'ivsom-input' : true, ['ivsom-input__' + me.size] : true, 'ivsom-input__disabled' : me.disabled, 'ivsom-input__hasErorr' : !me.validate, 'ivsom-input__limit' : me.limit } } style={{ width : w }} >
                { prefixEl }
                { inputEl }
                { suffixEl }
            </div>
        )
    }
 }