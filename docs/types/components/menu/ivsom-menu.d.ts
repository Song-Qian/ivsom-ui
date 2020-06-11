import * as tsx from 'vue-tsx-support';
declare type Props = {
    Search: Boolean;
    Dark: Boolean;
    Filter: (children: any, text: string, deepNumber: number) => boolean;
    SearchText: String;
    Horizontal: boolean;
};
declare type ScopedSlots = {
    default: void;
};
export default class iVsomMenu extends tsx.Component<Props, any, ScopedSlots> {
    constructor();
    readonly search: boolean;
    readonly dark: boolean;
    readonly filter: (children: any, text: string, deepNumber: number) => boolean;
    readonly searchText: string;
    readonly horizontal: boolean;
    private aside;
    private _panes;
    protected onMenuFilter(e: InputEvent): void;
    protected render(): JSX.Element;
}
export {};
