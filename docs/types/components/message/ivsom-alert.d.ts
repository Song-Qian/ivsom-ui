import * as tsx from 'vue-tsx-support';
import { MessageProps } from './base-props';
import 'vue-tsx-support/enable-check';
export declare type Props = {
    Type: "success" | "primary" | "info" | "warning" | "error";
    Title: string;
    Width: number | string;
    Height: number | string;
    IsConfirm: boolean;
    IsOuterClose: boolean;
} & MessageProps;
export declare type EventsWith = {
    onMessageConfirm: (e: MouseEvent) => void;
    onMessageCancel: (e: MouseEvent) => void;
};
export default class iVsomAlert extends tsx.Component<Props> {
    readonly type: "success" | "primary" | "info" | "warning" | "error";
    readonly width: number | string;
    readonly height: number | string;
    readonly title: string;
    isConfirm: boolean;
    isOuterClose: boolean;
    readonly message: string;
    readonly mask: boolean;
    readonly target: JSX.Element;
    readonly isDestroy: boolean;
    private isShow;
    Show(): void;
    Hide(): void;
    protected onMessageConfirm(e: MouseEvent): void;
    protected onMessageCancel(e: MouseEvent): void;
    protected mounted(): void;
    protected render(): JSX.Element;
}
