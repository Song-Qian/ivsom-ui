import * as tsx from 'vue-tsx-support';
interface Props {
    name: String;
    icon: String;
    plain: Boolean;
    disabled: Boolean;
    type: 'success' | 'primary' | 'warning' | 'danger' | 'default';
}
interface Event {
    onClick: (e: MouseEvent) => void;
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
