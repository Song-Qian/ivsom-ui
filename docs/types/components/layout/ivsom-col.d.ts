import * as tsx from 'vue-tsx-support';
import 'vue-tsx-support/enable-check';
declare type Props = {
    Span: number;
    Jump: number;
};
declare type ScopedSlots = {
    default: void;
};
export default class iVsomCol extends tsx.Component<Props, any, ScopedSlots> {
    constructor();
    readonly span: number;
    readonly jump: number;
    private get spacing();
    private get jumpSpacing();
    protected render(): JSX.Element;
}
export {};
