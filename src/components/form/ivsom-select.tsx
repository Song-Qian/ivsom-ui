import { Component, Prop, Emit } from 'vue-property-decorator'
import * as tsx from 'vue-tsx-support'

import 'vue-tsx-support/enable-check'

type Props = {
    Field : String,
    Label : String,
    Source : Array<any>,
    Multiple : Boolean
    //描述提示信息
    Placeholder : String
    //头部 icon
    Prefix : String
    //尾部 icon
    Suffix : String
    //width
    Width : String | Number
    //表单大小
    Size : 'medium' | 'small' | 'mini'
}

type ScopedSlots = {
    Prefix : String
    Suffix : String
}

@Component
export default class iVsomSelect extends tsx.Component<Props, any, ScopedSlots> {

    constructor() {
        super()
    }

    @Prop({ default: 220 }) readonly width !: string | number;

    @Prop({ default : 'medium' }) readonly size !: 'medium' | 'small' | 'mini';

    @Prop({ default : '' }) readonly prefix !: string;

    @Prop({ default : '' }) readonly suffix !: string;

    @Prop({ default : '' }) readonly placeholder !: string;

    @Emit()
    protected onExpansion() {
        
    }

    protected render() : JSX.Element {
        const me = this;
        const prefixEl = ( me.$scopedSlots.Prefix ? <div class='ivsom-select__prefix'>{ me.$scopedSlots.Prefix && me.$scopedSlots.Prefix(me.prefix) }</div> : 
            me.prefix ? <div class='ivsom-input__prefix'><i class={ ['iconfont', me.prefix ] }></i></div> :
                null )
        const suffixEl = ( me.$scopedSlots.Suffix ? <div class='ivsom-input__suffix'>{ me.$scopedSlots.Suffix && me.$scopedSlots.Suffix(me.suffix) }</div> : 
            me.suffix ? <div class='ivsom-input__suffix'><i class={ ['iconfont', me.suffix ] }></i></div> :
                null )
        const w = typeof me.width === 'number' ? `${me.width}px` : me.width;
        return (
            <div class= {{ "ivsom-select" : true,  ['ivsom-select__' + me.size ] : true }} style={{ width: w }}>
                { prefixEl }
                <input type="text" placeholder={ me.placeholder } class="ivsom-select__warpper"></input>
                { suffixEl }
                <div class="ivsom-select__dropdown" onClick={ tsx.modifiers.stop(me.onExpansion) }><i class="iconfont icon-gongnengtubiao-31"></i></div>
                <div class="ivsom-select__dropArea"></div>
            </div>
        )
    }
}