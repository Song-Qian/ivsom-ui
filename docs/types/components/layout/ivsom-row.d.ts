import * as tsx from 'vue-tsx-support';
import 'vue-tsx-support/enable-check';
declare type Props = {
    align: 'top' | 'middle' | 'bottom';
    Justify: 'start' | 'end' | 'center' | 'space-around' | 'space-between';
    flex: boolean;
};
declare type ScopedSlots = {
    default: void;
};
export default class iVsomRow extends tsx.Component<Props, any, ScopedSlots> {
    constructor();
    readonly flex: boolean;
    readonly justify: 'start' | 'end' | 'center' | 'space-around' | 'space-between';
    readonly align: 'top' | 'middle' | 'bottom';
    private get flexType();
    private get justifyType();
    private get alignType();
    protected render(): JSX.Element;
}
export {};
