/**
 * Developer    :   SongQian
 * Time         :   2020-05-28
 * eMail        :   songqian@wtoe.cn
 * Description  :   radio组件
 */
import * as tsx from 'vue-tsx-support'
import { Component, Prop, Emit, Watch,} from 'vue-property-decorator'
import uuid from '~/utils/uuid'

interface Props{
    options:Array<{ name : string,  value : string }>,//单选框对应的数据源
    selectOption:String,//双向绑定对应的选中的vaule值
    icon:String  
    // Disabled: Boolean,
}
interface Event {
    onClick : (e : MouseEvent) => void;
}
interface ScopedSlots{
    default:void
}

@Component
export default class iVsomRadio extends tsx.Component<Props,Event,ScopedSlots>{
    constructor(){
        super()
    }
    @Prop({default:null}) readonly options!:Array<{ name : string,  value : string,disabled:boolean }>;
    @Prop({ default : null }) readonly icon !: string;

    // @Prop({default : false, type : Boolean}) readonly disabled!:boolean;
    @Prop({default :"", type : String}) readonly selectoption!:string;
    // @Ref('radio') protected readonly radio !:  HTMLInputElement;

    private selectRadio : string = "";


    protected mounted() {
         const me=this
         me.selectRadio = me.selectoption;  
    }
     
    @Emit()
    protected radioChange(e : MouseEvent): void {
        const me=this
        const { value } = e.target as any
        me.selectRadio = value
   }

    private readonly map = new Map<string, { name : string,  value : string ,disabled:boolean }>();

    protected get optionProvide() : Map<string, { name : string,  value : string,disabled:boolean  }> {
        const me = this;
        let len = 0;
        me.map.clear();
        while(me.options && len < me.options.length) {
            me.map.set(uuid(), me.options[len]);
            ++len;
        }
        return me.map;
    }

    protected set optionProvide(map : Map<string, { name : string,  value : string,disabled:boolean  }>) {
        const me = this;
        me.$emit('update:options', [ ...map.values()]);
    }
  
    protected render() : JSX.Element {
        const me = this;
        const m = tsx.modifiers;
        const optionsEl = ((map) => {
            const element = [];
            for (let [k, item] of map.entries()) {
                let c = (<div key={ k as string } class={{'radio-wrapper':true,"radio-wrapper_disabled":item.disabled==true}} >
                           <lable  class={{'ivsom-radio':true,"checked":me.selectRadio == item.value,"ivsom-radio_disabled":item.disabled==true}}>
                               <input type="radio" value={item.value} disabled={ !!item.disabled } onClick={ (e) => { me.radioChange(e as MouseEvent) } }  />
                           </lable>
                           <i class={ `iconfont ${ me.icon }` }></i>
                           { item.name }
                        </div>)
                element.push(c);
            }
            return element.slice(0, element.length);
        })(me.optionProvide)
        return (
        <div>{optionsEl}</div>
       )
    }

}
