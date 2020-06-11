import * as tsx from 'vue-tsx-support';
import 'vue-tsx-support/enable-check';
declare type Props = {
    Icon: String;
    Disabled: Boolean;
};
declare type ScopedSlots = {
    default: void;
    submenu: void;
};
export default class iVsomMenuItem extends tsx.Component<Props, any, ScopedSlots> {
    constructor();
    readonly icon: string;
    readonly disabled: boolean;
    private collapse;
    private hasFilter;
    private get children();
    private __handlerRoot;
    private __handlerLevels;
    private __handlerHideNode;
    private __handlerShowNode;
    protected onMenuItemClick(e: MouseEvent): void;
    protected render(): JSX.Element;
}
export {};
