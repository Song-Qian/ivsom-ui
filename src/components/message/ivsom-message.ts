/**
 * Developer    :   SongQian
 * Time         :   2020-12-01
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   消息框组件
 */
import * as tsx from 'vue-tsx-support'
import { MessageProps, MessageEventsWith, MessageScopeSlots } from './base-props'
import { Props as alertProps, default as iVsomAlert } from './ivsom-alert'
import { Props as toastProps, default as iVsomToast } from './ivsom-toast'
import { Props as promptProps, default as iVsomPrompt } from './ivsom-prompt'

export default class iVsomMessage {

    private static readonly messageInstance : Map<string, tsx.Component<MessageProps, MessageEventsWith, MessageScopeSlots>> = new Map<string, tsx.Component<MessageProps, MessageEventsWith, MessageScopeSlots>>();
    private static readonly prompts : Map<string, iVsomPrompt> = new Map<string, iVsomPrompt>();

    static alert(opts : alertProps, fn : Function) : iVsomAlert {
        let alertInstance = iVsomMessage.messageInstance.get("alert")
        if(!iVsomMessage.messageInstance.has("alert")) {
            alertInstance = new iVsomAlert({ propsData: { ...opts, isConfirm : false }});
            alertInstance.$mount();
            fn && alertInstance.$on("on-message-confirm", fn);
            alertInstance.$once("hook:beforeDestroy", () => {
                if (typeof fn === "function") {
                    fn.apply(alertInstance, [Event]);
                }
                let target = (<any>alertInstance).target && (<any>alertInstance).target.$el || document.querySelector("body");
                target.removeChild(alertInstance?.$el)
                iVsomMessage.messageInstance.delete("alert");
            })
            iVsomMessage.messageInstance.set("alert", alertInstance);
        }
        (<iVsomAlert>alertInstance).Show();
        return <iVsomAlert>alertInstance;
    }

    static confirm(opts : alertProps, confirm : Function, cancel: Function) {
        let alertInstance = iVsomMessage.messageInstance.get("confirm")
        if(!iVsomMessage.messageInstance.has("confirm")) {
            alertInstance = new iVsomAlert({ propsData: { ...opts, isConfirm : true }});
            alertInstance.$mount();
            confirm && alertInstance.$on("on-message-confirm", confirm);
            cancel && alertInstance.$on("on-message-cancel", cancel);
            alertInstance.$once("hook:beforeDestroy", () => {
                if (typeof confirm === "function" && alertInstance?.$props.isDestroy && event && (event as any).funcName === "onMessageConfirm" ) {
                    confirm.apply(alertInstance, [Event]);
                }
                if (typeof cancel === "function" && alertInstance?.$props.isDestroy && event && (event as any).funcName === "onMessageCancel" ) {
                    cancel.apply(alertInstance, [Event]);
                }
                let target = (<any>alertInstance).target && (<any>alertInstance).target.$el || document.querySelector("body");
                target.removeChild(alertInstance?.$el)
                iVsomMessage.messageInstance.delete("confirm");
            })
            iVsomMessage.messageInstance.set("confirm", alertInstance);
        }
        (<iVsomAlert>alertInstance).Show();
        return <iVsomAlert>alertInstance;
    }

    static prompt(opts : promptProps, leave : Function) {
        let promptInstance = new iVsomPrompt({ propsData: opts });
        promptInstance.$mount();
        promptInstance.$once("hook:beforeDestroy", () => {
            if (typeof leave === "function" && promptInstance?.$props.isDestroy) {
                leave.apply(promptInstance);
            }
            let target = (<any>promptInstance).target && (<any>promptInstance).target.$el || document.querySelector("body");
            target.removeChild(promptInstance?.$el)
            iVsomMessage.prompts.delete(promptInstance.id);
        });
        (<iVsomPrompt>promptInstance).Show();
        let node = promptInstance.$el as HTMLDivElement;
        let top = node.offsetTop + node.offsetHeight;
        iVsomMessage.prompts.forEach((it) => it.top += top);
        iVsomMessage.prompts.set(promptInstance.id, promptInstance);
        return <iVsomPrompt>promptInstance;
    }

    static toast(opts : toastProps) {
        let toastInstance = iVsomMessage.messageInstance.get("toast")
        if(!iVsomMessage.messageInstance.has("toast")) {
            toastInstance = new iVsomToast({ propsData: opts });
            toastInstance.$mount();
            toastInstance.$once("hook:beforeDestroy", () => {
                let target = (<any>toastInstance).target && (<any>toastInstance).target.$el || document.querySelector("body");
                target.removeChild(toastInstance?.$el)
                iVsomMessage.messageInstance.delete("toast");
            })
            iVsomMessage.messageInstance.set("toast", toastInstance);
        }
        (<iVsomToast>toastInstance).Show();
        return <iVsomToast>toastInstance;
    }
}