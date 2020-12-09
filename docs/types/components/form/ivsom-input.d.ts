import * as tsx from 'vue-tsx-support';
import 'vue-tsx-support/enable-check';
declare type Props = {
    Password: Boolean;
    Placeholder: String;
    Value: String;
    Disabled: Boolean;
    Prefix: String;
    Suffix: String;
    Width: String | Number;
    Size: 'medium' | 'small' | 'mini';
    limit: Boolean;
};
declare type ScopedSlots = {
    prefix: String;
    suffix: String;
};
export default class iVsomInput extends tsx.Component<Props, any, ScopedSlots> {
    constructor();
    readonly password: boolean;
    readonly placeholder: string;
    syncedValue: string;
    readonly disabled: boolean;
    readonly prefix: string;
    readonly suffix: string;
    readonly width: string | number;
    readonly size: string;
    readonly limit: boolean;
    validate: boolean;
    trigger: 'blur' | 'change';
    protected onChange(e: any): void;
    protected onBlur(): void;
    protected render(): JSX.Element;
}
export {};
