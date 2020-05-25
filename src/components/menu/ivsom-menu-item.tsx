/**
 * Developer    :   SongQian
 * Time         :   2020-05-15
 * eMail        :   songqian@wtoe.cn
 * Description  :   Menu 组件
 */

 import * as tsx from 'vue-tsx-support'
 import { Component, Prop, Emit } from 'vue-property-decorator'

 import 'vue-tsx-support/enable-check'

 type Props = {
    Icon : String
    Disabled : Boolean
 }

 type ScopedSlots = {
     default : void,
     submenu : void
 }

 @Component
 export default class iVsomMenuItem extends tsx.Component<Props, any, ScopedSlots> {

    constructor() {
        super()
        this.onMenuItemClick = this.onMenuItemClick.bind(this);
    }

    @Prop({ default : '', type : String }) readonly icon !: string;

    @Prop({ default : false, type: Boolean }) readonly disabled !: boolean;

    private collapse : boolean = false;

    private get children() : JSX.Element | undefined{
        const me = this;
        const { aside } = me.__handlerRoot();
        const menuItemsScopedSlots = me.$scopedSlots.submenu && me.$scopedSlots.submenu()?.filter(c => c.componentOptions?.Ctor.name === 'iVsomMenuItem' );
        menuItemsScopedSlots?.forEach(c => c.parent = (me as any));
        return menuItemsScopedSlots ? <ul class={ ['ivsom-menu__panel', me.collapse && !aside ? '' : 'ivsom-menu__hide'] }>{ menuItemsScopedSlots }</ul> : undefined;
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

    }

    // private hasFilter(menu_search : string) : boolean {
        // const me = this;
        //(!!me.$scopedSlots?.submenu && !!menu_search && (me.$scopedSlots?.submenu() as any).every((it : any) => it.componentOptions.children.every((item : any ) => item.text.indexOf(menu_search) === -1)))
        // return (
        //     (!!!me.$scopedSlots?.submenu && !!menu_search) || 
        //     (!!me.$scopedSlots?.submenu && !!menu_search && (me.$scopedSlots?.submenu() as any).every((it : any) => it.componentOptions.children.every((item : any ) => item.text.indexOf(menu_search) === -1)))
        // ) && (me.$scopedSlots.default() as any).map((it : any) => it.text).join('').replace(/(^\s+)|(\s+)$/g, '').indexOf(menu_search) === -1;
        // return !!menu_search && ((me.$scopedSlots.default() as any).map((it : any) => it.text).join('').replace(/(^\s+)|(\s+)$/g, '').indexOf(menu_search) === -1 || me.$scopedSlots?.submenu && (me.$scopedSlots?.submenu() as any).every((it : any) => it.componentOptions.children.every((item : any ) => item.text.indexOf(menu_search) === -1)));
    // }

    @Emit()
    protected onMenuItemClick(e : MouseEvent) {
        const me = this;
        me.collapse = !me.collapse;
    }

    protected render() : JSX.Element {
        const me = this;
        const { aside, menu_search } = me.__handlerRoot();
        const childrenEl = me.children;
        const iconEl = me.icon ? <div class="ivsom-menu__icon"><i class={ ['iconfont', me.icon] } ></i></div> : <i class="iconfont">&nbsp;</i>;
        const collapseEl = childrenEl ? <div class="ivsom-menu__collapse"><i class={ ['iconfont', aside ? 'icon-gongnengtubiao-29' : me.collapse ? 'icon-gongnengtubiao-30' : 'icon-gongnengtubiao-31'] }></i></div> : null;
        const indent = me.__handlerLevels();
        const m = tsx.modifiers;

        return (
            <li 
                class={{ 'ivsom-menu-item' : true, 'ivsom-sub-menu' : !!childrenEl, 'ivsom-menu-item__isDisabled' : me.disabled, 'ivsom-menu-item__isFileter' : false,  [`ivsom-menu-item__indent_${indent}X`] : true }} 
                onClick={ m.stop(!me.disabled ? me.onMenuItemClick : () => void 0 ) } >
                { iconEl }
                <div class="ivsom-menu__text"><span>{ me.$scopedSlots.default() }</span></div>
                { collapseEl }
                { childrenEl }
            </li>
        )
    }
 }