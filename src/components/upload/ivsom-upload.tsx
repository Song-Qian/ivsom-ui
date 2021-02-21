/**
 * Developer    :   SongQian
 * Time         :   2020-08-09
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   Upload 上传组件
 */

 import { Component, Emit, Prop, Ref } from 'vue-property-decorator'
 import * as tsx from 'vue-tsx-support'
 import XhrUpload from './xhr-upload'
 import { hasUseMimeType } from './mimeType'

 import 'vue-tsx-support/enable-check'

 type Props = {
    // 上传文件地址
    Url : String
    //上传时附带参数
    Params : { [key: string]: any }
    //上传文件时标头属性，跨域请求时，服务端需要设置 Access-Control-Allow-Headers
    Headers : { [key: string]: any }
    //是否支持多文件上传
    Multiple : Boolean
    //视图类型
    View : "Annex" | "List" | "Grid"
    //是否启动拖拽上传文件
    Drag : Boolean
    //选择文件的文件类型, mime : https://www.w3school.com.cn/media/media_mimeref.asp
    Accept : "",
    //上传文件时，响应内容Mime类型重定义, mime : https://www.w3school.com.cn/media/media_mimeref.asp
    MimeType : String
    //是否自动上传
    Auto : Boolean
    //异步上传超时时间
    Timeout :Number
    //组件的宽度
    Width : Number | String
    //组件的高度
    Height : Number | String
    //当View === List，Grid时，显示的文本内容
    EmptyText : String,
    //上传视图界面为Button时，生效。
    Icon : String
    //上传视图界面为Button时，生效。按钮的文字
    Text : String
    //上传大文件是否切片上传
    Split : Boolean
    //上传完成后，是否自动移除文件
    RmoveOnComplete : Boolean,
    //上传失败后，是否自动移除文件
    RemoveOnError : Boolean,
    //切片的大小, KB
    SplitLimit : Number
 }

 @Component
 export default class iVsomUpload extends tsx.Component<Props> {

    @Prop({ default: '' }) readonly url !: string;
    @Prop({ default: null, type: Object }) readonly params !: { [key: string]: any };
    @Prop({ default: null, type: Object }) readonly headers !: { [key: string]: any };
    @Prop({ default: false, type: Boolean }) readonly multiple !: boolean;
    @Prop({ default: "Annex", type: String }) readonly view !: "Annex" | "List" | "Grid";
    @Prop({ default: false, type: Boolean }) readonly drag !: boolean;
    @Prop({ default: "*/*", type: String }) readonly accept !: string;
    @Prop({ default: null, type: Object }) readonly mimeType !: string;
    @Prop({ default: false, type: Boolean }) readonly auto !: boolean;
    @Prop({ default: 60 * 1000, type: Number }) readonly timeout !: number;
    @Prop({ default: '100%' }) readonly width !: number | string;
    @Prop({ default: 'auto' }) readonly height !: number | string;
    @Prop({ default: '拖拽上传文件到此区域' }) readonly emptyText !: string;
    @Prop({ default : 'icon-gongnengtubiao-121' }) readonly icon !: string;
    @Prop({ default : '选择文件', type: String }) readonly text !: string;
    @Prop({ default : false, type: Boolean}) readonly rmoveOnComplete !: boolean;
    @Prop({ default : false, type: Boolean}) readonly removeOnError !: boolean;
    @Prop({ default : false, type: Boolean }) readonly split !: boolean;
    @Prop({ default : 512, type : Number }) readonly splitLimit !: number;

    private xhrUpload = new XhrUpload();
    private uploadState : Map<string, { id : string, name : string, size : number, loaded : number, type: string, complete: boolean, error : string }> = new Map();

    private Unit = {
        GB : 2 << 29,
        MB : 2 << 19,
        KB : 2 << 9,
        B : 1 << 0
    }

    protected get getContainer() {
        let me = this;
        let w = me.width, h = me.height;
        if(typeof w === "number" ) {
            w = w + "px";
        }

        if(typeof h === "number" ) {
            h = h + "px";
        }
        return { width: w, height: h };
    }

    @Ref("files") readonly files !: HTMLInputElement;

    private hasSupportFileApi() : boolean {
        return Boolean(window.URL.createObjectURL) && Boolean(window.Blob) && Boolean(window.File);
    }

    private calcFileSize(size : number, Unit : string = 'B') : number {
        let me = this;
        switch (Unit) {
            case 'B':
                return (size / me.Unit.B);
            case 'KB':
                return (size / me.Unit.KB);
            case 'MB':
                return (size / me.Unit.MB);
            default:
                return (size / me.Unit.GB);
        }
    }

    private formatSize(size : number) : string {
        let me = this;
        let unit = ['B', 'KB', 'MB', 'GB'], result = 0, n = 0;
        do {
            result = me.calcFileSize(size, unit[n]);
            if(result < 1024 || unit[n] === 'GB') {
                break;
            }
            ++n;
        } while(n < unit.length)
        return result.toFixed(2) + unit[n];
    } 

    @Emit()
    protected onFileSelect(e: MouseEvent) {
        let me = this;
        me.files.click();
    }

    @Emit()
    protected onFileSelected(e : Event) {
        let me = this;
        let target = (e.target as HTMLInputElement);
        let files = target.files;
        me.uploadState.clear();
        me.xhrUpload.SaveUploadFiles(files)
        target.value = "";
        for(let file of me.xhrUpload.fileList) {
            let { id, name, size, type } = file;
            me.uploadState.set(id, { id, name, size, type, loaded: 0, complete: false, error : '' })
        }
        me.$forceUpdate();

        if(me.auto) {
            me.xhrUpload.FileUploadStart();
        }
    }
    
    @Emit()
    protected onFileRemove(e : MouseEvent | null, file: { id : string, name : string, size : number, complete: boolean, loaded : number, type: string, error: string}) {
        let me = this;
        if(me.xhrUpload.isFileUploading(file.id)) {
            me.xhrUpload.abortUploadFlie(file.id);
        }
        me.xhrUpload.removeUploadFile(file.id);
        me.uploadState.delete(file.id);
        me.$forceUpdate();
    }

    public Start() {
        let me = this;
        me.xhrUpload.FileUploadStart();
    }

    public AbortAll() {
        let me = this;
        for (let [key, file] of me.uploadState.entries()) {
            me.xhrUpload.abortUploadFlie(key);
        }
    }

    public Abort(fileId: string) {
        let me = this;
        if(me.uploadState.has(fileId)) {
            me.xhrUpload.abortUploadFlie(fileId);
        }
    }

    protected mounted() {
        let me = this;
        if(!me.hasSupportFileApi()) {
            throw new Error("当前浏览器不支持H5 File Api!")
        }
        me.xhrUpload.registerXhrUploadListener("xhrOnProgressCallback", me.onXhrOnProgress);
        me.xhrUpload.registerXhrUploadListener("xhrOnCompleteCallback", me.onXhrOnComplete);
        me.xhrUpload.registerXhrUploadListener("xhrOnAbortCallback", me.onXhrOnAbort);
        me.xhrUpload.registerXhrUploadListener("xhrOnLoadStartCallback", me.onXhrOnLoadStart);
        me.xhrUpload.registerXhrUploadListener("xhrOnLoadCallback", me.onXhrOnLoad);
        me.xhrUpload.registerXhrUploadListener("xhrOnLoadEndCallback", me.onXhrOnLoadEnd);
        me.xhrUpload.registerXhrUploadListener("xhrOnErrorCallback", me.onXhrOnError);
        me.xhrUpload.registerXhrUploadListener("xhrOnTimeoutCallback", me.onXhrOnTimeout);
        me.xhrUpload.setConfiguration({ url : me.url, headers : me.headers, params : me.params, name : "file", mimeType: me.mimeType, timeout : me.timeout, split: me.split, splitLimit : me.splitLimit });
    }
    
    protected updated() {
        let me = this;
        
        if(!me.hasSupportFileApi()) {
            throw new Error("当前浏览器不支持H5 File Api!")
        }

        if(me.xhrUpload.isAllUploaded()) {
            me.xhrUpload.setConfiguration({ url : me.url, headers : me.headers, params : me.params, name : "file", mimeType: me.mimeType, timeout : me.timeout, split: me.split, splitLimit : me.splitLimit });
        }
    }

    protected onXhrOnProgress(e : ProgressEvent, id : string, scale : number, file : File, xhrUpload : XhrUpload, data : any) : void {
        let me = this;
        let s = me.uploadState.get(id);
        if(s) {
            s.loaded = scale;
            s.complete = false;
            me.uploadState.set(id, s);
            me.$forceUpdate();
        }
        me.$emit("on-upload-progress", id, file, data)
    }
    
    protected onXhrOnComplete(e : Event, id : string, scale : number, file :File, xhrUpload : XhrUpload, data : any) : void {
        let me = this;
        let s = me.uploadState.get(id);
        if(s) {
            s.loaded = 100;
            s.complete = true;
            me.uploadState.set(id, s);
        }

        if(me.rmoveOnComplete) {
            me.onFileRemove(null, { id, name : file.name, size : file.size, type : file.type, complete: true, loaded: 100, error: '' });
        }
        me.$forceUpdate();
        me.$emit("on-upload-complete", id, file, data)
    }
    
    protected onXhrOnAbort(e : ProgressEvent, id : string, scale : number, file :File, xhrUpload : XhrUpload, data : any) : void {
        let me = this;
        let state = me.uploadState.get(id);
        if(state) {
            state.loaded = scale;
            state.complete = data.ok;
            state.error = data.message;
            me.uploadState.set(id, state);
        }
        me.$forceUpdate();
        me.$emit("on-upload-abort", id, file, data)
    }
    
    protected onXhrOnLoadStart(e : ProgressEvent, id : string, scale : number, file :File, xhrUpload : XhrUpload, data : any) : void {
        let me = this;
        let state = me.uploadState.get(id);
        if(state) {
            state.loaded = 0;
            state.complete = false;
            me.uploadState.set(id, state);
        }
        me.$forceUpdate();
        me.$emit("on-upload-beforeLoad", id, file, data)
    }
    
    protected onXhrOnLoad(e : ProgressEvent, id : string, scale : number, file :File, xhrUpload : XhrUpload, data : any) : void {
        let me = this;
        me.$emit("on-upload-load", id, file, data)
    }
    
    protected onXhrOnLoadEnd(e : ProgressEvent, id : string, scale : number, file :File, xhrUpload : XhrUpload, data : any) : void {
        let me = this;
        let state = me.uploadState.get(id);
        if(state) {
            state.loaded = scale;
            state.complete = true;
            me.uploadState.set(id, state);
        }
        me.$forceUpdate();
        me.$emit("on-upload-afterLoad", id, file, data)
    }
    
    protected onXhrOnError(e : ProgressEvent | Event, id : string, scale : number, file :File, xhrUpload : XhrUpload, data : any) : void {
        let me = this;
        let state = me.uploadState.get(id);
        if(state) {
            state.error = data.message;
            state.complete = data.ok;
            state.loaded = scale;
            me.uploadState.set(id, state);
        }
        if(me.removeOnError) {
            me.onFileRemove(null, { id, name : file.name, size : file.size, type : file.type, complete: data.ok, loaded: 0, error: data.message });
        }
        me.$forceUpdate();
        me.$emit("on-upload-error", id, file, data)
    }
    
    protected onXhrOnTimeout(e : ProgressEvent | Event, id : string, scale : number, file :File, xhrUpload : XhrUpload, data : any) : void {
        let me = this;
        let state = me.uploadState.get(id);
        if(state) {
            state.error = data.message;
            state.complete = data.ok;
            me.uploadState.set(id, state);
            me.$forceUpdate();
        }
        me.$emit("on-upload-timeout", id, file, data)
    }

    //拖拽文件进入目标区域时
    @Emit()
    protected onEnterDragArea(e : DragEvent) : void {

    }
    //拖拽文件在目标区域时
    @Emit()
    protected onDragFileWait(e : DragEvent) : void {

    }

    //拖拽文件离开目标区域时
    @Emit()
    protected onLeaveDragArea(e : DragEvent) : void {

    }
    //拖拽文件在目标区域释放时
    @Emit()
    protected onDragFileDone(e : DragEvent) : void {
        let me = this;
        let items = e.dataTransfer?.items;
        let records : Array<File> = [];
        if(items && items.length) {
            for(let i = 0, n = items.length; n && i < n; i++) {
                let it = items[i];
                let file = it.getAsFile();
                let mimeList = me.accept.split(/[\,]/g);
                if(file) {
                    let ext = file.name.substr(file.name.lastIndexOf("."));
                    let isUseFile = hasUseMimeType(file.type, ext, ...mimeList);
                    if(it.kind === 'file' && it.webkitGetAsEntry().isFile && isUseFile) {
                        records.push(file)
                    } else if(it.kind === 'file' && !it.webkitGetAsEntry().isFile) {
                        me.$emit("on-illegal-file", file, file.type, "禁止上传不合法文件")
                    } else if (it.kind === 'file' && it.webkitGetAsEntry().isFile && !isUseFile) {
                        me.$emit("on-illegal-file", file, file.type, "禁止上传不在Accept列表中的文件")
                    }
                }
                //非多选文件，则其它文件直接舍弃
                if(!me.multiple) {
                    break;
                }
            }
        }
        me.xhrUpload.AppendUploadFiles(records)
        for(let file of me.xhrUpload.fileList) {
            let { id, name, size, type } = file;
            if(!me.uploadState.has(id)) {
                me.uploadState.set(id, { id, name, size, type, loaded: 0, complete: false, error : '' })
            }
        }
        me.$forceUpdate();

        if(me.auto) {
            me.xhrUpload.FileUploadStart();
        }
    }

    protected render() : JSX.Element {
        let me = this;
        let annexContainer = 
            me.view === "Annex" ? (
                <div 
                    class={{ "ivsom-upload__annex" :true, "ivsom-upload_drag" : me.drag, "ivsom-upload_empty" : me.uploadState.size === 0 && me.view === "Annex" }} 
                    empty-text={me.uploadState.size === 0 ? me.emptyText :  ''}
                    onClick={ tsx.modifiers.stop((e : MouseEvent) => me.uploadState.size === 0 && me.drag ? me.onFileSelect(e) : void 0) }
                    onDragenter={ tsx.modifiers.stop.prevent((e : DragEvent) => me.drag ? me.onEnterDragArea(e) : void 0) } 
                    onDragover={ tsx.modifiers.stop.prevent((e : DragEvent) => me.drag ? me.onDragFileWait(e) : void 0) } 
                    onDragleave={ tsx.modifiers.stop.prevent((e : DragEvent) => me.drag ? me.onLeaveDragArea(e) : void 0) } 
                    onDrop={ tsx.modifiers.stop.prevent((e : DragEvent) => me.drag ? me.onDragFileDone(e) : void 0) }>
                    {
                        [...me.uploadState.values()].map((it) => {
                            return (
                                <div class={{ "ivsom-upload__annex_file" : true, "ivsom-upload__annex_error" : it.error !== "" }} key={it.id}>
                                    <div class="ivsom-upload__annex_progress" style={ { width: [it.loaded, '%'].join('') } }></div>
                                    <i class="iconfont icon-gongnengtubiao-117" ></i>
                                    <span class="ivsom-upload__annex_name" title={ it.name }>{ it.name }</span>
                                    <span class="ivsom-upload__annex_size">{ me.formatSize(it.size) }</span>
                                    <span class="ivsom-upload__annex_drop" onClick={ tsx.modifiers.stop((e : MouseEvent) => me.onFileRemove(e, it))  }>删除</span>
                                    <div class="ivsom-upload__annex_message" style={{ "display" : it.error ? "block" : "none" }}>{ it.error }</div>
                                </div>
                            )
                        })
                    }
                </div>) : me.view === "List" ? (
                <div class="ivsom-upload__list">
                    <div class="ivsom-upload__list_header">
                        <div class="ivsom-upload__columns_name">文件名</div>
                        <div class="ivsom-upload__columns_status">状态</div>
                        <div class="ivsom-upload__columns_size">大小</div>
                        <div class="ivsom-upload__columns_action">操作</div>
                    </div>
                    <div 
                        class={{ "ivsom-upload__list_body" : true, "ivsom-upload_drag" : me.drag, "ivsom-upload_empty" : me.uploadState.size === 0 }} 
                        empty-text={me.uploadState.size === 0 ? me.emptyText :  ''} 
                        onClick={ tsx.modifiers.stop((e : MouseEvent) => me.uploadState.size === 0 && me.drag ? me.onFileSelect(e) : void 0) }
                        onDragenter={ tsx.modifiers.stop.prevent((e : DragEvent) => me.drag ? me.onEnterDragArea(e) : void 0) } 
                        onDragover={ tsx.modifiers.stop.prevent((e : DragEvent) => me.drag ? me.onDragFileWait(e) : void 0) } 
                        onDragleave={ tsx.modifiers.stop.prevent((e : DragEvent) => me.drag ? me.onLeaveDragArea(e) : void 0) } 
                        onDrop={ tsx.modifiers.stop.prevent((e : DragEvent) => me.drag ? me.onDragFileDone(e) : void 0) }>
                        {
                            [...me.uploadState.values()].map((it) => {
                                return (
                                    <div class={{"ivsom-upload__list_file" : true, "ivsom-upload__list_error" :  it.error !== "" }} key={it.id}>
                                        <div class="ivsom-upload__list_progress" style={{ width: [it.loaded, '%'].join('') }}></div>
                                        <div class="ivsom-upload__columns_name" title={ it.name }>{ it.name }</div>
                                        <div class="ivsom-upload__columns_status">{ it.error ? it.error : it.complete ? '上传完成' : it.loaded > 0 ? '上传中,请等待...' : '等待上传'  }</div>
                                        <div class="ivsom-upload__columns_size">{ me.formatSize(it.size) }</div>
                                        <div class="ivsom-upload__columns_action">
                                            <span onClick={ tsx.modifiers.stop((e : MouseEvent) => me.onFileRemove(e, it)) }>删除</span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            ) : me.view === "Grid" ? (
                <div class={{ "ivsom-upload__grid" : true, "ivsom-upload_drag" : me.drag, "ivsom-upload_empty" : me.uploadState.size === 0 }} 
                    empty-text={me.uploadState.size === 0 ? me.emptyText :  ''} 
                    onClick={ tsx.modifiers.stop((e : MouseEvent) => me.uploadState.size === 0 && me.drag ? me.onFileSelect(e) : void 0) }
                    onDragenter={ tsx.modifiers.stop.prevent((e : DragEvent) => me.drag ? me.onEnterDragArea(e) : void 0) } 
                    onDragover={ tsx.modifiers.stop.prevent((e : DragEvent) => me.drag ? me.onDragFileWait(e) : void 0) } 
                    onDragleave={ tsx.modifiers.stop.prevent((e : DragEvent) => me.drag ? me.onLeaveDragArea(e) : void 0) } 
                    onDrop={ tsx.modifiers.stop.prevent((e : DragEvent) => me.drag ? me.onDragFileDone(e) : void 0) }>
                    <div class="ivsom-upload__warp">
                        {
                            [...me.uploadState.values()].map((it) => {
                                return (
                                    <div class={{"ivsom-upload__grid_file" : true, "ivsom-upload__list_error" :  it.error !== "" }} key={it.id}>
                                        <div class="ivsom-upload__grid_item">
                                            <div class="ivsom-upload__drop" onClick={ tsx.modifiers.stop((e : MouseEvent) => me.onFileRemove(e, it)) }><i class="iconfont icon-gongnengtubiao-41"></i></div>
                                            <div class={{ "ivsom-upload__content" :true, ["ivsom-upload__mime_" + (it.name.substr(it.name.lastIndexOf(".") + 1))] : true }} file-size={me.formatSize(it.size)}></div>
                                        </div>
                                        <div class="ivsom-upload__columns_name" title={ it.name }>
                                            <div class="ivsom-upload__grid_progress" style={{ width: [it.loaded, '%'].join('') }}></div>
                                            { it.name }
                                        </div>
                                        <div class="ivsom-upload__columns_status" title={ it.error ? it.error : it.complete ? '上传完成' : it.loaded > 0 ? '上传中,请等待...' : '等待上传' }>{ it.error ? it.error : it.complete ? '上传完成' : it.loaded > 0 ? '上传中,请等待...' : '等待上传'  }</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            ) : null;
        let container = !me.drag ? <i-vsom-button size="small"  type="primary" style="margin-bottom: 5px;" icon={ me.icon } onClick={ tsx.modifiers.stop(me.onFileSelect) }>{ me.text }</i-vsom-button> : null;
        return (
            <div class="ivsom-upload" style={{ width: me.getContainer.width, height: me.getContainer.height }}>
                <input class="ivsom-upload__files" type="file" ref="files" accept={ me.accept } multiple={ me.multiple } onChange={me.onFileSelected}></input>
                <div class="ivsom-upload__warp">
                    { container }
                    { annexContainer }
                </div>
            </div>
        )
    }
 }