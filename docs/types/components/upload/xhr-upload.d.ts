export default class XhrUpload {
    private records;
    private url;
    private name;
    private headers;
    private params;
    private mimeType;
    private timeout;
    private split;
    private splitLimit;
    private xhrOnProgressCallback;
    private xhrOnCompleteCallback;
    private xhrOnAbortCallback;
    private xhrOnLoadStartCallback;
    private xhrOnLoadCallback;
    private xhrOnLoadEndCallback;
    private xhrOnErrorCallback;
    private xhrOnTimeoutCallback;
    private xhrPool;
    get size(): number;
    get fileList(): Array<{
        id: string;
        name: string;
        size: number;
        type: string;
    }>;
    setConfiguration(conf: {
        [key: string]: any;
    }): void;
    SaveUploadFiles(records: FileList | null): void;
    AppendUploadFiles(records: FileList | Array<File>): void;
    registerXhrUploadListener<E extends Event>(name: string, callback: (e: E, id: string, scale: number, file: File, xhrUpload: XhrUpload, data: any) => void): void;
    FileUploadStart(): void;
    isAllUploaded(): boolean;
    isFileUploading(id: string): boolean;
    abortUploadFlie(id: string): void;
    removeUploadFile(id: string): void;
    private createXhrRequest;
    private createDetritusXhrRequest;
    private createFormData;
    private xhrStatusChange;
    private xhrProgressChange;
    private xhrAbortChange;
    private xhrUploadStart;
    private xhrUploadLoad;
    private xhrUploadEnd;
    private xhrUploadTimeout;
    private xhrError;
}
