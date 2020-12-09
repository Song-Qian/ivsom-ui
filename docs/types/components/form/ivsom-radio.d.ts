import * as tsx from 'vue-tsx-support';
import 'vue-tsx-support/enable-check';
declare type Props = {
    Value: any;
    Disabled: Boolean;
    Name: String;
    Size: 'medium' | 'small' | 'mini';
    Type: 'circle' | 'check';
    Chekced: any;
};
declare type ScopedSlots = {
    default: void;
};
export default class iVsomRadio extends tsx.Component<Props, Event, ScopedSlots> {
    constructor();
    readonly size: string;
    readonly type: string;
    readonly disabled: boolean;
    readonly value: any;
    readonly name: string;
    checkValue: any;
    protected onChange(e: MouseEvent, value: any): void;
    protected render(): JSX.Element;
}
export {};
