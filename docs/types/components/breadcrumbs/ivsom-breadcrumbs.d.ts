import * as tsx from 'vue-tsx-support';
import 'vue-tsx-support/enable-check';
declare type Props = {
    Debris: Array<{
        text: string;
        to: string;
    }>;
    AutoRoute: boolean;
    Target: string;
    Separator: string;
};
declare type Event = {
    onJumpTo: (e: MouseEvent, key: string) => void;
};
export default class iVsomBreadCrumbs extends tsx.Component<Props, Event> {
    constructor();
    readonly debris: Array<{
        text: string;
        to: string;
    }>;
    readonly autoRoute: boolean;
    readonly target: string;
    readonly separator: string;
    private readonly map;
    protected get DebrisProvide(): Map<string, {
        text: string;
        to: string;
    }>;
    protected set DebrisProvide(map: Map<string, {
        text: string;
        to: string;
    }>);
    protected onJumpTo(e: MouseEvent, key: string): void;
    protected render(): JSX.Element;
}
export {};
