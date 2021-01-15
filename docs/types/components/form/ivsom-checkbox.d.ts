import * as tsx from 'vue-tsx-support';
import 'vue-tsx-support/enable-check';
declare type Props = {
    Value: any;
    Disabled: Boolean;
    Name: String;
    Size: 'medium' | 'small' | 'mini';
    Checked: any;
};
declare type ScopedSlots = {
    default: void;
};
export default class iVsomCheckBox extends tsx.Component<Props, any, ScopedSlots> {
    readonly value: any;
    readonly disabled: Boolean;
    readonly size: 'medium' | 'small' | 'mini';
    readonly name: string;
    readonly includedValue: {
        [key: string]: any;
    };
    checkedValue: any;
    private readonly id;
    protected onChange(e: MouseEvent, value: any): void;
    protected render(): JSX.Element;
}
export {};
