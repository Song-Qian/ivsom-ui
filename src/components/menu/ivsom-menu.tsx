/**
 * Developer    :   SongQian
 * Time         :   2020-05-15
 * eMail        :   songqian@wtoe.cn
 * Description  :   Menu 组件
 */

 import * as tsx from 'vue-tsx-support'
 import { Component, Prop, Emit, Ref } from 'vue-property-decorator'

 type Props = {
    //开启菜单筛选功能
    Search : Boolean
    //开启黑色皮肤
    Dark : Boolean
    //自定义过滤条件函数
    Filter : (children : any, text : string, deepNumber : number) => boolean
    //筛选功能输入文本，支持sync双向绑定
    SearchText : String
    //是否横向菜单
    Horizontal : boolean 
 }

 type ScopedSlots = {
    default : void
 }

 @Component
 export default class iVsomMenu extends tsx.Component<Props, any, ScopedSlots> {

    constructor() {
        super()
    }

    @Prop({ default : false, type : Boolean}) readonly search !: boolean;

    @Prop({ default : false, type : Boolean }) readonly dark !: boolean;

    @Prop({ default : void 0 }) readonly filter !: (children : any, text : string, deepNumber : number) => boolean;

    @Prop({ default: '', type : Boolean }) readonly searchText !: string;

    @Prop({ default : false, type : Boolean}) readonly horizontal !: boolean;

    @Ref('search_input') readonly search_input !: JSX.Element;

    @Ref('ivsom_menu_warp') protected readonly menu_warp !: HTMLElement;

    private aside : boolean = false;

    private unfold : boolean = false;

    private iVsomMenuItem !: JSX.Element[] | null;

    private iVsomMenuItemOther !: JSX.Element | null;

    private _panes() : JSX.Element[] | undefined {
        const me = this;
        const menuItemsScopedSlots = me.$scopedSlots.default && me.$scopedSlots.default()?.filter(c => c.componentOptions?.Ctor.name === 'iVsomMenuItem' );
        menuItemsScopedSlots?.forEach(c => c.parent = (me as any));
        return menuItemsScopedSlots;
    }

    // Menu 过滤菜单事件
    @Emit()
    protected onMenuFilter(e : InputEvent) {
        const me = this;
        if(!!me.$scopedSlots.default) {
            const { value } = e.target as any;
            me.$emit("update:search-text", value);
            const deepMenuFilter = (elm : any, text : string, deepNumber : number) : any => {
                if(elm.$children instanceof Array && elm.$children.length) {
                    elm.$children.forEach((item: any, n: any) => {
                        const text = item.$slots.default.map((it : any) => it.text).join('').replace(/(^\s+)|(\s+)$/g, '');
                        deepMenuFilter.apply(null, [item, text, deepNumber + 1]);
                    })
                }
                elm.__handlerShowNode();
                if( me.filter && me.filter(elm, text, deepNumber) ) {
                    elm.__handlerHideNode();
                }
            }
            me.$children.forEach((it, n) => {
                const text = (it.$vnode.componentInstance?.$el as any).innerText;
                deepMenuFilter(it.$vnode.componentInstance, text, 0);
            });
        }
    }

    protected onSearchUnfold(e : any) : boolean {
        const me = this;
        if(me.horizontal) {
            me.unfold = !me.unfold;
            me.$nextTick(() => {
                me.unfold && (me.$refs.search_input as any).focus();
                me.unfold ? me.$emit('on-search-activation', e) : me.$emit('on-search-deactivated', e);
                setTimeout(() => {
                    const menuItemsScopedSlots = me._panes();
                    let maxItem =  me.menu_warp.clientWidth % 180 < 60 ? Math.floor(me.menu_warp.clientWidth / 180) - 1 : Math.floor(me.menu_warp.clientWidth / 180);
                    me.iVsomMenuItem = menuItemsScopedSlots || null;
                    me.iVsomMenuItemOther = null;
                    if(me.horizontal && (menuItemsScopedSlots?.length || 0) > maxItem) {
                         me.iVsomMenuItem = [ ...menuItemsScopedSlots?.slice(0, maxItem)] || null;
                         me.iVsomMenuItemOther = (
                            <i-vsom-menu-item class="ivsom-menu-item__other" icon="icon-gongnengtubiao-135" scopedSlots={{ default : () => void 0, submenu : () => menuItemsScopedSlots?.slice(maxItem, menuItemsScopedSlots.length) || null }}>
            
                            </i-vsom-menu-item>
                         )
                    }
                    me.$forceUpdate();
                }, me.unfold ? 0 : 300);
            })
        }

        return me.unfold;
    }

    protected mounted() : void {
        const me = this;
        const menuItemsScopedSlots = me._panes();
        let maxItem =  me.menu_warp.clientWidth % 180 < 60 ? Math.floor(me.menu_warp.clientWidth / 180) - 1 : Math.floor(me.menu_warp.clientWidth / 180);
        me.iVsomMenuItem = menuItemsScopedSlots || null;
        me.iVsomMenuItemOther = null;
        if(me.horizontal && (menuItemsScopedSlots?.length || 0) > maxItem) {
             me.iVsomMenuItem = [ ...menuItemsScopedSlots?.slice(0, maxItem)] || null;
             me.iVsomMenuItemOther = (
                <i-vsom-menu-item class="ivsom-menu-item__other" icon="icon-gongnengtubiao-135" scopedSlots={{ default : () => void 0, submenu : () => menuItemsScopedSlots?.slice(maxItem, menuItemsScopedSlots.length) || null }}>

                </i-vsom-menu-item>
             )
        }
        me.$forceUpdate();
        
        // me.$on('on-menu-item-click', () => ));
    }

    protected render() : JSX.Element {
        const me = this;
        const m = tsx.modifiers;
        const filterEl = me.search ? (
            <div class={ ["ivsom-menu__search", me.unfold ? 'ivsom-menu__search__unfold' : ''] } onClick={ m.stop(!me.unfold ? me.onSearchUnfold : () => void 0) } ref="search_warp">
                <i class='iconfont icon-gongnengtubiao-44'></i>
                <input ref="search_input" type='text' placeholder="搜索" onBlur={ m.stop(me.onSearchUnfold) } onClick={ m.stop(() => void 0) } onInput={ (e) => { me.onMenuFilter(e as InputEvent) } } autofocus={ me.unfold }/>
            </div>) : null;

        return (
            <div class={ { 'ivsom-menu' : true, 'ivsom-menu-dark' : me.dark, 'ivsom-menu-aside' : me.aside, 'ivsom-menu-horizontal' : this.horizontal } }>
                <i class="iconfont icon-gongnengtubiao-74" style='font-size:36px; cursor:pointer;' onClick={ () =>  me.aside = !me.aside }></i>
                { filterEl }
                <div class='ivsom-menu__wrap' ref="ivsom_menu_warp">
                    <ul class='ivsom-menu__panel'>
                        { me.iVsomMenuItem  }
                        { me.iVsomMenuItemOther }
                    </ul>
                </div>
            </div>
        )
    }
 }