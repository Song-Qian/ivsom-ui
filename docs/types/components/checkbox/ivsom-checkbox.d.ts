import * as tsx from 'vue-tsx-support';
import 'vue-tsx-support/enable-check';
interface Props {
    value: string;
    dataSource: Array<{
        label: string;
        value: string;
    }>;
}
interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget & InputEvent;
}
declare type ScopedSlots = {
    default: void;
};
export default class iVsomCheckbox extends tsx.Component<Props, Event, ScopedSlots> {
    constructor();
    readonly value: string;
    readonly dataSource: Array<{
        label: string;
        value: string;
        disabled: boolean;
    }>;
    private checkedModel;
    protected change(event: HTMLInputEvent): void;
    protected isChecked(val: any): boolean;
    get getModel(): any;
    protected filterModel(vModel: []): [];
    private readonly map;
    protected get checkboxProvide(): Map<string, {
        label: string;
        value: string;
        disabled: boolean;
    }>;
    protected set checkboxProvide(map: Map<string, {
        label: string;
        value: string;
        disabled: boolean;
    }>);
    protected render(): JSX.Element;
}
export {};
