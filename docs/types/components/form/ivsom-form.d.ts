import * as tsx from 'vue-tsx-support';
import 'vue-tsx-support/enable-check';
declare type Props = {
    Model: {
        [key: string]: any;
    };
    LabelWidth: Number | String;
    Position: 'left' | 'center' | 'right';
};
declare type ScopedSlots = {
    default: void;
};
export default class iVsomForm extends tsx.Component<Props, any, ScopedSlots> {
    readonly model: {
        [key: string]: any;
    };
    readonly labelWidth: number | string;
    readonly position: 'left' | 'center' | 'right';
    private validates;
    protected onSubmit(): void;
    protected validateForm(): Promise<boolean>;
    protected validateField(prop: string): any;
    protected clearValidates(): void;
    protected clearValidate(prop: string): void;
    protected created(): void;
    protected render(): JSX.Element;
}
export {};
