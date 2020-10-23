import * as tsx from 'vue-tsx-support';
import 'vue-tsx-support/enable-check';
interface Props {
    options: Array<{
        name: string;
        value: string;
    }>;
    selectOption: String;
    icon: String;
}
interface Event {
    onClick: (e: MouseEvent) => void;
}
interface ScopedSlots {
    default: void;
}
export default class iVsomRadio extends tsx.Component<Props, Event, ScopedSlots> {
    constructor();
    readonly options: Array<{
        name: string;
        value: string;
        disabled: boolean;
    }>;
    readonly icon: string;
    readonly selectoption: string;
    private selectRadio;
    private validate;
    ValidateField(regexp: RegExp): boolean;
    protected mounted(): void;
    protected radioChange(e: MouseEvent): void;
    private readonly map;
    protected get optionProvide(): Map<string, {
        name: string;
        value: string;
        disabled: boolean;
    }>;
    protected set optionProvide(map: Map<string, {
        name: string;
        value: string;
        disabled: boolean;
    }>);
    protected render(): JSX.Element;
}
export {};
