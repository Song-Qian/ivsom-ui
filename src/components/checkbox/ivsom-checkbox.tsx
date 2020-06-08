/**
 * Developer    :   SongQian
 * Time         :   2020-06-04
 * eMail        :   songqian@wtoe.cn
 * Description  :   checkbox组件
 */
import * as tsx from 'vue-tsx-support'
import { Component, Prop, Emit, Watch,} from 'vue-property-decorator'
import uuid from '~/utils/uuid'


interface Props{
    value:string,//v-model绑定的值
    dataSource:Array<{ label : string,  value : string }>//复选框对应的数据源

}
interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget&InputEvent;
}
type ScopedSlots = {
    default : void
 }

@Component
export default class iVsomCheckbox extends tsx.Component<Props,Event,ScopedSlots>{
    constructor(){
        super()
    }
    @Prop({ default : "" }) readonly value !: string;
    @Prop({default:null}) readonly dataSource!:Array<{ label : string,  value : string,disabled:boolean}>;

    private checkedModel :any = this.value;
   
    // @Emit()
    protected  change(event: HTMLInputEvent){
        var vModel = this.getModel; //每次触发都先获取父级的v-model，保证多个选项的数据同步，v-model初始值中可能存在冗余数据，后面需要用filterModel过滤掉冗余数据。
        if (this.dataSource.length <= 1)
        {
        vModel.splice(0, vModel.length);
        }
        const  val  = event.target.value as any
        const isChecked=event.target.checked as boolean
        var index = vModel.indexOf(val);
        if(isChecked){
            if (event){
                if (index < 0)
                {
                vModel.push(val);
                }
                }
                else {
                if (index >= 0) {
                vModel.splice(index, 1); //数组中移除
                }
                }
        }else{
            vModel.splice(index, 1) 
        }
        vModel = this.filterModel(vModel);//清除冗余数值
        if (!Array.isArray(this.value)) {
        vModel = vModel.join(",");//如果v-model是字符串，同步时候也转为字符串。
        }
        this.$emit("change",vModel);//同步父级的v-model 
    }
      
    protected isChecked(val:any){
        var vModel = this.getModel;
        //务必toString()后再查找，否则会和数值型不兼容。
        if (vModel.indexOf(val.toString()) > -1)
        {
        return true;
        }
        else
        {
        return false;
        }
    }

   get getModel() {
    if (Array.isArray(this.value)) {
    this.checkedModel = this.value;
    }
    else {
        this.checkedModel = this.value.toString().split(",");
    }
    return this.checkedModel
    }

    protected filterModel(vModel:[]){
        const dataSource = this.dataSource;
        const canSetValue:[] = [];
        const dataSourceValue:any = [];
        for (var i = 0; i < dataSource.length; i++)
        {
        dataSourceValue.push(dataSource[i].value.toString()); //需要转为字符串，兼容数字类型值
        }
        vModel.forEach(function (item, index) {
        const Index = dataSourceValue.indexOf(item);
        if (Index > -1) {
        canSetValue.push(item);
        }
        });
        return canSetValue;
    }

    private readonly map = new Map<string, { label : string,  value : string,disabled:boolean }>();

    protected get checkboxProvide() : Map<string, { label : string,  value : string,disabled:boolean }> {
        const me = this;
        let len = 0;
        me.map.clear();
        while(me.dataSource && len < me.dataSource.length) {
            me.map.set(uuid(), me.dataSource[len]);
            ++len;
        }
        return me.map;
    }

    protected set checkboxProvide(map : Map<string, {  label : string,  value : string,disabled:boolean }>) {
        const me = this;
        me.$emit('update:dataSource', [ ...map.values()]);
    }

    protected render() : JSX.Element {
        const me = this;
        const optionsEl = ((map) => {
            const element = [];
            for (let [k, item] of map.entries()) {
                let c =<span data-value={item.value}> 
                <label class={ `ivsom-checkbox  ${ item.disabled ? 'ivsom-checkbox_disabled' : '' }` }  key={ k as any }>
                 <input type="checkbox" checked={this.isChecked(item.value)}  disabled={!!item.disabled} onChange={ (e) => { me.change(e as HTMLInputEvent) } } value={item.value}/> {item.label}
                 </label></span>
                element.push(c);
            }
             return element.slice(0, element.length);
        })(me.checkboxProvide)
        return (
        <div>{optionsEl}<span> { me.$scopedSlots.default && me.$scopedSlots.default() }
        </span></div>
       )
    }
}