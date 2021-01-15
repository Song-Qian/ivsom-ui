import * as tsx from 'vue-tsx-support';
import { MessageProps } from './base-props';
import 'vue-tsx-support/enable-check';
export declare type Props = {
    Timeout: Number;
    Type: "success" | "primary" | "info" | "warning" | "error";
} & MessageProps;
export default class iVsomPrompt extends tsx.Component<Props> {
    readonly mask: boolean;
    readonly isDestroy: boolean;
    readonly target: JSX.Element;
    readonly message: string;
    readonly timeout: number;
    readonly type: "success" | "primary" | "info" | "warning" | "error";
    id: string;
    top: number;
    Show(): void;
    protected render(): JSX.Element;
}
