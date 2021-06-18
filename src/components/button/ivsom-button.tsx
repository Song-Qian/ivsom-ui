/**
 * Developer    :   SongQian
 * Time         :   2020-04-21
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   button组件
 */

import * as tsx from 'vue-tsx-support'
import { Component, Prop } from 'vue-property-decorator'

import 'vue-tsx-support/enable-check'

type Props = {
    Icon : String,
    Plain : Boolean,
    Disabled: Boolean,
    Size: 'medium' | 'small' | 'mini',
    Type : 'success' | 'primary' | 'warning' | 'danger' | 'default'
}

type Event = {
    click : (e : MouseEvent) => void
}

type ScopedSlots = {
    default: void
}

@Component
export default class iVsomButton extends tsx.Component<Props, Event, ScopedSlots> {

    constructor() {
        super()
    }

    @Prop({ default : '', type: String }) readonly icon !: String;

    @Prop({ default : false, type : Boolean }) readonly plain !: Boolean;

    @Prop({ default : false, type : Boolean }) readonly disabled !: Boolean;

    @Prop({ default: 'medium' }) readonly size !: 'medium' | 'small' | 'mini';

    @Prop({ default : 'default' }) readonly type !: 'success' | 'primary' | 'warning' | 'danger' | 'default';

    protected get cssName() {
        var css = {
            'primary' : 'ivsom-btn-primary',
            'success' : 'ivsom-btn-success',
            'warning' : 'ivsom-btn-warning',
            'danger' : 'ivsom-btn-danger'
        }
        return this.type !== 'default' ? css[this.type] : ''; 
    }

    protected render() : JSX.Element {
        const me = this;
        return (
            <button class={{'ivsom-btn': true, [me.cssName] : true, 'ivsom-btn_plain' : this.plain, 'ivsom-btn_disabled' : this.disabled, [`ivsom-btn__${me.size}`] : true }} disabled={ !!this.disabled }  onClick={ (event : MouseEvent) => this.$emit('click', event) }>
                { this.icon ? <i class={ `iconfont ${this.icon}` } ></i> : '' }
                { this.$scopedSlots.default && this.$scopedSlots.default() }
            </button>
        )
    }

}