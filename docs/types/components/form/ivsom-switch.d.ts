import * as tsx from 'vue-tsx-support';
import 'vue-tsx-support/enable-check';
declare type Props = {
    Disabled: Boolean;
    ActiveColor: String;
    InactiveColor: String;
    Name: String;
    Size: 'medium' | 'small' | 'mini';
    Checked: Boolean;
};
export default class iVsomSwitch extends tsx.Component<Props> {
    readonly disabled: boolean;
    readonly activeColor: string;
    readonly inactiveColor: string;
    readonly size: string;
    readonly name: string;
    checkedValue: boolean;
    validate: boolean;
    trigger: 'blur' | 'change';
    protected onChange(e: MouseEvent, value: Boolean): void;
    protected onBlur(e: FocusEvent): void;
    protected render(): JSX.Element;
}
export {};
