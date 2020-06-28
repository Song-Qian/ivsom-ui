import * as tsx from 'vue-tsx-support';
interface Props {
    pageNumber: Number;
    pageSize: number[];
    totalCount: Number;
    pageGroup: Number;
}
interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget & InputEvent;
}
export default class iVsomPagination extends tsx.Component<Props, Event> {
    constructor();
    readonly pageNumber: number;
    readonly pagesize: number[];
    readonly totalcount: number;
    readonly pagegroup: number;
    private currentPage;
    private currentSize;
    private jumpPageNumber;
    private showPrevMore;
    private showNextMore;
    currentSizeValue(newValue: any, oldValue: any): void;
    protected created(): void;
    get showPageHelper(): boolean;
    get getCurrentPage(): number;
    get getCurrent(): number;
    get totalPage(): number;
    get groupList(): number[];
    protected prevPage(): void;
    protected nextPage(): void;
    protected showPrevPage(): void;
    protected showNextPage(): void;
    protected goPage(jumpPageNumber: number): void;
    protected jumpPage(pageNumber: number): void;
    protected input(e: HTMLInputEvent): void;
    protected render(): JSX.Element;
}
export {};
