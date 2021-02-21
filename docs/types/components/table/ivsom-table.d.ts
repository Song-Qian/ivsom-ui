import * as tsx from "vue-tsx-support";
import 'vue-tsx-support/enable-check';
declare type Props = {
    Width: Number | String;
    Height: Number | String;
    RowStyle: (rowIndex: number, row: any) => Object;
    Border: Boolean;
    Stripe: Boolean;
    Round: Boolean;
    HighlightRow: Boolean;
    Source: Array<any>;
    EmptyText: String;
};
declare type ScopedSlots = {
    default: void;
};
declare type EventsWithOn = {
    onCellClick: (e: MouseEvent, row: any, rowIndex: number, field: string) => void;
    onCellDbclick: (e: MouseEvent, row: any, rowIndex: number, field: string) => void;
    onRowHighlight: (rowIndex: number) => void;
    onTableSort: (field: string, sort: string) => void;
};
export default class iVsomTable extends tsx.Component<Props, EventsWithOn, ScopedSlots> {
    readonly width: number | string;
    readonly height: number | string;
    readonly rowStyle: (rowIndex: number, row: any) => Object;
    readonly border: boolean;
    readonly stripe: boolean;
    readonly round: boolean;
    readonly highlightRow: boolean;
    readonly source: Array<any>;
    readonly emptyText: string;
    bodyDiff: number;
    sortField: string;
    highlightIndex: number;
    private scrollVerticalThumb;
    private headerHeight;
    private bodyHeight;
    private dragScroll;
    private get calcWidth();
    private get calcHeight();
    private get calcScrollThumb();
    private get calcIsScrollable();
    protected onScrollMoveTo(e: MouseEvent): void;
    protected onDragScroll(e: MouseEvent): void;
    protected onMoveScroll(e: MouseEvent): void;
    protected onDropDragScroll(e: MouseEvent): void;
    protected onTableScrollWheel(e: WheelEvent): void;
    protected beforeMount(): void;
    protected render(): JSX.Element;
}
export {};
