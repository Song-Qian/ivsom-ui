import * as tsx from 'vue-tsx-support';
declare type MenuItem = {
    Icon: string;
    Text: string;
    Children: Array<MenuItem> | undefined;
};
declare type Props = {
    Search: Boolean;
    Data: MenuItem;
};
export default class iVsomMenu extends tsx.Component<Props> {
    constructor();
    readonly search: boolean;
    readonly data: Array<MenuItem>;
    private menu_search;
    protected render(): JSX.Element;
}
export {};
