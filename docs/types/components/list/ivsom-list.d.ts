import * as tsx from 'vue-tsx-support';
import 'vue-tsx-support/enable-check';
interface Props {
    Type: 'radiu' | 'rect' | 'default';
    Icon: String;
    Number: Boolean;
    colorBg: String;
    Lable: String;
}
export default class iVsomList extends tsx.Component<Props> {
    constructor();
    readonly icon: string;
    readonly colorbg: string;
    readonly lable: string;
    readonly type: 'radiu' | 'rect' | 'default';
    readonly number: Boolean;
    protected get cssName(): string;
    protected render(): JSX.Element;
}
export {};
