/**
 * Developer    :   DongGuiLing
 * Time         :   2020-05-28
 * eMail        :   
 * Description  :   radio组件
 */
import * as tsx from 'vue-tsx-support'
import { Component, Prop, Emit, Watch,} from 'vue-property-decorator'


import 'vue-tsx-support/enable-check'

 interface Props{
    Type : 'radiu' | 'rect'| 'default' ,
    Icon:String,
    Number:Boolean,
    colorBg:String,
    Lable:String
 }

@Component
export default class iVsomList extends tsx.Component<Props>{
    constructor() {
        super()
    }
@Prop({ default : '', type: String }) readonly icon !: string;
@Prop({ default : '', type: String }) readonly colorbg !: string;
@Prop({ default : '', type: String }) readonly lable !: string;
@Prop({ default : 'default' }) readonly type !: 'radiu' | 'rect'| 'default' ;
@Prop({ default : false }) readonly number !: Boolean ;

protected get cssName() {
    var css = {
        'radiu' : 'ivsom-list-radiu',
        'rect' : 'ivsom-list-rect',
    }
    return this.type !== 'default' ? css[this.type] : ''; 
}
    

    protected render():JSX.Element{
        return(
            <div class="ivsom-list">
               {this.number?(
                 <ol>
                     <li class={ `list ${this.cssName} ${this.colorbg?"lableColor":""}` } style={{'background':this.colorbg}}>
                     { this.icon ? <i class={ `iconfont ${this.icon} ${this.colorbg?"lableColor":""}` }></i> : <i>{this.lable}</i> }
                     </li>
                 </ol>
               ):(
                   <ul>
                       <li class={ `list ${this.cssName} ${this.colorbg?"lableColor":""}` } style={{'background':this.colorbg}}>
                     { this.icon ? <i class={ `iconfont ${this.icon} ${this.colorbg?"lableColor":""}` } ></i> : '' }{this.lable}
                     </li>
                   </ul>
               )} 
            </div>
        )
    }

}