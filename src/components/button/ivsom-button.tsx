/**
 * Developer    :   SongQian
 * Time         :   2020-04-21
 * eMail        :   songqian@wtoe.cn
 * Description  :   button组件
 */

import * as tsx from 'vue-tsx-support'
import { Component, Inject, Prop } from 'vue-property-decorator'

interface Props {
    Icon : String,
    Plain : Boolean,
    Disabled: Boolean,
    Type : 'success' | 'primary' | 'warning' | 'danger' | 'default'
}

interface Event {
    onClick : (e : MouseEvent) => void
}

interface ScopedSlots {
    default: void
}

@Component
export default class iVsomButton extends tsx.Component<Props, Event, ScopedSlots> {

    constructor() {
        super()
    }

    @Prop({ default : '', type: String }) readonly Icon !: String;

    @Prop({ default : false, type : Boolean }) readonly Plain !: Boolean;

    @Prop({ default : false, type : Boolean }) readonly Disabled !: Boolean;

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
            <button  class={ `ivsom-btn ${this.cssName} ${ this.Plain ? 'ivsom-btn__plain' : ''} ${ this.Disabled ? 'ivsom-btn_disabled' : '' }` } disabled={ !!this.Disabled }  onClick={ (event : MouseEvent) => this.$emit('click', event) }>
                { this.Icon ? <i class={ `iconfont ${this.Icon}` } ></i> : '' }
                { this.$scopedSlots.default() }
            </button>
        )
    }

}