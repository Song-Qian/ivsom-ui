/**
 * Developer    :   SongQian
 * Time         :   2020-05-28
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   radio组件
 */

import { Component, InjectReactive, Prop, ProvideReactive, Watch } from 'vue-property-decorator'
import * as tsx from 'vue-tsx-support'
import uuid from '~/utils/uuid'

type Props = {
    //表单提交的Radio名字
    Name : String
    //当前选中的值
    Value : any
}

type ScopedSlots = {
    default : void
}

@Component
export default class iVsomRadioGroup extends tsx.Component<Props, any, ScopedSlots> {

    constructor() {
        super()
    }

    @ProvideReactive(Symbol.for('radio-name')) @Prop({ default : uuid() }) readonly name !: string;
    @ProvideReactive(Symbol.for('radio-value')) @Prop({ default : '' }) readonly value !: any;

    @InjectReactive(Symbol.for('validate')) validate!: boolean;
    @InjectReactive(Symbol.for('trigger')) trigger!: 'blur' | 'change';

    @Watch('value', {  immediate: false, deep: true })
    protected handlerChangeValue(value: string, oldValue: string) {
        let me = this;
        if(value !== oldValue && oldValue !== undefined) {
            me.$emit("on-change", value);
            if(me.trigger === "change") {
                me.$parent.$emit('on-validate');
            }
        }
    }

    
    protected onBlur(e: FocusEvent) {
        let me = this;
        if(me.trigger === "blur") {
            me.$parent.$emit('on-validate');
        }
    }

    protected mounted() {
        let me = this;
        me.$on("click", function(val: any) { me.$emit("input", val); })
    }

    protected render(): JSX.Element {
        let me = this;

        return (
            <div class={{ 'ivsom-radio-group': true, 'ivsom-radio-group__hasError' : me.validate === false }}  tabindex={999}  onBlur={me.onBlur}>
                { me.$scopedSlots.default && me.$scopedSlots.default() }
            </div>
        )
    }

}