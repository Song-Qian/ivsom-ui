import { Props as alertProps, default as iVsomAlert } from './ivsom-alert';
import { Props as toastProps, default as iVsomToast } from './ivsom-toast';
import { Props as promptProps, default as iVsomPrompt } from './ivsom-prompt';
export default class iVsomMessage {
    private static readonly messageInstance;
    private static readonly prompts;
    static alert(opts: alertProps, fn: Function): iVsomAlert;
    static confirm(opts: alertProps, confirm: Function, cancel: Function): iVsomAlert;
    static prompt(opts: promptProps, leave: Function): iVsomPrompt;
    static toast(opts: toastProps): iVsomToast;
}
