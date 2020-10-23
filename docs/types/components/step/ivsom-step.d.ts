import * as tsx from 'vue-tsx-support';
interface Props {
    Steps: number;
    StepData: string[];
}
export default class iVsomStep extends tsx.Component<Props> {
    constructor();
    readonly Steps: number;
    readonly stepdata: string[];
    protected render(): JSX.Element;
}
export {};
