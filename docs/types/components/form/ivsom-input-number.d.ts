import * as tsx from 'vue-tsx-support';
import 'vue-tsx-support/enable-check';
declare type Props = {
    Max: Number;
    Min: Number;
    Step: Number;
    Disabled: Boolean;
    Size: 'medium' | 'small' | 'mini';
    Precision: Number;
    Name: String;
    Input: Boolean;
};
export default class iVsomNumber extends tsx.Component<Props> {
    readonly max: number;
    readonly min: number;
    readonly step: number;
    readonly disabled: boolean;
    readonly name: string;
    readonly precision: number;
    readonly size: 'medium' | 'small' | 'mini';
    readonly input: boolean;
    changeValue: string;
    validate: boolean;
    trigger: 'blur' | 'change';
    protected onLess(e: MouseEvent): void;
    protected onPlus(e: MouseEvent): void;
    protected onChange(e: Event, value: string): void;
    protected onBlur(e: FocusEvent): void;
    protected render(): JSX.Element;
}
export {};
