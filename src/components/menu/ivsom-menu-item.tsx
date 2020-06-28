/**
 * Developer    :   SongQian
 * Time         :   2020-05-15
 * eMail        :   songqian@wtoe.cn
 * Description  :   Menu 组件
 */

 import * as tsx from 'vue-tsx-support'
 import { Component, Prop, Emit, Watch, Inject } from 'vue-property-decorator'

 import 'vue-tsx-support/enable-check'

 type Props = {
    // 菜单项图标
    Icon : String
    // 禁用菜单项
    Disabled : Boolean
    // 菜单点击跳转路径
    Href : String
 }

 type ScopedSlots = {
     default : void,
     submenu : void
 }

 @Component
 export default class iVsomMenuItem extends tsx.Component<Props, any, ScopedSlots> {

    constructor() {
        super()
    }

    @Prop({ default : '', type : String }) readonly icon !: string;

    @Prop({ default : false, type: Boolean }) readonly disabled !: boolean;

    @Prop({ default : '', type : String }) readonly href !: string;

    @Inject(Symbol.for('target')) target !: 'top' | 'blank' | 'parent' | 'self' | String;

    private collapse : boolean = false;

    private hasFilter : boolean = false;

    private get children() : JSX.Element | undefined{
        const me = this;
        const menuItemsScopedSlots = me.$scopedSlots.submenu && me.$scopedSlots.submenu()?.filter(c => c.componentOptions?.Ctor.name === 'iVsomMenuItem' );
        menuItemsScopedSlots?.forEach(c => c.parent = (me as any));
        return menuItemsScopedSlots ? <ul class={ ['ivsom-menu__panel', me.collapse ? '' : 'ivsom-menu__hide'] }>{ menuItemsScopedSlots }</ul> : undefined;
    }

    private __handlerRoot() : any {
        const me = this;
        const deep = (parent : any) : boolean => {
            if(parent.$vnode.componentOptions?.Ctor.name === "iVsomMenu")
                return parent;
            return deep(parent.$parent);
        }
        return deep(me);
    }

    private __handlerLevels() : number {
        const me = this;
        const deep = (parent : any) : number => {
            if(parent.$vnode.componentOptions?.Ctor.name !== "iVsomMenuItem" )
                return 0;
            return 1 + deep(parent.$parent)
        }
        return deep(me.$parent);
    }

    private __handlerHideNode() : void {
        const me = this;
        me.hasFilter = true;
    }

    private __handlerShowNode() : void {
        const me = this;
        me.hasFilter = false;
    }

    @Emit()
    protected onMenuItemClick(e : MouseEvent, aside : boolean, horizontal : boolean) {
        const me = this;
        //当菜单为默认模式，则由点击事件控制菜单项的展开和关闭
        const rootMenu = me.__handlerRoot();
        rootMenu.$emit('on-menu-item-click', e);
        if(!aside && !horizontal) {
            me.collapse = !me.collapse;
        }

        if(me.href) {
            switch(me.target) {
                case "top" :
                    window.top.location.href = me.href;
                    break;
                case "parent" :
                    window.parent.location.href = me.href;
                    break;
                case "self" : 
                    window.location.href = me.href;
                    break;
                case "blank" :
                    window.top.open(me.href, '_blank');
                    break;
                default:
                    window.top.frames[me.target as any].location.href = me.href;
            }
        }
    }

    @Emit()
    protected onMenuItemMouseIn(e : MouseEvent, aside : boolean, horizontal : boolean) {
        const me = this;
        //当菜单为收缩列表项模式或者水平导航模式，则点鼠标的移入控制展开
        if(aside || horizontal) {
            me.collapse = true;
        }
    }

    @Emit()
    protected onMenuItemMouseOut(e : MouseEvent, aside : boolean, horizontal : boolean) {
        const me = this;
        //当菜单为收缩列表项模式或者水平导航模式，则点鼠标的移出控制关闭
        if(aside || horizontal) {
            me.collapse = false;
        }
    }

    protected render() : JSX.Element {
        const me = this;
        const { aside, horizontal } = me.__handlerRoot();
        const childrenEl = me.children;
        const indent = me.__handlerLevels();
        const iconEl = me.icon ? <div class="ivsom-menu__icon"><i class={ ['iconfont', me.icon] } ></i></div> : <i class="iconfont">&nbsp;</i>;
        const collapseEl = childrenEl ? <div class="ivsom-menu__collapse"><i class={ ['iconfont', aside || horizontal && indent > 0 ? 'icon-gongnengtubiao-29' : me.collapse ? 'icon-gongnengtubiao-30' : 'icon-gongnengtubiao-31'] }></i></div> : <div class="ivsom-menu__collapse"></div>;
        const m = tsx.modifiers;

        return (
            <li 
                class={{ 'ivsom-menu-item' : true, 'ivsom-sub-menu' : !!childrenEl, 'ivsom-menu-item__isDisabled' : me.disabled, 'ivsom-menu-item__isFileter' : me.hasFilter,  [`ivsom-menu-item__indent_${indent}X`] : true }} 
                onClick={ m.stop((e : MouseEvent) => { !me.disabled ? me.onMenuItemClick(e, aside, horizontal) : void 0 }) }
                onMouseenter={ m.stop((e : MouseEvent) => { !me.disabled ? me.onMenuItemMouseIn(e, aside, horizontal) : void 0 }) } 
                onMouseleave={ m.stop((e : MouseEvent) => { !me.disabled ? me.onMenuItemMouseOut(e, aside, horizontal) : void 0 }) }>
                { iconEl }
                <div class="ivsom-menu__text"><span>{ me.$scopedSlots.default() }</span></div>
                { collapseEl }
                { childrenEl }
            </li>
        )
    }
 }