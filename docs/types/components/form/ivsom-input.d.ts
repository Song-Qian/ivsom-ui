import * as tsx from 'vue-tsx-support';
import 'vue-tsx-support/enable-check';
declare type Props = {
    Password: Boolean;
    Placeholder: String;
    Value: String;
    Disabled: Boolean;
    Prefix: String;
    Suffix: String;
    Width: String | number;
    Size: 'medium' | 'small' | 'mini';
    limit: Boolean;
};
declare type ScopedSlots = {
    Prefix: String;
    Suffix: String;
};
export default class iVsomInput extends tsx.Component<Props, any, ScopedSlots> {
    constructor();
    readonly password: boolean;
    readonly placeholder: string;
    readonly value: string;
    readonly disabled: boolean;
    readonly prefix: string;
    readonly suffix: string;
    readonly width: string | number;
    readonly size: string;
    readonly limit: boolean;
    private validate;
    ValidateField(regexp: RegExp): boolean;
    protected render(): JSX.Element;
}
export {};
