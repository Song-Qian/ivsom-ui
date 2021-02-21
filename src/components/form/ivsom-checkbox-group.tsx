/**
 * Developer    :   SongQian
 * Time         :   2020-06-04
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   checkbox group 组件
 */

 import { Component, Prop, ProvideReactive, InjectReactive, Watch } from 'vue-property-decorator'
 import * as tsx from 'vue-tsx-support'
 import "vue-tsx-support/enable-check"

 import uuid from '~/utils/uuid'

 type Props = {
     //checkbox form表单提交的名字
    Name : String
    //checkbox 选中的值
    Value : any[]
 }

 type ScopedSlots = {
     default : void
 }

 @Component
 export default class iVsomCheckBoxGroup extends tsx.Component<Props, any, ScopedSlots> {


    @Prop({ default: [], type : String }) readonly value !: any[];
    @ProvideReactive(Symbol.for('checkbox-name')) @Prop({ default : uuid() }) readonly name !: string;
    @ProvideReactive(Symbol.for('checkbox-value')) private values : { [key: string]: any; } = {};

    @InjectReactive(Symbol.for('validate')) validate !: boolean;
    @InjectReactive(Symbol.for('trigger')) trigger !: 'blur' | 'change';

    @Watch("values", { immediate: false, deep: true })
    protected handlerCheckBoxChange(val: { [key: string]: any; }) {
        let me = this;
        let data = [];
        for(let key in val) {
            data.push(val[key])
        }
        me.$emit("input", data);
        me.$emit("on-change", data);
        if(me.trigger === "change") {
            me.$parent.$emit('on-validate');
        }
    }

    protected onBlur(e : FocusEvent) {
        let me = this;
        if(me.trigger === "blur") {
            me.$parent.$emit('on-validate');
        }
    }

    protected mounted() {
        let me = this;
        me.$on("on-modify", (id: string, isModify : boolean, value : any) => {
            if(isModify) {
                me.$set(me.values, id, value);
            } else {
                delete me.values[id];
                me.$set(me, 'values', { ...me.values });
            }
        });
        
        let children = me.$scopedSlots.default && me.$scopedSlots.default();
        children?.forEach((node : any, i) => {
            if(node.componentOptions?.Ctor.name === "iVsomCheckBox" && me.value.indexOf(node.componentInstance?.$props.value) > -1) {
                let id = (node.componentInstance as any).id;
                me.$set(me.values, id, node.componentInstance?.$props.value);
            }
        })
    }

    protected updated() {
        let me = this;
        let children = me.$scopedSlots.default && me.$scopedSlots.default();
        children?.forEach((node : any, i) => {
            if(node.componentOptions?.Ctor.name === "iVsomCheckBox" && me.value.indexOf(node.componentInstance?.$props.value) > -1) {
                let id = (node.componentInstance as any).id;
                me.$set(me.values, id, node.componentInstance?.$props.value);
            }
        })
    }

    protected render() : JSX.Element {
        let me = this;

        return (
            <div class={{ "ivsom-checkbox-group" : true, "ivsom-checkbox__hasError" : me.validate === false }} onBlur={ me.onBlur } tabindex={999}>
                { me.$scopedSlots.default && me.$scopedSlots.default() }
            </div>
        )
    }
 }