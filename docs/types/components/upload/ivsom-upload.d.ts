import * as tsx from 'vue-tsx-support';
import XhrUpload from './xhr-upload';
import 'vue-tsx-support/enable-check';
declare type Props = {
    Url: String;
    Params: {
        [key: string]: any;
    };
    Headers: {
        [key: string]: any;
    };
    Multiple: Boolean;
    View: "Annex" | "List" | "Grid";
    Drag: Boolean;
    Accept: "";
    MimeType: String;
    Auto: Boolean;
    Timeout: Number;
    Width: Number | String;
    Height: Number | String;
    EmptyText: String;
    Icon: String;
    Text: String;
    Split: Boolean;
    RmoveOnComplete: Boolean;
    RemoveOnError: Boolean;
    SplitLimit: Number;
};
export default class iVsomUpload extends tsx.Component<Props> {
    readonly url: string;
    readonly params: {
        [key: string]: any;
    };
    readonly headers: {
        [key: string]: any;
    };
    readonly multiple: boolean;
    readonly view: "Annex" | "List" | "Grid";
    readonly drag: boolean;
    readonly accept: string;
    readonly mimeType: string;
    readonly auto: boolean;
    readonly timeout: number;
    readonly width: number | string;
    readonly height: number | string;
    readonly emptyText: string;
    readonly icon: string;
    readonly text: string;
    readonly rmoveOnComplete: boolean;
    readonly removeOnError: boolean;
    readonly split: boolean;
    readonly splitLimit: number;
    private xhrUpload;
    private uploadState;
    private Unit;
    protected get getContainer(): {
        width: string;
        height: string;
    };
    readonly files: HTMLInputElement;
    private hasSupportFileApi;
    private calcFileSize;
    private formatSize;
    protected onFileSelect(e: MouseEvent): void;
    protected onFileSelected(e: Event): void;
    protected onFileRemove(e: MouseEvent | null, file: {
        id: string;
        name: string;
        size: number;
        complete: boolean;
        loaded: number;
        type: string;
        error: string;
    }): void;
    Start(): void;
    AbortAll(): void;
    Abort(fileId: string): void;
    protected mounted(): void;
    protected updated(): void;
    protected onXhrOnProgress(e: ProgressEvent, id: string, scale: number, file: File, xhrUpload: XhrUpload, data: any): void;
    protected onXhrOnComplete(e: Event, id: string, scale: number, file: File, xhrUpload: XhrUpload, data: any): void;
    protected onXhrOnAbort(e: ProgressEvent, id: string, scale: number, file: File, xhrUpload: XhrUpload, data: any): void;
    protected onXhrOnLoadStart(e: ProgressEvent, id: string, scale: number, file: File, xhrUpload: XhrUpload, data: any): void;
    protected onXhrOnLoad(e: ProgressEvent, id: string, scale: number, file: File, xhrUpload: XhrUpload, data: any): void;
    protected onXhrOnLoadEnd(e: ProgressEvent, id: string, scale: number, file: File, xhrUpload: XhrUpload, data: any): void;
    protected onXhrOnError(e: ProgressEvent | Event, id: string, scale: number, file: File, xhrUpload: XhrUpload, data: any): void;
    protected onXhrOnTimeout(e: ProgressEvent | Event, id: string, scale: number, file: File, xhrUpload: XhrUpload, data: any): void;
    protected onEnterDragArea(e: DragEvent): void;
    protected onDragFileWait(e: DragEvent): void;
    protected onLeaveDragArea(e: DragEvent): void;
    protected onDragFileDone(e: DragEvent): void;
    protected render(): JSX.Element;
}
export {};
