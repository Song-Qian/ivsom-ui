import * as tsx from 'vue-tsx-support';
import 'vue-tsx-support/enable-check';
declare type Props = {
    Search: Boolean;
    Dark: Boolean;
    Filter: (children: any, text: string, deepNumber: number) => boolean;
    SearchText: String;
    Horizontal: boolean;
    Target: String;
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
    readonly target: String;
    get rootMenu(): this;
    readonly search_input: JSX.Element;
    protected readonly menu_warp: HTMLElement;
    private aside;
    private unfold;
    private iVsomMenuItem;
    private iVsomMenuItemOther;
    private _panes;
    protected onMenuFilter(e: InputEvent): void;
    protected onSearchUnfold(e: any): boolean;
    protected mounted(): void;
    protected render(): JSX.Element;
}
export {};
