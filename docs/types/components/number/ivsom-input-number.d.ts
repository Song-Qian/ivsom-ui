import * as tsx from 'vue-tsx-support';
interface Props {
    max: Number;
    min: Number;
    step: Number;
    value: Number;
    precision: Number;
    disabled: Boolean;
}
export default class iVsomInputNumber extends tsx.Component<Props> {
    constructor();
    readonly max: number;
    readonly min: number;
    readonly step: number;
    readonly disabled: boolean;
    readonly value: string | number;
    readonly precision: number;
    protected readonly input: HTMLInputElement;
    protected reduce(e: MouseEvent): void;
    protected add(e: MouseEvent): void;
    protected inputChange(e: InputEvent): void;
    protected emitVal(newVal: any): void;
    protected created(): void;
    protected modelValue(): void;
    get valueMax(): boolean;
    get valueMin(): boolean;
    protected render(): JSX.Element;
}
export {};
