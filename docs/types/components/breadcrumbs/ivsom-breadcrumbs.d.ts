import * as tsx from 'vue-tsx-support';
interface Props {
    Debris: Array<{
        text: string;
        to: string;
    }>;
    AutoRoute: boolean;
    Target: '_parent' | '_blank' | '_self' | '_top' | string;
    Separator: string;
}
declare type Event = {
    onJumpTo: (e: MouseEvent, key: string) => void;
};
export default class iVsomBreadCrumbs extends tsx.Component<Props, Event> {
    constructor();
    readonly Debris: Array<{
        text: string;
        to: string;
    }>;
    readonly AutoRoute: boolean;
    readonly Target: '_parent' | '_blank' | '_self' | '_top' | string;
    readonly Separator: string;
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
