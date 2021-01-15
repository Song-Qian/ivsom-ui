import * as tsx from 'vue-tsx-support';
import 'vue-tsx-support/enable-check';
declare type Props = {
    Label: String;
    Value: any | any[];
    DataSource: Array<any>;
    Multiple: Boolean;
    Placeholder: String;
    Prefix: String;
    Suffix: String;
    Width: String | Number;
    Size: 'medium' | 'small' | 'mini';
    Method: 'hover' | 'click';
    Disabled: Boolean;
};
declare type ScopedSlots = {
    prefix: String;
    suffix: String;
};
export default class iVsomSelect extends tsx.Component<Props, any, ScopedSlots> {
    readonly width: string | number;
    readonly size: 'medium' | 'small' | 'mini';
    readonly prefix: string;
    readonly suffix: string;
    readonly placeholder: string;
    readonly method: string;
    readonly label: string;
    readonly dataSource: Array<any>;
    readonly multiple: boolean;
    readonly disabled: boolean;
    syncedValue: any | any[];
    validate: boolean;
    trigger: 'blur' | 'change';
    protected onChange(e: MouseEvent, value: any): void;
    protected onRemove(e: MouseEvent, value: any): void;
    protected onBlur(e: FocusEvent): void;
    protected render(): JSX.Element;
}
export {};
