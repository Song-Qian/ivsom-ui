import * as tsx from 'vue-tsx-support';
import 'vue-tsx-support/enable-check';
interface Props {
    Icon: String;
    Plain: Boolean;
    Disabled: Boolean;
    Type: 'success' | 'primary' | 'warning' | 'danger' | 'default';
}
interface Event {
    click: (e: MouseEvent) => void;
}
interface ScopedSlots {
    default: void;
}
export default class iVsomButton extends tsx.Component<Props, Event, ScopedSlots> {
    constructor();
    readonly icon: String;
    readonly plain: Boolean;
    readonly disabled: Boolean;
    readonly type: 'success' | 'primary' | 'warning' | 'danger' | 'default';
    protected get cssName(): string;
    protected render(): JSX.Element;
}
export {};
