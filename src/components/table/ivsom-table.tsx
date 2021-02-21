/**
 * Developer    :   SongQian
 * Time         :   2021-01-01
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   Table 表格组件
 */

 import * as tsx from "vue-tsx-support"
 import { Component, Emit, Prop, ProvideReactive, Ref, Watch } from "vue-property-decorator"

 import 'vue-tsx-support/enable-check'

 type Props = {
    //表格的宽度
    Width: Number | String
    //表格的高度
    Height: Number | String
    //表格的行样式
    RowStyle: (rowIndex: number, row: any) => Object
    //是否显示边框
    Border: Boolean
    //是否显示斑马纹
    Stripe: Boolean
    //是否圆角
    Round: Boolean
    //是否高亮行
    HighlightRow: Boolean
    //数据源
    Source : Array<any>
    //空内容显示
    EmptyText: String
 }

 type ScopedSlots = {
     default: void
 }

 type EventsWithOn = {
    onCellClick : (e: MouseEvent, row : any, rowIndex: number, field: string) => void
    onCellDbclick : (e: MouseEvent, row : any, rowIndex: number, field: string) => void
    onRowHighlight : (rowIndex: number) => void
    onTableSort : (field: string, sort: string) => void
 }

 @Component
 export default class iVsomTable extends tsx.Component<Props, EventsWithOn, ScopedSlots> {

    @Prop({ default: '100%' }) readonly width !: number | string;
    @Prop({ default: 'auto' }) readonly height !: number | string;
    @ProvideReactive(Symbol.for('table_row_style')) @Prop({ default: void 0 }) readonly rowStyle !: (rowIndex: number, row: any) => Object;
    @Prop({ default: false, type: Boolean }) readonly border !: boolean;
    @ProvideReactive(Symbol.for('table_stripe')) @Prop({ default: false, type: Boolean }) readonly stripe !: boolean;
    @Prop({ default: true, type: Boolean }) readonly round !: boolean;
    @ProvideReactive(Symbol.for('table_row_light')) @Prop({ default: true, type: Boolean }) readonly highlightRow !: boolean;
    @ProvideReactive(Symbol.for('table_source')) @Prop({ default: [], type: Array }) readonly source !: Array<any>;
    @Prop({ default: '暂无数据', type: Boolean }) readonly emptyText !: string;

    @ProvideReactive(Symbol.for('table_body_diff')) bodyDiff : number = 0;
    @ProvideReactive(Symbol.for('table_sort_field')) sortField : string = '';
    @ProvideReactive(Symbol.for('table_highlight_index')) highlightIndex : number = -1;

    @Ref("ivsom_scroll_thumb")
    private scrollVerticalThumb !: HTMLDivElement;

    private headerHeight : number = 0;
    private bodyHeight : number = 0;
    private dragScroll = {
        isDrag : false,
        top: 0
    }

    private get calcWidth() : string {
        let me = this;
        return typeof me.width === 'string' ? me.width : me.width + 'px';
    }

    private get calcHeight() : string {
        let me = this;
        return typeof me.height === 'string' ? me.height : me.height + 'px';
    }

    private get calcScrollThumb() {
        let me = this;
        let h = (me.$el && (me.$el as any).offsetHeight) | 0;
        let sh = h - me.headerHeight;
        return { x : 0, y : (sh / me.bodyHeight * 100).toFixed(2) }
    }

    private get calcIsScrollable() : boolean {
        let me = this;
        if(me.height === 'auto') {
            return false;
        }

        return me.bodyHeight - me.headerHeight > me.height;
    }

    protected onScrollMoveTo(e: MouseEvent) {
        let me = this;
        me.dragScroll.isDrag = true;
        me.onMoveScroll(e);
        me.dragScroll.isDrag = false;
    }

    protected onDragScroll(e : MouseEvent) {
        let me = this;
        me.dragScroll.isDrag = true;
    }

    protected onMoveScroll(e : MouseEvent) {
        let me = this;
        if (me.dragScroll.isDrag) {
            // 当前表格整体高度
            let h = (me.$el && (me.$el as any).offsetHeight) | 0;
            //垂直滚动按钮高度
            let sh = (me.scrollVerticalThumb && me.scrollVerticalThumb.offsetHeight) | 0;
            //表格行容器高度
            let wh = h - me.headerHeight;
            //可以滚动落差
            let diff = wh - sh;
            me.dragScroll.top = e.offsetY - sh / 2;
            me.dragScroll.top = me.dragScroll.top > diff ? diff : me.dragScroll.top < 0 ? 0 : me.dragScroll.top;
            let top = Number(((me.bodyHeight / wh) * me.dragScroll.top).toFixed(2));
            me.bodyDiff = top >= me.bodyHeight ? me.bodyHeight : top;
        }
    }

    protected onDropDragScroll(e : MouseEvent) {
        let me = this;
        me.dragScroll.isDrag = false;
    }

    protected onTableScrollWheel(e: WheelEvent) {
        let me = this;
        //当前表格整体高度
        let h = (me.$el && (me.$el as any).offsetHeight) | 0;
        //垂直滚动按钮高度
        let sh = (me.scrollVerticalThumb && me.scrollVerticalThumb.offsetHeight) | 0;
        //表格行容器高度
        let wh = h - me.headerHeight;
        //可以滚动落差
        let diff = wh - sh;
        if (e.deltaY === 100) {
            //向下
            me.dragScroll.top += 1;
            me.dragScroll.top = me.dragScroll.top >= diff ? diff : me.dragScroll.top;
            let top = Number(((me.bodyHeight / wh) * me.dragScroll.top).toFixed(2));
            me.bodyDiff = top >= me.bodyHeight ? me.bodyHeight : top;
        } else if (e.deltaY === -100) {
            me.dragScroll.top -= 1;
            me.dragScroll.top = me.dragScroll.top < 0 ? 0 : me.dragScroll.top;
            let top = Number(((me.bodyHeight / wh) * me.dragScroll.top).toFixed(2));
            me.bodyDiff = top < 0 ? 0 : top;
        }
    }

    protected beforeMount() {
        let me = this;
        me.$once('on-header-render', (h: number) => me.headerHeight = h);
        me.$once('on-body-render', (b: any) => me.bodyHeight = b.bodyH);
        me.$on('on-table-sort', (field: string, sort: string) => me.sortField = field );
        me.$on('on-row-highlight', (rowIndex: number) => (me.highlightIndex = rowIndex) );
    }

    protected render() : JSX.Element {
        let me = this;
        
        return (
            <div class={{ "ivsom-table" : true, "ivsom-table-round" : me.round, 'ivsom-table-border' : me.border }} style={{ width: me.calcWidth, height: me.calcHeight }}>
                <div class="ivsom-table_wapper" style={{ height: Boolean(me.source && me.source.length) ? '100%' : `auto` }}  onWheel={ tsx.modifiers.prevent.stop((e) => { me.calcIsScrollable ? me.onTableScrollWheel(e) : void 0 }) }>
                    { me.$scopedSlots.default && me.$scopedSlots.default() }
                    { me.calcIsScrollable ? <div class="ivsom-table-scroll__vertical" style={{ height: `calc(100% - ${me.headerHeight}px)` }}
                        onMousemove={ tsx.modifiers.self.stop(me.onMoveScroll) }
                        onMouseleave={ tsx.modifiers.self.stop(me.onDropDragScroll) }
                        onClick={ tsx.modifiers.self.stop(me.onScrollMoveTo) }>
                        <div 
                            ref="ivsom_scroll_thumb" 
                            class="ivsom-table-scroll__thumb" 
                            style={{ height: `${me.calcScrollThumb.y}%`, top: `${me.dragScroll.top}px` }}
                            onMousedown={ me.onDragScroll }
                            onMouseup={ me.onDropDragScroll }></div>
                    </div> : null }
                </div>
                { Boolean(me.source && !me.source.length) ? <div class="ivsom-table__empty" style={{ height: `calc(100% - ${me.headerHeight}px)` }}>{ me.emptyText }</div> : null }
            </div>
        )
    }

 }
