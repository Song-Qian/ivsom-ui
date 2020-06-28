import * as tsx from 'vue-tsx-support';
declare type Props = {
    Search: Boolean;
    Dark: Boolean;
    Filter: (children: any, text: string, deepNumber: number) => boolean;
    SearchText: String;
    Horizontal: boolean;
    Target: 'top' | 'blank' | 'parent' | 'self' | String;
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
    readonly target: 'top' | 'blank' | 'parent' | 'self' | String;
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
