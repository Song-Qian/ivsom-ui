import * as tsx from 'vue-tsx-support'
import { Component, Prop, Emit, Watch,Ref} from 'vue-property-decorator'
import uuid from '~/utils/uuid'

interface Props{
    max:Number,
    min:Number,
    step:Number,//每次计算的单位
    value:Number,//绑定的值
    precision:Number,
    disabled:Boolean
}

@Component
export default class iVsomInputNumber extends tsx.Component<Props>{
    constructor(){
        super()
    }
    @Prop({type:Number}) readonly max!:number;
    @Prop({type:Number}) readonly min!:number;
    @Prop({default:1,type:Number}) readonly step!:number;
    @Prop({default:false,type:Boolean}) readonly disabled!:boolean;
    @Prop({default:null}) readonly value!:string|number;
    @Prop({}) readonly precision!:number;
    @Ref('radio') protected readonly input !:  HTMLInputElement;

    
    protected reduce(e : MouseEvent){
        if(!this.disabled){
            let num = Number(this.value) - this.step;
            this.emitVal(num);
        }  
    }

    protected add(e : MouseEvent){
        if(!this.disabled){
            let num = Number(this.value) + this.step; // 加上固定的长度
            // 这里我们抽象出一个专门负责数值的变化的函数
          this.emitVal(num);
        }
    }
    protected inputChange(e:InputEvent){
          this.emitVal(Number(e.target));
    }
    protected emitVal(newVal:any){
        let { max, min } = this;
        // 不传参数的时候默认值就是undefined
        // 对这个值的限制就是, max之内, min以上
        if (max !== undefined && newVal > max) newVal = max;
        if (min !== undefined && newVal < min) newVal = min;
        // 这里兼容一下位数控制
        let value = Number(newVal).toFixed(this.precision);
        // console.log(this.precision)
        // 这个oldVal下面会解释:point_down:
        // if (value === this.oldVal) return;
        // this.oldVal = ls;
        // 发出两个事件, 一个负责改变value, 一个负责返回给用户
        // 毕竟用户不可能监听input事件然后再把值附上去, 太麻烦
        this.$emit("input", value);
        this.$emit("change", value);
        // 这一步很重要
        // 下面会详细说
        // this.input.value = value;
    }
    
     protected created(){
        this.$emit("input", Number(this.value).toFixed(this.precision))
     }
    
    @Watch("value")
      protected  modelValue() {
        let newVal = this.value === undefined ? this.value : Number(this.value);
        if (newVal !== undefined) {
          if (isNaN(newVal)) {
            return;
          }
        }
        // if (this.precision !== undefined) {
        //     newVal = this.toPrecision(newVal, this.precision);
        //   }
        this.emitVal(newVal);
       }
     get valueMax(){
         return this.value == this.max
     }
     get valueMin(){
        return this.value == this.min
    }

    protected render() : JSX.Element{
        return (
            <div class={ `ivsom-input-number  ${ this.disabled ? 'ivsom-inputNumber_disabled' : '' }` }>
                <div class={ `ivsom-input-number__reduce ${this.valueMin?"limitMax":""} ${ this.disabled ? 'ivsom-inputNumber_disabled' : '' }` } disabled={this.disabled}  onClick={ (e) => { this.reduce(e as MouseEvent) } }>
                    <i class="iconfont">&#xe6d4;</i>
                </div>
                <input ref="input"  type="number" disabled={this.disabled} value={this.value} onInput={ (e) => { this.inputChange(e as InputEvent) } } class={ `ivsom-input-number__input  ${ this.disabled ? 'ivsom-inputNumber_disabled' : '' }` }/>
                <div class={ `ivsom-input-number__add ${this.valueMax?"limitMax":""} ${ this.disabled ? 'ivsom-inputNumber_disabled' : '' }` } disabled={this.disabled}  onClick={ (e) => { this.add(e as MouseEvent) } }>
                <i class="iconfont" >&#xe6d3;</i>
                </div>
            </div>
        )
    }

}