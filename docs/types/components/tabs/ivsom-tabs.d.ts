import * as tsx from 'vue-tsx-support';
import 'vue-tsx-support/enable-check';
declare type Props = {
    Width: number | string;
    Height: number | string;
    Value: string;
    Flex: Boolean;
    Stretch: Boolean;
    Type: 'default' | 'card' | 'nav';
    Closable: Boolean;
    Opne: Boolean;
};
declare type ScopedSlots = {
    default: void;
};
export default class iVsomTabs extends tsx.Component<Props, any, ScopedSlots> {
    constructor();
    readonly width: number;
    readonly height: number;
    readonly value: string;
    readonly flex: boolean;
    readonly stretch: boolean;
    readonly type: string;
    readonly closable: boolean;
    readonly open: boolean;
    protected readonly nav_prev: HTMLElement;
    protected readonly nav_next: HTMLElement;
    protected readonly root_tabs: HTMLElement;
    protected readonly tabs_nav: HTMLElement;
    protected readonly tabs_nav_container: HTMLElement;
    private isScroll;
    private move_dist;
    private run_dist;
    private moving_prev;
    private moving_next;
    private _panes;
    private get _width();
    private get _height();
    private _active;
    protected onTabsNavMoving_Prev(): void;
    protected onTabsNavMoving_Next(): void;
    protected onTabsChange(e: MouseEvent, activeName: string): void;
    protected onTabsNavClose(e: MouseEvent, index: string): import("vue-property-decorator").Vue | null | undefined;
    protected updated(): void;
    protected mounted(): void;
    protected render(): JSX.Element;
}
export {};
