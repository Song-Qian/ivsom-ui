/**
 * Developer    :   SongQian
 * Time         :   2020-12-01
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   状态框组件
 */

 
import * as tsx from 'vue-tsx-support'
import { Component, Prop } from 'vue-property-decorator'
import { MessageProps } from './base-props'

import 'vue-tsx-support/enable-check'

export type Props = {
    //消息框显示时间
    Timeout: Number
} & MessageProps

@Component
export default class iVsomToast extends tsx.Component<Props> {

    @Prop({ default: 0 }) readonly timeout !: number;

    @Prop({ default : '' }) readonly message !: string;
    @Prop({ default: true, type : Boolean }) readonly mask !: boolean;
    @Prop({ default: true, type : Boolean }) readonly isDestroy !: boolean;
    @Prop() readonly target !: JSX.Element;

    private isShow : boolean = false;
    
    public Show() {
        let me = this;
        me.isShow = true;
        if(me.isDestroy) {
            let target = me.target && (me.target as any).$el || document.querySelector("body");
            if (target) {
                (target as any).appendChild(me.$el)
            }
        }

        me.timeout && setTimeout(() => me.Hide(), me.timeout);
    }

    public Hide() {
        let me = this;
        me.isShow = false;
        if(me.isDestroy) {
            me.$destroy();
        }
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
        return (
            <div class={{ "ivsom-message-toast" : true, "ivsom-message-mask" : me.mask, "ivsom-message__isHide" : !me.isShow }} >
                <div class="ivsom-message__body">
                    <div class="ivsom-message-loading">
                        <i class="iconfont icon-gongnengtubiao-84" style="color: #fff; font-size: 40px;"></i>
                    </div>
                </div>
            </div>
        )
    }

}