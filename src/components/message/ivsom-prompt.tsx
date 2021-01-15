/**
 * Developer    :   SongQian
 * Time         :   2020-12-01
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   提示框组件
 */
import * as tsx from 'vue-tsx-support'
import { Component, Prop } from 'vue-property-decorator'
import { MessageProps } from './base-props'
import uuid from '~/utils/uuid'

import 'vue-tsx-support/enable-check'

export type Props = {
    //消息停留时间
    Timeout : Number
    //消息类型
    Type : "success" | "primary" | "info" | "warning" | "error"
} & MessageProps

@Component
export default class iVsomPrompt extends tsx.Component<Props> {

    @Prop({ default: false, type: Boolean }) readonly mask !: boolean;
    @Prop({ default: true, type: Boolean }) readonly isDestroy !: boolean;
    @Prop({ default: null }) readonly target !: JSX.Element;
    @Prop({ default: '', required : true }) readonly message !: string;

    @Prop({ default : 2000, type: Boolean }) readonly timeout !: number;
    @Prop({ default : 'info' }) readonly type !: "success" | "primary" | "info" | "warning" | "error";

    public id : string = uuid();
    public top : number = 20;
    
    public Show() {
        let me = this;
        if(me.isDestroy) {
            let target = me.target && (me.target as any).$el || document.querySelector("body");
            if (target) {
                (target as any).appendChild(me.$el)
            }
        }
        setTimeout(() => me.$destroy(), me.timeout);
    }

    protected render() : JSX.Element {
        let me = this;
        let type = { "info" : "icon-gongnengtubiao-81", "success" : "icon-gongnengtubiao-40", "primary" : "icon-gongnengtubiao-59", "warning" : "icon-gongnengtubiao-79", "error" : "icon-gongnengtubiao-82" };
        return (
            <div class={{ "ivsom-message-prompt" : true, ["ivsom-message-" + [me.type]] : true }} style={{ "top" : me.top + "px" }}>
                <div class="ivsom-message__body">
                    <i class={{ "iconfont" : true, [type[me.type]] : true }} style="vertical-align: sub; font-size: 2em;" ></i>{ me.message }
                </div>
            </div>
        )
    }

}