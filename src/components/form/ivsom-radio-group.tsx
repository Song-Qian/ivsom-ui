/**
 * Developer    :   SongQian
 * Time         :   2020-05-28
 * eMail        :   songqian@wtoe.cn
 * Description  :   radio组件
 */

import { Component, Prop, ProvideReactive, Watch } from 'vue-property-decorator'
import * as tsx from 'vue-tsx-support'
import uuid from '~/utils/uuid'

type Props = {
    //表单提交的Radio名字
    Name : string
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

    @Watch('value', {  immediate: false, deep: true })
    protected handlerChangeValue(value: string, oldValue: string) {
        let me = this;
        if(value !== oldValue && oldValue !== undefined) {
            me.$emit("on-change", value);
        }
    }

    protected mounted() {
        let me = this;
        me.$on("click", function(val: any) {
            me.$emit("input", val);
        })
    }

    protected render(): JSX.Element {
        let me = this;

        return (
            <div class="ivsom-radio-group">
                { me.$scopedSlots.default() }
            </div>
        )
    }

}