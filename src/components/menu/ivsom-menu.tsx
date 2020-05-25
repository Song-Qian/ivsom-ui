/**
 * Developer    :   SongQian
 * Time         :   2020-05-15
 * eMail        :   songqian@wtoe.cn
 * Description  :   Menu 组件
 */

 import * as tsx from 'vue-tsx-support'
 import { Component, Prop, Emit, Watch } from 'vue-property-decorator'

 type Props = {
    Search : Boolean
    Dark : Boolean
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

    private aside : Boolean = false;

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
            const deepMenuFilter = (children : any, text : string, deepNumber : number) : any => {
                const submenu = children.componentInstance?.$scopedSlots.submenu && children.componentInstance.$scopedSlots.submenu(children) || null;
                if(submenu instanceof Array) {
                    submenu.forEach((item, n) => {
                        deepMenuFilter.apply(item)
                    })
                }
                
            }
            me.$scopedSlots.default()?.forEach(it => {
                const text = (it.componentInstance?.$el as any).innerText;
                const children = it.componentInstance?.$scopedSlots.submenu && it.componentInstance.$scopedSlots.submenu(it) || null;
                deepMenuFilter(children, text, 0);
            });
        }
    }

    protected render() : JSX.Element {
        const me = this;
        const filterEl = me.search ? (<div class="ivsom-menu__search"><i class='iconfont icon-gongnengtubiao-44'></i><input type='text' placeholder="搜索"  onInput={ (e) => { me.onMenuFilter(e as InputEvent) } } /></div>) : null;

        return (
            <div class={ { 'ivsom-menu' : true, 'ivsom-menu-dark' : me.dark, 'ivsom-menu-aside' : me.aside } }>
                <i class="iconfont icon-gongnengtubiao-74" style='font-size:36px; cursor:pointer;' onClick={ () =>  me.aside = !me.aside }></i>
                { filterEl }
                <div class='ivsom-menu__wrap'>
                    <ul class='ivsom-menu__panel'>
                        { me._panes()  }
                    </ul>
                </div>
            </div>
        )
    }
 }