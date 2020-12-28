/**
 * Developer    :   SongQian
 * Time         :   2020-08-09
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   H5 api ajax上传功能
 */
import uuid from '~/utils/uuid'
import * as SparkMD5 from 'spark-md5'

export default class XhrUpload {

    //文件列表
    private records : Map<string, File> = new Map<string, File>();
    //请求地址
    private url : string = "";
    //发送上传文件的字段名
    private name : string = "file";
    //请求头
    private headers : { [key:string] : any } = {};
    //请求附带参数
    private params : { [key:string] : any } = {};
    //response 数据类型处理方式覆盖
    private mimeType : string = "";
    //ajax 超时时间
    private timeout : number = 60 * 1000;
    //是否分包
    private split : boolean = false;
    //分包大小 KB
    private splitLimit : number = 1;

    private xhrOnProgressCallback !: (e : ProgressEvent, id : string, scale : number, file : File, xhrUpload : XhrUpload, data : any) => void;
    private xhrOnCompleteCallback !: (e : Event, id : string, scale : number, file :File, xhrUpload : XhrUpload, data : any) => void;
    private xhrOnAbortCallback !: (e : ProgressEvent, id : string, scale : number, file :File, xhrUpload : XhrUpload, data : any) => void;
    private xhrOnLoadStartCallback !: (e : ProgressEvent, id : string, scale : number, file :File, xhrUpload : XhrUpload, data : any) => void;
    private xhrOnLoadCallback !: (e : ProgressEvent, id : string, scale : number, file :File, xhrUpload : XhrUpload, data : any) => void;
    private xhrOnLoadEndCallback !: (e : ProgressEvent, id : string, scale : number, file :File, xhr : XhrUpload, data : any) => void;
    private xhrOnErrorCallback !: (e : ProgressEvent | Event, id : string, scale : number, file :File, xhrUpload : XhrUpload, data : any) => void;
    private xhrOnTimeoutCallback !: (e : ProgressEvent | Event, id : string, scale : number, file : File, xhrUpload : XhrUpload, data : any) => void; 

    private xhrPool = new Map<string, XMLHttpRequest>();

    public get size() {
        let me = this;
        return me.records.size;
    }

    public get fileList() : Array<{ id : string, name : string, size : number, type : string }> {
        let me = this;
        let result = [];
        for(let[id, file] of me.records.entries()) {
            result.push({ id, name : file.name, size : file.size, type : file.type });
        }
        return result;
    }

    public setConfiguration(conf : { [key:string]: any }) {
        var me = this;

        if(me.xhrPool.size > 0) {
            throw new Error("组件正在有文件进行数据上传，修改上传配置信息可能会导致数据不稳定！")
        }

        if(conf.url) {
            me.url = conf.url;
        }

        if(conf.headers) {
            me.headers  = { ...conf.headers }
        }

        if(conf.params) {
            me.params = { ...conf.params }
        }

        if(conf.name) {
            me.name = conf.name;
        }

        if(conf.mimeType) {
            me.mimeType = conf.mimeType;
        }

        if(conf.timeout) {
            me.timeout = conf.timeout;
        }

        if(typeof conf.split === "boolean") {
            me.split = conf.split;
        }

        if(typeof conf.splitLimit === "number") {
            me.splitLimit = conf.splitLimit;
        }
    }

    public SaveUploadFiles(records : FileList | null) {
        let me = this;
        me.records.clear();
        if(records == null) {
            return;
        }
        for(let i = 0, n = records.length; i < n; i++) {
            let UID = uuid().replace(/\-/g, '');
            me.records.set(UID, records[i]);
        }
    }

    public AppendUploadFiles(records : FileList | Array<File>) {
        let me = this;
        if(records == null) {
            return;
        }

        for(let i = 0, n = records.length; i < n; i++) {
            let UID = uuid().replace(/\-/g, '');
            me.records.set(UID, records[i]);
        }
    }

    public registerXhrUploadListener<E extends Event>(name : string, callback : (e: E, id : string, scale : number, file : File, xhrUpload : XhrUpload, data : any) => void) {
        let events = { 
            "xhrOnProgressCallback" : callback, 
            "xhrOnCompleteCallback" : callback, 
            "xhrOnAbortCallback" : callback, 
            "xhrOnLoadStartCallback" : callback, 
            "xhrOnLoadCallback" : callback, 
            "xhrOnLoadEndCallback" : callback,
            "xhrOnErrorCallback" : callback,
            "xhrOnTimeoutCallback" : callback
        };
        if(events.hasOwnProperty(name)) {
            (<any>this)[name] = (<any>events)[name];
        }
    }

    public FileUploadStart() {
        let me = this;
        if(!me.split) {
            for(let [key, file] of me.records ) {
                if(!me.xhrPool.has(key)) {
                    me.createXhrRequest(key, file);
                }
            }
        }

        if(me.split) {
            for(let [key, file] of me.records) {
                if(!me.xhrPool.has(key)) {
                    me.createDetritusXhrRequest(key, file);
                }
            }
        }
    }

    public isAllUploaded() : boolean {
        let me = this;
        return me.xhrPool.size === 0;
    }

    public isFileUploading(id: string) : boolean {
        let me = this;
        let xhr = me.xhrPool.get(id);
        return Boolean(xhr);
    }

    public abortUploadFlie(id: string) : void {
        let me = this;
        let xhr = me.xhrPool.get(id);
        xhr?.abort();
        me.xhrPool.delete(id);
    }

    public removeUploadFile(id: string) {
        let me = this;
        let xhr = me.xhrPool.get(id);
        if(xhr?.readyState === 3) {
            xhr.abort();
        }
        me.xhrPool.delete(id);
        me.records.delete(id);
    }

    private createXhrRequest(id : string, file : File) {
        let me = this;
        let xhr = new XMLHttpRequest();
        me.xhrPool.set(id, xhr);
        xhr.onreadystatechange = me.xhrStatusChange.bind({ xhr, id, file, xhrUpload : me });
        xhr.open("POST", me.url, true);
        xhr.setRequestHeader("ivsom-uploader-mark-uid", id);
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.timeout = me.timeout;
        if(me.headers && Object.keys(me.headers).length > 0) {
            for(let key in me.headers) {
                xhr.setRequestHeader(key, me.headers[key]);
            }
        }
        if(me.mimeType) {
            xhr.overrideMimeType(me.mimeType);
        }
        xhr.upload.onprogress = me.xhrProgressChange.bind({ xhr, id, file, xhrUpload : me });
        xhr.upload.onabort = me.xhrAbortChange.bind({ xhr, id, file, xhrUpload : me });
        xhr.upload.onerror = me.xhrError.bind({ xhr, id, file, xhrUpload : me });
        xhr.upload.onloadstart = me.xhrUploadStart.bind({ xhr, id, file, xhrUpload : me });
        xhr.upload.onload = me.xhrUploadLoad.bind({ xhr, id, file, xhrUpload : me });
        xhr.upload.onloadend = me.xhrUploadEnd.bind({ xhr, id, file, xhrUpload : me });
        xhr.upload.ontimeout = me.xhrUploadTimeout.bind({ xhr, id, file, xhrUpload : me });
        xhr.send(me.createFormData(file, me.params))
    }

    private async createDetritusXhrRequest(id : string, file : File) {
        let me = this;
        let total = file.size;
        let detritu = 0;
        let limit = me.splitLimit * (2 << 9);
        let maxDetritus = Math.ceil(total / limit);
        let bytes = await file.arrayBuffer();
        let chunkMd5 = new SparkMD5.ArrayBuffer();
        let md5 = chunkMd5.append(bytes.slice(0, Math.min(2 * (2 << 19), bytes.byteLength))).end();

        let loopUploadDetritu = () => {
            let xhr = new XMLHttpRequest();
            me.xhrPool.set(id, xhr);
            var fileBlob = new Blob([bytes.slice(detritu * limit, Math.min((detritu + 1) * limit, bytes.byteLength))], { type : file.type })
            xhr.onreadystatechange = (e : Event) => {
                let isSuccess = xhr.status >= 200 && xhr.status < 300 || xhr.status === 304;
                if(xhr.readyState === 4) {
                    let contentType = xhr.getResponseHeader("Content-Type");
                    let data = contentType === "application/json" ? JSON.parse(xhr.response) : xhr.response;
                    let chunkDetritu = data["ivsom-upload-detritu"] && data["detritu"] || 0;
                    let scale = ((Math.min(detritu * limit, bytes.byteLength) / bytes.byteLength) * 100).toFixed(2);
                    if(detritu + 1 > maxDetritus) {
                        me.xhrOnCompleteCallback && me.xhrOnCompleteCallback(e, id, Number(scale), file, me, data);
                        return;
                    }
                    if(isSuccess) {
                        detritu = detritu < chunkDetritu ? Number(chunkDetritu) - 1 : detritu + 1;
                        loopUploadDetritu();
                    } else if (xhr.status === 0 && xhr.timeout === me.timeout) {
                        me.xhrOnTimeoutCallback && me.xhrOnTimeoutCallback(e, id, Number(scale), file, me, { ok : false, message : '服务器响应超时!' });
                    } else if (xhr.status === 0) {
                        me.xhrOnErrorCallback && me.xhrOnErrorCallback(e, id, Number(scale), file, me, { ok : false, message : "服务器出现网络异常!" });
                    }
                }
            }
            xhr.open("POST", me.url, true);
            xhr.setRequestHeader("ivsom-uploader-mark-uid", id);
            xhr.setRequestHeader("ivsom-uploader-detritu", String(detritu + 1));
            xhr.setRequestHeader("ivsom-uploader-detritu-md5", md5);
            xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            xhr.timeout = me.timeout;
            if(me.headers && Object.keys(me.headers).length > 0) {
                for(let key in me.headers) {
                    xhr.setRequestHeader(key, me.headers[key]);
                }
            }

            if(me.mimeType) {
                xhr.overrideMimeType(me.mimeType);
            }
            xhr.upload.onprogress = me.xhrProgressChange.bind({ xhr, id, file, detritu, limit, bytes, xhrUpload : me });
            xhr.upload.onabort = me.xhrAbortChange.bind({ xhr, id, file, detritu, limit, bytes, xhrUpload : me });
            xhr.upload.onerror = me.xhrError.bind({ xhr, id, file, detritu, limit, bytes, xhrUpload : me });
            xhr.upload.onloadstart = me.xhrUploadStart.bind({ xhr, id, file, detritu, limit, bytes, xhrUpload : me });
            xhr.upload.onload = me.xhrUploadLoad.bind({ xhr, id, file, detritu, limit, bytes, xhrUpload : me });
            xhr.upload.onloadend = me.xhrUploadEnd.bind({ xhr, id, file, detritu, limit, bytes, xhrUpload : me });
            xhr.upload.ontimeout = me.xhrUploadTimeout.bind({ xhr, id, file, detritu, limit, bytes, xhrUpload : me });
            xhr.send(me.createFormData(new File([fileBlob], file.name, { type: file.type }), me.params))
        }

        loopUploadDetritu();

    }

    private createFormData(file : File, params : { [key:string] : any }) : FormData {
        let me = this;
        let formData = new FormData();
        formData.append(me.name, file);
        if(params && Object.keys(params).length > 0) {
            for(let key in params) {
                formData.append(key, params[key]);
            }
        }
        return formData;
    }

    /**
     * 
     * 服务端正常错误
     * xhrStatusChange -> xhrUploadStart -> xhrProgressChange -> xhrUploadLoad -> xhrUploadEnd -> xhrStatusChange(xhrOnErrorCallback)
     * 正常上传
     * xhrStatusChange -> xhrUploadStart -> xhrProgressChange -> xhrUploadLoad -> xhrUploadEnd -> xhrStatusChange
     * 服务端网络错误
     * xhrStatusChange -> xhrUploadStart -> xhrStatusChange(xhrOnErrorCallback) -> xhrError -> xhrUploadEnd
     * 服务端超时
     * xhrStatusChange -> xhrUploadStart -> xhrProgressChange -> xhrStatusChange(xhrOnErrorCallback) -> xhrUploadTimeout -> xhrUploadEnd
     **/
    //当前上传ajax状态发生改变时持行
    private xhrStatusChange(e: Event) {
        let { xhr, id , file, xhrUpload } = this as any;
        let isSuccess = xhr.status >= 200 && xhr.status < 300 || xhr.status === 304;
        if(xhr.readyState === 4) {
            let contentType = xhr.getResponseHeader("Content-Type")
            let data = contentType === "application/json" ? JSON.parse(xhr.response) : xhr.response;
            data = xhr.status === 0 ? { ok : false, message : "服务器出现网络异常!" } : data;
            if(isSuccess) {
                xhrUpload.xhrOnCompleteCallback && xhrUpload.xhrOnCompleteCallback(e, id, file, xhrUpload, data);
            } else {
                xhrUpload.xhrOnErrorCallback && xhrUpload.xhrOnErrorCallback(e, id, file, 0, xhrUpload, data);
            }
        }
    }

    //当请求发送更多数据时，会定期触发该事件
    private xhrProgressChange(e : ProgressEvent) {
        //(id : string, scale : number, file : File, xhrUpload : XhrUpload)
        let { xhr, id , file, xhrUpload } = this as any;
        if(!xhrUpload.split && e.lengthComputable) {
            let scale = ((e.loaded / e.total) * 100).toFixed(2);
            xhrUpload.xhrOnProgressCallback && xhrUpload.xhrOnProgressCallback(e, id, Number(scale), file, xhrUpload, xhr.response);
        }

        if(xhrUpload.split) {
            let { detritu, limit, bytes } = this as any;
            let scale = ((Math.min(detritu * limit + e.loaded, bytes.byteLength) / bytes.byteLength) * 100).toFixed(2);
            xhrUpload.xhrOnProgressCallback && xhrUpload.xhrOnProgressCallback(e, id, Number(scale), file, xhrUpload, xhr.response);
        }
    }

    //当请求被中止时，例如因为程序调用时，将触发该事件
    private xhrAbortChange(e : ProgressEvent) {
        //(id : string, scale : number, file :File, xhrUpload : XhrUpload)
        let { xhr, id , file, xhrUpload } = this as any;
        if(!xhrUpload.split && e.lengthComputable) {
            let scale = ((e.loaded / e.total) * 100).toFixed(2);
            xhrUpload.xhrOnAbortCallback && xhrUpload.xhrOnAbortCallback(e, id, Number(scale), file, xhrUpload, { ok : false, message : "上传文件被中止" });
        }

        if(xhrUpload.split && e.lengthComputable) {
            let { detritu, limit, bytes } = this as any;
            let scale = ((Math.min(detritu * limit + e.loaded, bytes.byteLength) / bytes.byteLength) * 100).toFixed(2);
            xhrUpload.xhrOnAbortCallback && xhrUpload.xhrOnAbortCallback(e, id, Number(scale), file, xhrUpload, { ok : false, message : "上传文件被中止" });
        }

        xhrUpload.xhrPool.delete(id);
    }

    //当请求开始加载数据时，将触发该事件
    private xhrUploadStart(e : ProgressEvent) {
        //(id : string, scale : number, file : File, xhrUpload : XhrUpload)
        let { xhr, id, file, xhrUpload } = this as any;
        if(!xhrUpload.split && e.lengthComputable) {
            let scale = ((e.loaded / e.total) * 100).toFixed(2);
            xhrUpload.xhrOnLoadStartCallback && xhrUpload.xhrOnLoadStartCallback(e, id, Number(scale), file, xhrUpload, xhr.response);
        }

        if(xhrUpload.split && e.lengthComputable) {
            let { detritu, limit, bytes } = this as any;
            let scale = ((Math.min(detritu * limit + e.loaded, bytes.byteLength) / bytes.byteLength) * 100).toFixed(2);
            if(detritu === 0) {
                xhrUpload.xhrOnLoadStartCallback && xhrUpload.xhrOnLoadStartCallback(e, id, Number(scale), file, xhrUpload, xhr.response);
            }
        }
    }

    //事务成功完成load时将触发该事件
    private xhrUploadLoad(e : ProgressEvent) {
        //(id : string, scale : number, file : File, xhrUpload : XhrUpload)
        let { xhr, id , file, xhrUpload } = this as any;
        if(!xhrUpload.split && e.lengthComputable) {
            let scale = ((e.loaded / e.total) * 100).toFixed(2);
            xhrUpload.xhrOnLoadCallback && xhrUpload.xhrOnLoadCallback(e, id, Number(scale), file, xhrUpload, xhr.response);
        }

        if(xhrUpload.split && e.lengthComputable) {
            let { detritu, limit, bytes } = this as any;
            let scale = ((Math.min(detritu * limit + e.loaded, bytes.byteLength) / bytes.byteLength) * 100).toFixed(2);
            xhrUpload.xhrOnLoadCallback && xhrUpload.xhrOnLoadCallback(e, id, Number(scale), file, xhrUpload, xhr.response);
        }
    }

    //loadend请求完成（无论是成功（load之后）还是失败（abort或error之后））都会触发该事件。
    private xhrUploadEnd(e : ProgressEvent) {
        //(id : string, scale : number, file : File, xhrUpload : XhrUpload)
        let { xhr, id , file, xhrUpload } = this as any;
        if(!xhrUpload.split && e.lengthComputable) {
            let scale = ((e.loaded / e.total) * 100).toFixed(2);
            xhrUpload.xhrOnLoadEndCallback && xhrUpload.xhrOnLoadEndCallback(e, id, Number(scale), file, xhrUpload, xhr.response);
        }

        if(xhrUpload.split && e.lengthComputable) {
            let { detritu, limit, bytes} = this as any;
            let scale = ((Math.min(detritu * limit + e.loaded, bytes.byteLength) / bytes.byteLength) * 100).toFixed(2);
            if(detritu * limit >= bytes.byteLength) {
                xhrUpload.xhrOnLoadEndCallback && xhrUpload.xhrOnLoadEndCallback(e, id, Number(scale), file, xhrUpload, xhr.response);
            }
        }
    }

    //由于预设时间到期而导致进程终止时，将触发该事件。
    private xhrUploadTimeout(e : ProgressEvent) {
        //(id : string, scale : number, file : File, xhrUpload : XhrUpload)
        let { xhr, id , file, xhrUpload } = this as any;
        if(!xhrUpload.split) {
            let scale = ((e.loaded / e.total) * 100).toFixed(2);
            xhrUpload.xhrOnTimeoutCallback && xhrUpload.xhrOnTimeoutCallback(e, id, Number(scale), file, xhrUpload, { ok : false, message : '服务器响应超时!' });
        }

        if(xhrUpload.split && e.lengthComputable) {
            let { detritu, limit, bytes } = this as any;
            let scale = ((Math.min(detritu * limit + e.loaded, bytes.byteLength) / bytes.byteLength) * 100).toFixed(2);
            xhrUpload.xhrOnTimeoutCallback && xhrUpload.xhrOnTimeoutCallback(e, id, Number(scale), file, xhrUpload, { ok : false, message : '服务器响应超时!' });
        }
    }

    //当请求遇到错误时，将触发该事件。
    private xhrError(e : ProgressEvent) {
        //(id : string, scale : number, file : File, xhrUpload : XhrUpload)
        let { xhr, id , file, xhrUpload } = this as any;
        if(!xhrUpload.split && e.lengthComputable) {
            xhrUpload.xhrOnErrorCallback && xhrUpload.xhrOnErrorCallback(e, id, file, 0, xhrUpload, { ok : false, message : '服务器出现网络异常!' });
        }

        if(xhrUpload.split && e.lengthComputable) {
            let { detritu, limit, bytes } = this as any;
            let scale = ((Math.min(detritu * limit + e.loaded, bytes.byteLength) / bytes.byteLength) * 100).toFixed(2);
            xhrUpload.xhrOnErrorCallback && xhrUpload.xhrOnErrorCallback(e, id, file, scale, xhrUpload, { ok : false, message : '服务器出现网络异常!' });
        }
    }
}