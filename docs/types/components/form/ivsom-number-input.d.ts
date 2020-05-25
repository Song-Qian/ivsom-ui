import * as tsx from 'vue-tsx-support';
declare type Props = {
    value: number;
};
declare type ScopedSlots = {
    add: string;
    do: string;
};
export default class iVsomNumberInput extends tsx.Component<Props, any, ScopedSlots> {
    constructor();
    readonly value: number;
    protected onAdd(e: MouseEvent): number;
    protected onDo(): number;
    protected render(): JSX.Element;
}
export {};
