import * as tsx from 'vue-tsx-support';
import "vue-tsx-support/enable-check";
declare type Props = {
    Name: String;
    Value: any[];
};
declare type ScopedSlots = {
    default: void;
};
export default class iVsomCheckBoxGroup extends tsx.Component<Props, any, ScopedSlots> {
    readonly value: any[];
    readonly name: string;
    private values;
    validate: boolean;
    trigger: 'blur' | 'change';
    protected handlerCheckBoxChange(val: {
        [key: string]: any;
    }): void;
    protected onBlur(e: FocusEvent): void;
    protected mounted(): void;
    protected updated(): void;
    protected render(): JSX.Element;
}
export {};
