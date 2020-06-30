import * as tsx from 'vue-tsx-support';
import 'vue-tsx-support/enable-check';
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
    protected render(): JSX.Element;
}
export {};
