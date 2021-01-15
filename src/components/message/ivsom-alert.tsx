/**
 * Developer    :   SongQian
 * Time         :   2020-12-01
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   消息框组件
 */

import * as tsx from 'vue-tsx-support'
import { Component, Prop, Emit } from 'vue-property-decorator'
import { MessageProps } from './base-props'

import 'vue-tsx-support/enable-check'

export type Props = {
    //消息框的图标类型
    Type : "success" | "primary" | "info" | "warning" | "error"
    //消息框的标题头
    Title : string
    //消息框的宽度
    Width : number | string
    //消息框的高度
    Height : number | string
    //是否确认框
    IsConfirm : boolean
    //是否点击外部关闭按钮
    IsOuterClose : boolean
} & MessageProps

export type EventsWith = {
    onMessageConfirm : (e : MouseEvent) => void
    onMessageCancel : (e : MouseEvent) => void
}

@Component
export default class iVsomAlert extends tsx.Component<Props> {

    @Prop({ default : "Info" }) readonly type !:  "success" | "primary" | "info" | "warning" | "error";
    @Prop({ default : "260px" }) readonly width !: number | string;
    @Prop({ default : "120px" }) readonly height !: number | string;
    @Prop({ default : '' }) readonly title !:string;
    @Prop({ default : false, type: Boolean }) isConfirm !: boolean;
    @Prop({ default : true, type : Boolean }) isOuterClose !: boolean;

    @Prop({ default : '', required : true }) readonly message !: string;
    @Prop({ default : false, type: Boolean}) readonly mask !: boolean;
    @Prop({ default : null }) readonly target !: JSX.Element;
    @Prop({ default : true, type : Boolean }) readonly isDestroy !: boolean;

    private isShow : boolean = true;

    public Show() {
        let me = this;
        me.isShow = true;
        if(me.isDestroy) {
            let target = me.target && (me.target as any).$el || document.querySelector("body");
            if (target) {
                (target as any).appendChild(me.$el)
            }
        }
    }

    public Hide() {
        let me = this;
        me.isShow = false;
        if(me.isDestroy) {
            me.$destroy();
        }
    }

    @Emit()
    protected onMessageConfirm(e : MouseEvent) {
        let me = this;
        Object.assign(e, { funcName : "onMessageConfirm" });
        me.Hide();
    }

    @Emit()
    protected onMessageCancel(e : MouseEvent) {
        let me = this;
        Object.assign(e, { funcName : "onMessageCancel" });
        me.Hide();
    }

    protected mounted() {
        let me = this;
        let target = me.target && (me.target as any).$el || document.querySelector("body");
        if (target) {
            (target as any).appendChild(me.$el)
        }
    }

    protected render() : JSX.Element {
        let me = this;
        let type = { "info" : "icon-gongnengtubiao-81", "success" : "icon-gongnengtubiao-40", "primary" : "icon-gongnengtubiao-59", "warning" : "icon-gongnengtubiao-79", "error" : "icon-gongnengtubiao-82" };
        return (
            <div class={{ "ivsom-message-alert" : true, "ivsom-message-mask" : me.mask, "ivsom-message__hasHide" : !me.isShow}} onClick={ (e) => { me.isOuterClose && me.isConfirm ? me.onMessageCancel(e) : me.isOuterClose ? me.onMessageConfirm(e) : void 0; }}>
                <div 
                    class={{ "ivsom-message-alert__body" : true }} 
                    style={{ width: typeof me.width === 'number' ? `${me.width}px` : me.width, height: typeof me.height === 'number' ? `${me.height}px` : me.height }}
                    >
                    <div class="ivsom-message-title">{ me.title }</div>
                    <div class="ivsom-message-body"><i class={{ "iconfont" : true, [type[me.type]] : true }} style="vertical-align: sub; font-size: 2em;" ></i>{ me.message }</div>
                    <div class="ivsom-message-footer">
                        <div class="ivsom-message-footer__inner">
                            <div class="ivsom-message__success" onClick={ tsx.modifiers.stop(me.onMessageConfirm) }>确认</div>{ me.isConfirm ? <div class="ivsom-message__cancel" onClick={ tsx.modifiers.stop(me.onMessageCancel) }>取消</div> : null }
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}