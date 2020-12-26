/**
 * Developer    :   SongQian
 * Time         :   2020-04-21
 * eMail        :   songqian@wtoe.cn
 * Description  :   button组件
 */

import * as tsx from 'vue-tsx-support'
import { Component, Prop } from 'vue-property-decorator'

import 'vue-tsx-support/enable-check'

interface Props {
    Icon : String,
    Plain : Boolean,
    Disabled: Boolean,
    Type : 'success' | 'primary' | 'warning' | 'danger' | 'default'
}

interface Event {
    click : (e : MouseEvent) => void
}

interface ScopedSlots {
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
        return (
            <button class={ `ivsom-btn ${this.cssName} ${ this.plain ? 'ivsom-btn__plain' : ''} ${ this.disabled ? 'ivsom-btn_disabled' : '' }` } disabled={ !!this.disabled }  onClick={ (event : MouseEvent) => this.$emit('click', event) }>
                { this.icon ? <i class={ `iconfont ${this.icon}` } ></i> : '' }
                { this.$scopedSlots.default && this.$scopedSlots.default() }
            </button>
        )
    }

}