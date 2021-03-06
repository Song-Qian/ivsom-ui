import { Component, Emit, InjectReactive, ModelSync, Prop } from 'vue-property-decorator'
import * as tsx from 'vue-tsx-support'
import 'vue-tsx-support/enable-check'

type Props = {
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

type ScopedSlots = {
    prefix: String
    suffix: String
}

@Component
export default class iVsomSelect extends tsx.Component<Props, any, ScopedSlots> {

    @Prop({ default: 220 }) readonly width !: string | number;

    @Prop({ default: 'medium' }) readonly size !: 'medium' | 'small' | 'mini';

    @Prop({ default: '' }) readonly prefix !: string;

    @Prop({ default: '' }) readonly suffix !: string;

    @Prop({ default: '' }) readonly placeholder !: string;

    @Prop({ default: 'click' }) readonly method !: string;

    @Prop({ default: '' }) readonly label !: string;

    @Prop({ default: [] }) readonly dataSource !: Array<any>;

    @Prop({ default: false, type: Boolean }) readonly multiple !: boolean;

    @Prop({ default: false, type: Boolean }) readonly disabled !: boolean;

    @ModelSync('value', 'on-update', { default : null }) syncedValue !: any | any[];

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
                    me.$parent.$emit('on-validate');
                }
            } else if (isPush) {
                me.syncedValue = [...(me.syncedValue as any[]), value];
                if (me.trigger === 'change') {
                    me.$parent.$emit('on-validate');
                }
            }
            return;
        }
        me.syncedValue = value;
    }

    @Emit()
    protected onRemove(e: MouseEvent, value: any) {
        let me = this;
        if (me.syncedValue instanceof Array) {
            var newValue = me.syncedValue.filter(it => it !== value);
            me.syncedValue = newValue;
            me.$emit("on-change", e, value);
            (me.$el as any).blur();
            if (me.trigger === 'change') {
                me.$parent.$emit('on-validate');
            }
        }
    }

    @Emit()
    protected onBlur(e: FocusEvent) {
        let me = this;
        if (me.trigger === 'blur') {
            me.$parent.$emit('on-validate');
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
        const ctx_items = !me.syncedValue || me.syncedValue instanceof Array  && !me.syncedValue.length ? <span class="ivsom-select_placeholder">{me.placeholder}</span> : me.syncedValue instanceof Array ? me.syncedValue.map((it, n) => <span class="ivsom-select_label_item"><small>{it[me.label]}</small><i class="iconfont icon-gongnengtubiao-41" onClick={tsx.modifiers.stop((e) => me.onRemove.apply(me, [e, it]))}></i></span>) : <span class="ivsom-select_label">{me.syncedValue[me.label]}</span>;
        const w = typeof me.width === 'number' ? `${me.width}px` : me.width;
        return (
            <div class={{ "ivsom-select": true, ['ivsom-select__' + me.size]: true, 'ivsom-select__multiple': me.multiple, 'ivsom-select__disabled': me.disabled, 'ivsom-select__hasError' : me.validate === false, 'ivsom-select__focus': me.method === 'click' && !me.disabled, 'ivsom-select__hover': me.method === 'hover' && !me.disabled }} onBlur={tsx.modifiers.stop(me.onBlur)} style={{ width: w }} tabindex={999}>
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