import * as tsx from 'vue-tsx-support';
declare type Props = {
    Name: string;
    Value: any;
};
declare type ScopedSlots = {
    default: void;
};
export default class iVsomRadioGroup extends tsx.Component<Props, any, ScopedSlots> {
    constructor();
    readonly name: string;
    readonly value: any;
    validate: boolean;
    trigger: 'blur' | 'change';
    protected handlerChangeValue(value: string, oldValue: string): void;
    protected onBlur(e: FocusEvent): void;
    protected mounted(): void;
    protected render(): JSX.Element;
}
export {};
