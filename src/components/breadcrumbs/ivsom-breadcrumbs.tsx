/**
 * Developer    :   SongQian
 * Time         :   2020-04-21
 * eMail        :   songqian@wtoe.cn
 * Description  :   breadcrumbs组件
 */

import * as tsx from 'vue-tsx-support'
import { Component, Prop, PropSync, Emit } from 'vue-property-decorator'
import uuid from '~/utils/uuid'

interface Props {
    //面包屑层级数据
    Debris : Array<{ text : string,  to : string }>
    //是否开启跳转路由， 支持vue-router
    AutoRoute : boolean,
    //路由跳转链接文档方式
    Target : '_parent' | '_blank' | '_self' | '_top' | string,
    //分隔符样式
    Separator : string
}

type Event = {
    onJumpTo : (e : MouseEvent, key : string) => void
}

@Component
export default class iVsomBreadCrumbs extends tsx.Component<Props, Event> {
    
    constructor() {
        super()
    }

    @Prop({ default : null }) readonly Debris !: Array<{ text : string,  to : string }>;

    @Prop({ default : false, type : Boolean }) readonly AutoRoute !: boolean;

    @Prop({ default : '_self' }) readonly Target !:  '_parent' | '_blank' | '_self' | '_top' | string;

    @Prop({ default : 'icon-gongnengtubiao-29' }) readonly Separator !: string;

    private readonly map = new Map<string, { text : string, to : string }>();

    protected get DebrisProvide() : Map<string, { text : string, to : string }> {
        const me = this;
        let len = 0;
        me.map.clear();
        while(me.Debris && len < me.Debris.length) {
            me.map.set(uuid(), me.Debris[len]);
            ++len;
        }
        return me.map;
    }

    protected set DebrisProvide(map : Map<string, { text : string, to : string }>) {
        const me = this;
        me.$emit('update:debris', [ ...map.values()]);
    }


    @Emit()
    protected onJumpTo(e : MouseEvent, key : string) : void {
        const me = this;
        const map : Map<string, { text : string, to : string }> = me.map;
        const keys = [ ...map.keys()];
        let k, len = keys.length, n = keys.indexOf(key);
        do { 
            ++n;
            if(keys[n]) {
                map.delete(keys[n]);
            }                            
        }while(n < len)
        me.DebrisProvide = map;
    }

    protected render() : JSX.Element {
        const me = this;
        const debrisEl = ((map) => {
            const element = [];
            for (let [k, item] of map.entries()) {
                let c = (<section key={ k as string }>
                            <route-link to={{ path : item.to }} target={ me.Target } onClick={ (e : MouseEvent) => { me.onJumpTo.apply(me, [e, k]); return me.AutoRoute; } } >{ item.text }</route-link>
                        </section>)
                if(!me.AutoRoute) {
                    c = (<section key={ k as string }>
                            <a href={ item.to } target={ me.Target } onClick={ (e : MouseEvent) => { me.onJumpTo.apply(me, [e, k]) } } >{ item.text }</a>
                        </section>)
                }
                element.push(c);
                element.push(<i class={ `iconfont ${ me.Separator }` }></i>)
            }
            return element.slice(0, element.length - 1);
        })(me.DebrisProvide)
        return (
            <div class="ivsom-breadcrumbs">{ debrisEl }</div>
        )
    }
}