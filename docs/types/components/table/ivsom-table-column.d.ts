import * as tsx from 'vue-tsx-support';
import 'vue-tsx-support/enable-check';
declare type Props = {
    Width: Number | String;
    Flex: Boolean;
    FlexAlign: "start" | "end";
    HeaderAlign: 'left' | 'center' | 'right';
    Align: 'left' | 'center' | 'right';
    ColStyle: (rowIndex: number, row: any) => Object;
    Title: String;
    Field: String;
    Sort: Boolean;
};
declare type ScopedSlots = {
    default: void;
    title: void;
    row: any;
};
export default class iVsomTableColumn extends tsx.Component<Props, any, ScopedSlots> {
    readonly width: number | string;
    readonly flex: boolean;
    readonly flexAlign: "start" | "end";
    readonly title: string;
    readonly field: string;
    headerAlign: 'left' | 'center' | 'right';
    align: 'left' | 'center' | 'right';
    readonly sort: boolean;
    readonly colStyle: (rowIndex: number, row: any) => Object;
    source: Array<any>;
    stripe: boolean;
    bodyDiff: number;
    sortField: string;
    highlightRow: boolean;
    highlightIndex: number;
    rowStyle: (rowIndex: number, row: any) => Object;
    private domHeader;
    private rowWapper;
    private hDomHeight;
    private bDomHeight;
    private asc;
    private get calcWidth();
    protected onSortChange(e: MouseEvent, field: string, sort: string): void;
    protected onMouseEnterRow(e: MouseEvent, row: any, i: number): void;
    protected beforeMount(): void;
    protected mounted(): void;
    protected render(): JSX.Element;
}
export {};
