import * as tsx from 'vue-tsx-support';
declare type Props = {
    Icon: String;
    Text: String;
    Children: Array<Props> | undefined;
};
export default class iVsomMenuItem extends tsx.Component<Props> {
    constructor();
    readonly icon: string;
    readonly text: string;
    readonly childrne: Array<Props> | undefined;
    protected render(): JSX.Element;
}
export {};
