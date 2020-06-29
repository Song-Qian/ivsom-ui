import * as tsx from 'vue-tsx-support';
import 'vue-tsx-support/enable-check';
declare type Props = {
    Icon: String;
    Disabled: Boolean;
    Href: String;
};
declare type ScopedSlots = {
    default: void;
    submenu: void;
};
export default class iVsomMenuItem extends tsx.Component<Props, any, ScopedSlots> {
    constructor();
    readonly icon: string;
    readonly disabled: boolean;
    readonly href: string;
    target: 'top' | 'blank' | 'parent' | 'self' | String;
    rootMenu: any;
    private collapse;
    private hasFilter;
    private get children();
    private __handlerLevels;
    private __handlerHideNode;
    private __handlerShowNode;
    protected onMenuItemClick(e: MouseEvent, aside: boolean, horizontal: boolean): void;
    protected onMenuItemMouseIn(e: MouseEvent, aside: boolean, horizontal: boolean): void;
    protected onMenuItemMouseOut(e: MouseEvent, aside: boolean, horizontal: boolean): void;
    protected render(): JSX.Element;
}
export {};
