/**
 * Developer    :   SongQian
 * Time         :   2020-05-09
 * eMail        :   songqian@wtoe.cn
 * Description  :   Tabs 组件
 */

 import * as tsx from 'vue-tsx-support'
 import { Component, Prop, Provide, Emit, Ref } from 'vue-property-decorator'

 type Props = {
    // Tabs 宽度
    Width : number | string
    // Tabs 高度
    Height : number | string
    // Tabs Pages 被选中的值
    Value : string
    // Tab Panel 是否响应式容器大小
    Flex : Boolean
    // Tab Label 是否自撑开宽度
    Stretch : Boolean
    //Tabs 外形样式定义
    Type : 'default' | 'card' | 'nav'
 }

 type ScopedSlots = {
     default : void
 }

 @Component
 export default class iVsomTabs extends tsx.Component<Props, any, ScopedSlots> {

    constructor() {
        super()
        this.onTabsChange = this.onTabsChange.bind(this);
    }

    @Prop({ default : '100%' }) readonly Width !: number;

    @Prop({ default : 'auto' }) readonly Height !: number;

    @Prop({ default : '' }) readonly Value !: string;

    @Prop({ default : false, type : Boolean}) readonly Flex !: boolean;

    @Prop({ default : false, type : Boolean }) readonly Stretch !: boolean;

    @Prop({ default : 'default' }) readonly Type !: string;

    @Ref('tabs-nav__prev') protected readonly nav_prev !: HTMLElement;

    @Ref('tabs-nav__next') protected readonly nav_next !: HTMLElement;

    @Ref('root_tabs') protected readonly root_tabs !: HTMLElement;

    @Ref('tab-nav') protected readonly tabs_nav !: HTMLElement;

    private isScroll : boolean = false;

    protected get panes() {
        const me = this;
        const paneScopedSlots = me.$scopedSlots.default && me.$scopedSlots.default()?.filter(c => c.componentOptions?.Ctor.name === 'iVsomTabsPanel' );
        paneScopedSlots?.forEach(c => c.parent = (me as any));
        return paneScopedSlots;
    }

    private get _width() : string {
        const me = this;
        return typeof me.Width === 'number' ? `${me.Width}px` : me.Width;
    }

    private get _height() : string {
        const me = this;
        return typeof me.Height === 'number' ? `${me.Height}px` : me.Height;
    }

    private _active(pane : any) : string {
        const me = this;
        return me.Value &&  (pane.componentOptions?.propsData as any).Index === me.Value  ? 'active' : '';
    }

    @Emit()
    protected onTabsChange(e: MouseEvent, activeName : string) : void {
        const me = this;
        me.$emit('input', activeName);
    }

    protected updated() {
        const me = this;
        me.isScroll = me.root_tabs.clientWidth < me.tabs_nav.clientWidth;
    }

    protected mounted() {
        const me = this;
        me.isScroll = me.root_tabs.clientWidth < me.tabs_nav.clientWidth;
    }

    protected render() : JSX.Element {
        const me =this;
        const tabs = (<div class='ivsom-tabs__context'>{ me.panes }</div> );
        const navs = me.panes?.map((pane, i) => 
            <li class={ me._active(pane) } key={ i } onClick={ (e) => me.onTabsChange.apply(me, [e, (pane.componentOptions?.propsData as any).Index || '']) } >
                <span title={ (pane.componentOptions?.propsData as any).Name || '' }>{ (pane.componentOptions?.propsData as any).Name || '' }</span>
            </li>
        );

        const tabClass = me.Type === 'card' ? 'ivsom-tabs__card' : me.Type === 'nav' ? 'ivsom-tabs__nav' : '';

        return (
            <div class={ ['ivsom-tabs', tabClass] } style={ `width : ${me._width}; height : ${me._height};` } ref='root_tabs'>
                <div class={ { 'ivsom-tabs-nav__scroll' : true, 'ivsom-tabs-nav__isScroll' : me.isScroll } }>
                    <span class='ivsom-tabs-nav__prev' ref='tabs-nav__prev'><i class='iconfont icon-gongnengtubiao-28' /></span>
                    <span class='ivsom-tabs-nav__next' ref='tabs-nav__next'><i class='iconfont icon-gongnengtubiao-29' /></span>
                    <div style='display: block; overflow: hidden; margin-bottom: -1px;'>
                        <ul class={ { 'ivsom-tabs-nav' : true, 'ivsom-tabs-nav__isStretch' : me.Stretch } } ref='tab-nav'> { navs } </ul>
                    </div>
                </div>
                { tabs }
            </div>
        )
    }

 }