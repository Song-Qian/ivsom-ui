import * as tsx from 'vue-tsx-support';
import 'vue-tsx-support/enable-check';
interface Props {
    currentPage: Number;
    totalCount: Number;
    limit: Number;
}
interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget & InputEvent;
}
export default class iVsomPagination extends tsx.Component<Props, Event> {
    constructor();
    currentPage: number;
    limit: number;
    readonly totalcount: number;
    readonly showtotal: boolean;
    readonly showsize: boolean;
    readonly showelevator: boolean;
    private limitNums;
    protected limitNum: number;
    private jumpPageNumber;
    get totalPage(): number;
    get indexs(): number[];
    protected btnClick(data: any): void;
    protected nextPage(data: number): void;
    protected prvePage(data: number): void;
    protected setButtonClass(isNext: any): "" | "page-button-disabled";
    protected input(e: HTMLInputEvent): void;
    protected initLimitNums(): void;
    protected created(): void;
    protected goPage(jumpPageNumber: number): void;
    protected render(): JSX.Element;
}
export {};
