import * as tsx from 'vue-tsx-support';
import 'vue-tsx-support/enable-check';
declare type Props = {
    Inline: Boolean;
    Span: Number;
    Offset: Number;
    Required: Boolean;
    Label: String;
    Min: number;
    Max: number;
    EMail: Boolean;
    Phone: Boolean;
    Double: Boolean;
    Identifier: Boolean;
    Validate: RegExp | Function | null;
    Prop: String;
    ErrorMessage: String;
    Trigger: 'blur' | 'change';
};
declare type ScopedSlots = {
    default: void;
};
export default class iVsomFormValidater extends tsx.Component<Props, any, ScopedSlots> {
    readonly inline: boolean;
    readonly span: number;
    readonly offset: number;
    readonly label: string;
    readonly required: boolean;
    readonly min: number;
    readonly max: number;
    readonly eMail: boolean;
    readonly phone: boolean;
    readonly double: boolean;
    readonly identifier: boolean;
    readonly validate: RegExp | Function | null;
    readonly prop: string;
    readonly errorMessage: string;
    readonly trigger: 'blur' | 'change';
    private messages;
    validator: boolean;
    model: {
        [key: string]: any;
    };
    label_width: number | string;
    position: 'left' | 'center' | 'right';
    validateField(): boolean;
    protected clearValidate(): void;
    protected mounted(): void;
    protected beforeDestroy(): void;
    protected render(): JSX.Element;
}
export {};
