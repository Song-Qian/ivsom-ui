import * as tsx from 'vue-tsx-support';
interface Props {
    max: Number;
    min: Number;
    disabled: Boolean;
    range: Boolean;
}
export default class iVsomSlider extends tsx.Component<Props> {
    constructor();
    readonly max: number;
    readonly min: number;
    readonly disabled: boolean;
    readonly range: boolean;
    protected readonly mySlider: HTMLElement;
    protected readonly propo: HTMLElement;
    protected readonly rightBtn: HTMLElement;
    protected readonly leftBtn: HTMLElement;
    protected readonly propoBg: HTMLElement;
    protected readonly propoRange: HTMLElement;
    protected getMin(): void;
    protected getMax(): void;
    private myPosition;
    private myDefault;
    protected btnFun(index: any): void;
    protected mounted(): void;
    protected render(): JSX.Element;
}
export {};
