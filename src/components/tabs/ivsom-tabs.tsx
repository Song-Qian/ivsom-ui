/**
 * Developer    :   SongQian
 * Time         :   2020-05-09
 * eMail        :   songqian@wtoe.cn
 * Description  :   Tabs 组件
 */

 import * as tsx from 'vue-tsx-support'
 import { Component, Prop, Emit, Ref, Watch } from 'vue-property-decorator'

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
    //Tabs Nav 关闭按钮
    Closable : Boolean
    //Tabs Nav 新增按钮
    Opne : Boolean
 }

 type ScopedSlots = {
     default : void
 }

 @Component
 export default class iVsomTabs extends tsx.Component<Props, any, ScopedSlots> {

    constructor() {
        super()
        this.onTabsChange = this.onTabsChange.bind(this);
        this.onTabsNavClose = this.onTabsNavClose.bind(this);
    }

    @Prop({ default : '100%' }) readonly width !: number;

    @Prop({ default : 'auto' }) readonly height !: number;

    @Prop({ default : '' }) readonly value !: string;

    @Prop({ default : false, type : Boolean}) readonly flex !: boolean;

    @Prop({ default : false, type : Boolean }) readonly stretch !: boolean;

    @Prop({ default : 'default' }) readonly type !: string;

    @Prop({ default : false, type : Boolean }) readonly closable !: boolean;

    @Prop({ default : false, type : Boolean }) readonly open !: boolean;

    @Ref('tabs-nav__prev') protected readonly nav_prev !: HTMLElement;

    @Ref('tabs-nav__next') protected readonly nav_next !: HTMLElement;

    @Ref('root_tabs') protected readonly root_tabs !: HTMLElement;

    @Ref('tab-nav') protected readonly tabs_nav !: HTMLElement;

    @Ref('tabs-nav-container') protected readonly tabs_nav_container !: HTMLElement;

    private isScroll : boolean = false;

    //当前移动距离
    private move_dist : number = 0;

    //可轨道运动距离
    private run_dist : number = 0;

    //轨道运动方向： 左
    private moving_prev : boolean = false;

    //轨道运动方向： 右
    private moving_next : boolean = false;

    private _panes() {
        const me = this;
        const paneScopedSlots = me.$scopedSlots.default && me.$scopedSlots.default()?.filter(c => c.componentOptions?.Ctor.name === 'iVsomTabsPanel' );
        paneScopedSlots?.forEach(c => c.parent = (me as any));
        return paneScopedSlots;
    }

    private get _width() : string {
        const me = this;
        return typeof me.width === 'number' ? `${me.width}px` : me.width;
    }

    private get _height() : string {
        const me = this;
        return typeof me.height === 'number' ? `${me.height}px` : me.height;
    }

    private _active(pane : any) : string {
        const me = this;
        return (typeof me.value === 'number' || me.value) &&  (pane.componentOptions?.propsData as any).index === me.value  ? 'active' : '';
    }

    @Watch('moving_prev')
    protected onTabsNavMoving_Prev() {
        const me = this;
        if(me.moving_prev) {
            const while_deep = window.setTimeout;
            const move_handler = () => {
                if(me.moving_prev) {
                    me.move_dist = Math.abs(me.move_dist) < me.run_dist && me.move_dist - 2 || -me.run_dist;
                    while_deep(move_handler, 0);
                }
            }
            while_deep(move_handler, 0);
        }
    }

    @Watch('moving_next')
    protected onTabsNavMoving_Next() {
        const me = this;
        if(me.moving_next) {
            const while_deep = window.setTimeout;
            const move_handler = () => {
                if(me.moving_next) {
                    me.move_dist = me.move_dist < 0 && me.move_dist + 2 || 0;
                    while_deep(move_handler, 0);
                }
            };
            while_deep(move_handler, 0);
        }
    }

    //tabs nav 切换事件
    @Emit()
    protected onTabsChange(e: MouseEvent, activeName : string) : void {
        const me = this;
        me.$emit('input', activeName);
    }

    //tabs nav 关闭事件
    @Emit()
    protected onTabsNavClose(e : MouseEvent, index : string) {
        const me = this;
        const els = me._panes()?.filter(vnode => vnode.componentInstance?.$props.index === index);
        if(els?.length) {
            return els[0].componentInstance;
        }
        return null;
    }

    protected updated() {
        const me = this;
        me.isScroll = me.root_tabs.clientWidth < me.tabs_nav.clientWidth;
        if(me.isScroll) {
            me.run_dist = me.tabs_nav.clientWidth - me.tabs_nav_container.clientWidth;
        }
    }

    protected mounted() {
        const me = this;
        me.isScroll = me.root_tabs.clientWidth < me.tabs_nav.clientWidth;
        if(me.isScroll) {
            me.run_dist = me.tabs_nav.clientWidth - me.tabs_nav_container.clientWidth;
        }
    }

    protected render() : JSX.Element {
        const me =this;
        const m = tsx.modifiers;
        const tabs = (<div class='ivsom-tabs__context'>{ me._panes() }</div> );
        const navs = me._panes()?.map((pane, i) => 
            <li class={ me._active(pane) } key={ i } onClick={ (e) => me.onTabsChange.apply(me, [e, (pane.componentOptions?.propsData as any).index || '']) } >
                <span class={ { 'isClosable' : me.closable } } title={ (pane.componentOptions?.propsData as any).name || '' }>
                    { (pane.componentOptions?.propsData as any).name || '' }
                </span>
                { me.closable ?  <i class='iconfont icon-gongnengtubiao-41' onClick={ m.prevent.stop( e => me.onTabsNavClose.apply(me, [e, (pane.componentOptions?.propsData as any).index]) ) }></i> : null }
            </li>
        );

        const tabClass = me.type === 'card' ? 'ivsom-tabs__card' : me.type === 'nav' ? 'ivsom-tabs__nav' : '';

        return (
            <div class={ ['ivsom-tabs', tabClass] } style={ `width : ${me._width}; height : ${me._height};` } ref='root_tabs'>
                <div class={ { 'ivsom-tabs-nav__scroll' : true, 'ivsom-tabs-nav__isScroll' : me.isScroll } }>
                    <span class='ivsom-tabs-nav__prev' onMousedown={ m.left.stop( () => me.moving_prev = true ) } onMouseup={ m.left.stop( () => me.moving_prev = false ) } onMouseleave={ m.left.stop( () => me.moving_prev = false ) } ref='tabs-nav__prev'>
                        <i class='iconfont icon-gongnengtubiao-28' />
                    </span>
                    <span class='ivsom-tabs-nav__next' onMousedown={ m.left.stop( () => me.moving_next = true ) } onMouseup={ m.left.stop( () => me.moving_next = false ) } onMouseleave={ m.left.stop( () => me.moving_next = false ) } ref='tabs-nav__next'>
                        <i class='iconfont icon-gongnengtubiao-29' />
                    </span>
                    <div style='display: block; overflow: hidden; margin-bottom: -1px;' ref='tabs-nav-container'>
                        <ul class={ { 'ivsom-tabs-nav' : true, 'ivsom-tabs-nav__isStretch' : me.stretch } } style={ { 'transform' : `translateX(${me.move_dist}px)` } } ref='tab-nav'> { navs } </ul>
                    </div>
                </div>
                { tabs }
            </div>
        )
    }

 }