import * as tsx from 'vue-tsx-support';
import { MessageProps } from './base-props';
import 'vue-tsx-support/enable-check';
export declare type Props = {
    Timeout: Number;
} & MessageProps;
export default class iVsomToast extends tsx.Component<Props> {
    readonly timeout: number;
    readonly message: string;
    readonly mask: boolean;
    readonly isDestroy: boolean;
    readonly target: JSX.Element;
    private isShow;
    Show(): void;
    Hide(): void;
    protected mounted(): void;
    protected render(): JSX.Element;
}
