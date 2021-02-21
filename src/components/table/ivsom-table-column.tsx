/**
 * Developer    :   SongQian
 * Time         :   2021-01-01
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   Table 表格头部
 */

 import * as tsx from 'vue-tsx-support'
 import { Component, Emit, InjectReactive, Prop, Ref } from 'vue-property-decorator'
 
 import 'vue-tsx-support/enable-check'

 type Props = {
    //列的宽度
    Width: Number | String
    //是否固定列
    Flex: Boolean
    //固定列位置
    FlexAlign: "start" | "end"
    //头部标题对齐方式
    HeaderAlign: 'left' | 'center' | 'right'
    //列内容对齐方式
    Align: 'left' | 'center' | 'right'
    //表格的单元格样式
    ColStyle: (rowIndex: number, row: any) => Object
    //列标题
    Title : String
    //列字段
    Field : String
    //是否启用排序
    Sort : Boolean
 }

 type ScopedSlots = {
     default: void
     title : void
     row: any
 }

 @Component
 export default class iVsomTableColumn extends tsx.Component<Props, any, ScopedSlots> {

    @Prop({ default : 'auto' }) readonly width !: number | string;
    @Prop({ default : false, type: Boolean}) readonly flex !: boolean;
    @Prop({ default : 'start' }) readonly flexAlign !: "start" | "end";
    @Prop({ default : '', type: String }) readonly title !: string;
    @Prop({ default : '', required: true}) readonly field !: string;
    @Prop({ default : 'left' }) headerAlign !: 'left' | 'center' | 'right';
    @Prop({ default : 'left' }) align !: 'left' | 'center' | 'right';
    @Prop({ default: false, type: Boolean }) readonly sort !: boolean;
    @Prop({ default: void 0 }) readonly colStyle !: (rowIndex: number, row: any) => Object;

    @InjectReactive({ from: Symbol.for('table_source'), default: [] }) source !: Array<any>;
    @InjectReactive({ from: Symbol.for('table_stripe'), default: false }) stripe !: boolean;
    @InjectReactive({ from: Symbol.for('table_body_diff'), default : 0 }) bodyDiff !: number;
    @InjectReactive({ from: Symbol.for('table_sort_field'), default : '' }) sortField !: string ;
    @InjectReactive({ from: Symbol.for('table_row_light'), default: false}) highlightRow !: boolean;
    @InjectReactive({ from: Symbol.for('table_highlight_index'), default: -1 }) highlightIndex !: number;
    @InjectReactive({ from: Symbol.for('table_row_style'), default : void 0 }) rowStyle !: (rowIndex: number, row: any) => Object;

    @Ref('ivsom_table_header')
    private domHeader !: HTMLDivElement;
    @Ref('ivsom_table_row')
    private rowWapper !: HTMLDivElement;

    private hDomHeight : number = 0;
    private bDomHeight : number = 0;
    private asc : boolean = true;

    private get calcWidth() : string {
        let me = this;
        return typeof me.width === 'string' ? me.width : me.width + 'px';
    }

    @Emit()
    protected onSortChange(e : MouseEvent, field : string, sort : string) {
        let me = this;
        me.asc = !me.asc;
        me.$parent.$emit('on-table-sort', field, sort);
    }

    @Emit()
    protected onMouseEnterRow(e : MouseEvent, row: any, i: number) {
        let me = this;
        me.$parent.$emit('on-row-highlight', i)
    }

    protected beforeMount() {
        let me = this;
        me.$once('on-header-render', (h: number) => me.hDomHeight = h);
        me.$once('on-body-render', (inner: any) => me.bDomHeight = inner.bodyH);
        me.$on('on-table-sort', (field: string, sort: string) => me.$parent.$emit('on-table-sort', field, sort));
        me.$on('on-row-highlight', (rowIndex: number) => me.$parent.$emit('on-row-highlight', rowIndex));
        me.$on('on-cell-click', (e: MouseEvent, r: any, i: number, field: string) => me.$parent.$emit('on-cell-click', e, r, i, field));
        me.$on('on-cell-dbclick', (e: MouseEvent, r: any, i: number, field: string) => me.$parent.$emit('on-cell-dbclick', e, r, i, field));
    }

    protected mounted() {
        let me = this;
        me.$parent.$emit('on-header-render', me.domHeader.offsetHeight + me.hDomHeight)
        me.$parent.$emit('on-body-render',{ bodyH : ((me.rowWapper && me.rowWapper.offsetHeight) | 0) + me.bDomHeight })
    }

    protected render() : JSX.Element {
        let me = this;
        let rows = !me.$scopedSlots.default && me.source.map((r, i) => {
            var rStyle = me.rowStyle && me.rowStyle(i, r);
            var cStyle = me.colStyle && me.colStyle(i, r[me.field]);
            return (
                <div 
                    class={{ 'ivsom-table-row' : true, 'ivsom-table__stripe' : me.stripe && i % 2 === 0, 'ivsom-table__hover' : me.highlightRow && me.highlightIndex === i }}  
                    style={{ 'text-align' : me.align, ...rStyle, ...cStyle }}
                    title={ r[me.field] }
                    onClick={ tsx.modifiers.stop((e : MouseEvent) => me.$parent.$emit('on-cell-click', e, r, i, me.field))}
                    onDblclick={tsx.modifiers.stop((e : MouseEvent) => me.$parent.$emit('on-cell-dbclick', e, r, i, me.field)) }
                    onMouseenter={ tsx.modifiers.stop((e) => me.onMouseEnterRow(e, r, i))}>
                    <div class="ivsom-table-col">{ me.$scopedSlots.row && me.$scopedSlots.row(r) || r[me.field] }</div>
                </div>
            )
        }) || null;
        return (
            <div class={{ "ivsom-table-column": true, "ivsom-table__flex" : me.flex, "ivsom-table__flex_start" : me.flexAlign === 'start' && me.flex, "ivsom-table__flex_end" : me.flexAlign === 'end' && me.flex }}
                style={{ 'flex' : me.width === "auto" ? '1 1 auto' : `0 0 ${me.calcWidth}`, width : me.width === "auto" ? 'max-content' : '0' }}>
                <div class="ivsom-table-column__wapper">
                    <div ref={ 'ivsom_table_header' } class={{ 'ivsom-table-header' : true }} style={{ 'text-align' : me.headerAlign }}>
                        { me.$scopedSlots.title ? me.$scopedSlots.title() : me.title }
                        { me.sort ? 
                            <span class={{ 'ivsom-table-field-sort' : true, 'ivsom-table-sort__active' : me.sortField === me.field }} onClick={ tsx.modifiers.stop((e) => me.onSortChange(e, me.field, me.asc ? 'desc' : 'asc' )) }>
                                { me.asc ? <i class="iconfont icon-gongnengtubiao-30"></i> : <i class="iconfont icon-gongnengtubiao-31"></i> }
                            </span> : null 
                        }
                    </div>
                    <div class="ivsom-table-body">
                        <div class="ivsom-table-body__wapper">
                            {
                                me.$scopedSlots.default ? me.$scopedSlots.default() : (
                                    <div ref="ivsom_table_row" class="ivsom-table-row_wapper" style={{ "margin-top" : `-${me.bodyDiff}px` }}>
                                        { rows }
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }

 }