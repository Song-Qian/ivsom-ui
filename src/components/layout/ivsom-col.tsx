/**
 * Developer    :   SongQian
 * Time         :   2020-05-08
 * eMail        :   songqian@wtoe.cn
 * Description  :   button组件
 */

 import * as tsx from 'vue-tsx-support'
 import { Component, Prop } from 'vue-property-decorator'
 
 import 'vue-tsx-support/enable-check'

 type Props = {
    //占位宽， max : 30
    Span : number
    //跳过占位宽
    Jump : number

 }

 type ScopedSlots = {
     default : void
 }

 @Component
 export default class iVsomCol extends tsx.Component<Props, any, ScopedSlots> {

    constructor() {
        super()
    }

    @Prop({ default : 1, type: Number }) readonly span !: number;

    @Prop({ default : 0, type: Number }) readonly jump !: number;

    private get spacing() : string {
        return `ivsom-col-${this.span}`;
    }

    private get jumpSpacing() : string {
        return  this.jump ? ` ivsom-col-jump-${this.jump}` : '';
    }

    protected render() : JSX.Element {
        let me = this;
        return (
            <div class={ `${me.spacing}${me.jumpSpacing}` }>
                { me.$scopedSlots.default && me.$scopedSlots.default() }
            </div>
        )
    }


 }