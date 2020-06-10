/**
 * Developer    :   SongQian
 * Time         :   2020-06-10
 * eMail        :   songqian@wtoe.cn
 * Description  :   switch组件
 */
import * as tsx from 'vue-tsx-support'
import { Component, Prop, Emit, Watch,} from 'vue-property-decorator'

interface Props{
    value:Boolean,
    width:Number,
    height:Number,
    disabled:Boolean,
    openColor:String;
    closeColor:String
}

@Component
export default class iVsomSwitch extends tsx.Component<Props>{
    constructor(){
        super()
    }
    @Prop ({default:true}) readonly value!:boolean;
    @Prop ({default:60}) readonly width!:number;
    @Prop ({default:30}) readonly height!:number;
    @Prop ({default:"#ff4949"}) readonly OpenColor!:string;
    @Prop ({default:"#e9ebef"}) readonly CloseColor!:string;
    @Prop ({default:false}) readonly disabled!:boolean;

    private  status:boolean=true;
    private  switchBg:string="#ff4949";
    private  closeBg:string="#e9ebef";
    private  left:number=1;

    @Watch("value")
    protected getValue(){
        this.status = this.value; //拿到父组件传给子组件的值
        this.changeStatus();
    }
    @Watch("status")
    protected getstatus(){
      this.$emit("input", this.status); //通过子组件改变父组件的v-model的值
      this.changeStatus();
    }
    @Watch("width")
    protected getWidth(){
        this.changeStatus();
    }
    @Watch("height")
    protected getHeight(){
        this.changeStatus();
    }
    @Watch("OpenColor")
    protected getopen(){
        if (this.OpenColor) {
            if (this.OpenColor.indexOf("#") == -1) {
              this.switchBg = "#ff4949";
            } else {
              this.switchBg = this.OpenColor;
            }
          }
    }
    @Watch("closecolor")
    protected getclose(){
        if (this.CloseColor) {
            if (this.CloseColor.indexOf("#") == -1) {
              this.closeBg = "#e9ebef";
            } else {
              this.closeBg = this.CloseColor;
            }
          }
    }


    protected changeStatus(){
        if (this.status) {
            this.left = 1;
          } else {
            this.left = this.width - (this.height - 1);
          }
    }
    protected  handleSwitch(e: MouseEvent){
        if (this.disabled) {
            return;
          }
          this.status ? (this.status = false) : (this.status = true);
          this.changeStatus();
          this.$emit("change", this.status); //传change事件，可以让父组件使用@change
    }

    protected created(){
        if (this.status != this.value) {
            this.status = this.value;
          }
          if (this.switchBg != this.OpenColor) {
            this.switchBg = this.OpenColor;
          }
          if (this.closeBg != this.CloseColor) {
            this.closeBg = this.CloseColor;
          }
    }
    protected render() : JSX.Element{
        return (
           <div class="switch">
               <div style={{'width':this.width+'px','height': this.height+'px','border-radius': (this.height/2)+'px','background':this.status?this.switchBg:this.closeBg}} class={{'switch-wrapper':true,'close':!this.status,'disabled':this.disabled}}   onClick={ (e) => { this.handleSwitch(e as MouseEvent) } }>
                   <div class="slider" style={{'width':(this.height-2)+'px','height':(this.height-2)+'px','left':this.left+'px'}}></div>
                </div>
            </div>
        )
    }
}
