import { Component, Emit, InjectReactive, Prop, PropSync } from 'vue-property-decorator'
import * as tsx from 'vue-tsx-support'
import 'vue-tsx-support/enable-check'


type Props = {
    //绑定字段
    Prop: String,
    //显示字段
    Label: String,
    //选中的值
    Value: any | any[],
    //数据源
    DataSource: Array<any>,
    //是否多选
    Multiple: Boolean
    //描述提示信息
    Placeholder: String
    //头部 icon
    Prefix: String
    //尾部 icon
    Suffix: String
    //width
    Width: String | Number
    //表单大小
    Size: 'medium' | 'small' | 'mini',
    //展开动作
    Method: 'hover' | 'click',
    //禁用
    Disabled: Boolean
}

type Event = {
    onExpansion: (e: MouseEvent) => void,
    onReduction: (e: MouseEvent) => void
}

type ScopedSlots = {
    prefix: String
    suffix: String
}

@Component
export default class iVsomSelect extends tsx.Component<Props, Event, ScopedSlots> {

    constructor() {
        super()
    }

    @Prop({ default: 220 }) readonly width !: string | number;

    @Prop({ default: 'medium' }) readonly size !: 'medium' | 'small' | 'mini';

    @Prop({ default: '' }) readonly prefix !: string;

    @Prop({ default: '' }) readonly suffix !: string;

    @Prop({ default: '' }) readonly placeholder !: string;

    @Prop({ default: 'click' }) readonly method !: string;

    @Prop({ default: '' }) readonly prop !: string;

    @Prop({ default: '' }) readonly label !: string;

    @PropSync('value', { default: null }) syncedValue !: any | any[];

    @Prop({ default: [] }) readonly dataSource !: Array<any>;

    @Prop({ default: false, type: Boolean }) readonly multiple !: boolean;

    @Prop({ default: false, type: Boolean }) readonly disabled !: boolean;

    @InjectReactive({ from: Symbol.for('validate'), default: true }) validate !: boolean;

    @InjectReactive({ from: Symbol.for('trigger'), default: 'blur' }) trigger !: 'blur' | 'change';

    @Emit()
    protected onChange(e: MouseEvent, value: any) {
        let me = this;
        if (me.multiple) {
            let isPush = me.syncedValue && me.syncedValue.indexOf(value) === -1;
            if (!me.syncedValue) {
                me.syncedValue = [value];
                if (me.trigger === 'change') {
                    me.$vnode.componentInstance?.$parent.$emit('on-validate');
                }
            } else if (isPush) {
                me.syncedValue = [...me.syncedValue, value];
                if (me.trigger === 'change') {
                    me.$vnode.componentInstance?.$parent.$emit('on-validate');
                }
            }
            return;
        }
        me.$emit("input", value)
    }

    @Emit()
    protected onRemove(e: MouseEvent, value: any) {
        let me = this;
        if (me.syncedValue instanceof Array) {
            var newValue = me.syncedValue.filter(it => it !== value);
            me.syncedValue = newValue;
            if (me.trigger === 'change') {
                me.$vnode.componentInstance?.$parent.$emit('on-validate');
            }
        }
    }

    @Emit()
    protected onBlur(e: FocusEvent) {
        let me = this;
        if (me.trigger === 'change') {
            me.$vnode.componentInstance?.$parent.$emit('on-validate');
        }
    }


    protected render(): JSX.Element {
        const me = this;
        const prefixEl = (me.$scopedSlots.prefix ? <div class='ivsom-select__prefix'>{me.$scopedSlots.prefix && me.$scopedSlots.prefix(me.prefix)}</div> :
            me.prefix ? <div class='ivsom-input__prefix'><i class={['iconfont', me.prefix]}></i></div> :
                null)
        const suffixEl = (me.$scopedSlots.suffix ? <div class='ivsom-input__suffix'>{me.$scopedSlots.suffix && me.$scopedSlots.suffix(me.suffix)}</div> :
            me.suffix ? <div class='ivsom-input__suffix'><i class={['iconfont', me.suffix]}></i></div> :
                null)
        const dropdownItem = me.dataSource.map((it, n) => {
            return <li class={{ 'ivsom-select__option__disabled': it.disabled }} onClick={tsx.modifiers.stop((e: MouseEvent) => !it.disabled ? me.onChange.apply(me, [e, it]) : void 0)}>{it[me.label]}</li>;
        })
        const ctx_items = !me.syncedValue || !me.syncedValue.length ? <span class="ivsom-select_placeholder">{me.placeholder}</span> : me.syncedValue instanceof Array ? me.syncedValue.map((it, n) => <span class="ivsom-select_label_item"><small>{it[me.label]}</small><i class="iconfont icon-gongnengtubiao-41" onClick={tsx.modifiers.stop((e) => me.onRemove.apply(me, [e, it]))}></i></span>) : <span class="ivsom-select_label">{me.syncedValue[me.label]}</span>;
        const w = typeof me.width === 'number' ? `${me.width}px` : me.width;
        return (
            <div class={{ "ivsom-select": true, ['ivsom-select__' + me.size]: true, 'ivsom-select__multiple': me.multiple, 'ivsom-select__disabled': me.disabled, 'ivsom-select__focus': me.method === 'click' && !me.disabled, 'ivsom-select__hover': me.method === 'hover' && !me.disabled }} onBlur={tsx.modifiers.stop(me.onBlur)} style={{ width: w }} tabindex={999}>
                <div class="ivsom-select__warpper">
                    {prefixEl}
                    <div class="ivsom-select__ctx">
                        {ctx_items}
                    </div>
                    {suffixEl}
                    <div class="ivsom-select__dropdown"><i class="iconfont icon-gongnengtubiao-31"></i></div>
                </div>
                <div class="ivsom-select__dropArea">
                    <ul class="ivsom-select__options">
                        {dropdownItem}
                    </ul>
                </div>
            </div>
        )
    }
}