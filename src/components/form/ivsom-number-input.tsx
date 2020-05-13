
/**
 * 
 */

 import * as tsx from 'vue-tsx-support'
 import { Component, Prop, Emit } from 'vue-property-decorator'

 type Props = {
    value : number
 }


 type ScopedSlots = {
    add : string
    do : string
 }
 @Component
 export default class iVsomNumberInput extends tsx.Component<Props, any, ScopedSlots> {

    constructor() {
        super();
        this.onAdd = this.onAdd.bind(this);
        this.onDo = this.onDo.bind(this);
    }

    // !: 必定有值
    // ?: 可有可无
    @Prop({ default : 0 }) readonly value !: number;


    //$refs.numberinput.getValue();
    // public getValue() : Number {
    //     return 0;
    // }

    //PropSync
    /*
    export default {

        props : {
            value : number
        },
        data : {

        }
    }
    aaa = 10;
    <input :value.sync="aaa" /> 55555
    console.log(aaa ==== 55555)
    */

    @Emit('change')
    protected onAdd(e : MouseEvent) : number {
        //this.$emit('change', this.value + 1);
        return this.value + 1;
    }

    @Emit('change')
    protected onDo() : number {
        //this.value --
        return this.value - 1;
    }

    protected render() : JSX.Element {
        const me = this;
        const addStr = me.$scopedSlots.add('添加') || '+';
        const doStr = me.$scopedSlots.do('删除') || '-';
        return (
            <div>
                <span onClick={ this.onAdd } >{ addStr }</span>{ this.value }<span onClick={ this.onDo } >{doStr}</span>
            </div>
        )
    }

 }