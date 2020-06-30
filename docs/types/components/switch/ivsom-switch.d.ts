import * as tsx from 'vue-tsx-support';
import 'vue-tsx-support/enable-check';
interface Props {
    value: Boolean;
    width: Number;
    height: Number;
    disabled: Boolean;
    openColor: String;
    closeColor: String;
}
export default class iVsomSwitch extends tsx.Component<Props> {
    constructor();
    readonly value: boolean;
    readonly width: number;
    readonly height: number;
    readonly OpenColor: string;
    readonly CloseColor: string;
    readonly disabled: boolean;
    private status;
    private switchBg;
    private closeBg;
    private left;
    protected getValue(): void;
    protected getstatus(): void;
    protected getWidth(): void;
    protected getHeight(): void;
    protected getopen(): void;
    protected getclose(): void;
    protected changeStatus(): void;
    protected handleSwitch(e: MouseEvent): void;
    protected created(): void;
    protected render(): JSX.Element;
}
export {};
