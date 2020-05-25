import * as tsx from 'vue-tsx-support';
declare type Props = {
    Name: String;
    Index: String;
};
declare type ScopedSlots = {
    default: void;
};
export default class iVsomTabsPanel extends tsx.Component<Props, any, ScopedSlots> {
    constructor();
    readonly name: string;
    readonly index: string;
    protected created(): void;
    protected render(): JSX.Element;
}
export {};
