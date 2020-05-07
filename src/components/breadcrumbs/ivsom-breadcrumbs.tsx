/**
 * Developer    :   SongQian
 * Time         :   2020-04-21
 * eMail        :   songqian@wtoe.cn
 * Description  :   breadcrumbs组件
 */

import * as tsx from 'vue-tsx-support'
import { Component, Prop } from 'vue-property-decorator'
import uuid from '~/utils/uuid'

interface Props {
    //面包屑层级数据
    debris : Array<{ text : String,  to : String }>
    //是否开启动跳转路由， 支持vue-router
    auto : Boolean,
    //路由跳转链接文档方式
    target : '_parent' | '_blank' | '_self' | '_top' | string,
    //分隔符样式
    separator : String
}

@Component
export default class iVsomBreadCrumbs extends tsx.Component<Props> {
    
    constructor() {
        super()
    }

    @Prop({ default : null }) debris !:Array<{ text : String,  to : String }>

    @Prop({ default : false }) auto !: Boolean;

    @Prop({ default : '_blank' }) target !:  '_parent' | '_blank' | '_self' | '_top' | string;

    @Prop({ default : 'icon-gongnengtubiao-29' }) separator !: string;

    private readonly map = new Map<String, { text : String, to : String }>();

    protected get getDebris() : Map<String, { text : String, to : String }> {
        const me = this;
        const hasCreateHashMap = me.map.size <= 0;
        let len = 0;
        while(me.debris && len < me.debris.length && hasCreateHashMap) {
            me.map.set(uuid(), me.debris[len]);
            ++len
        }
        return me.map;
    }

    protected set setDebris(map : Map<String, { text : String, to : String }>) {
        const me = this;
        me.$emit('update:debris', map.values());
    }


    protected onJumpTo(e : MouseEvent, key : String) : void {
        const me = this;
        const map = me.getDebris;
        const item = map.get(key);
        const iterator = map.entries();
        let k, i, done;
        // for(let [k, i] of map.entries()) {
        //     console.log(k);
        // }
        while(({ value : [k, i], done }= iterator.next()) && !done) {
            console.log(k);
        }
    }

    protected render() : JSX.Element {
        const me = this;
        const debrisEl = ((map) => {
            const element = [];
            for (let [k, item] of map.entries()) {
                element.push(<section key={ k as string }><a target={ me.target } onClick={ (e : MouseEvent) => { me.onJumpTo.apply(me, [e, k]) } } >{ item.text }</a></section>);
                element.push(<i class={ `iconfont ${ me.separator }` }></i>)
            }
            return element.slice(0, element.length - 1);
         })(me.getDebris)
        return (
            <div class="ivsom-breadcrumbs">{ debrisEl }</div>
        )
    }
}