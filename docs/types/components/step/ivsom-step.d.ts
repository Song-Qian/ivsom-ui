import * as tsx from 'vue-tsx-support';
interface Props {
    steps: number;
    stepData: string[];
}
export default class iVsomStep extends tsx.Component<Props> {
    constructor();
    readonly steps: number;
    readonly stepData: string[];
    protected render(): JSX.Element;
}
export {};
