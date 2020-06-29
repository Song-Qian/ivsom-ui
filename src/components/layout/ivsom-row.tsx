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
     //flex 布局下的垂直排列方式
     align : 'top' | 'middle' | 'bottom'
     //flex 布局下的水平排列方式
     Justify : 'start' | 'end' | 'center' | 'space-around' | 'space-between'
     //布局模式
     flex : boolean
 }

 type ScopedSlots = {
     default : void
 }

 @Component
 export default class iVsomRow extends tsx.Component<Props, any, ScopedSlots> {

    constructor() {
        super()
    }

    @Prop({ default : false, type : Boolean}) readonly flex !: boolean;

    @Prop({ default : 'start', type : String }) readonly justify !: 'start' | 'end' | 'center' | 'space-around' | 'space-between';

    @Prop({ default : 'top', type : String }) readonly align !: 'top' | 'middle' | 'bottom';

    private get flexType() {
        return this.flex ? ' ivsom-row-flex' : '';
    }

    private get justifyType() {
        return this.flex ? ` ivsom-row-justify-${this.justify}` : '';
    }

    private get alignType() {
        return this.flex ? ` ivsom-row-align-${this.align}` : '';
    }

    protected render() : JSX.Element {
        const me = this;

        return (
            <div class={ `ivsom-row${ me.flexType }${ me.justifyType }${ me.alignType }` }>{  me.$scopedSlots.default && me.$scopedSlots.default() }</div>
        )
    }
 }