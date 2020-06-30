/**
 * Developer    :   SongQian
 * Time         :   2020-06-15
 * eMail        :   songqian@wtoe.cn
 * Description  :   pagination组件
 */
import * as tsx from 'vue-tsx-support'
import { Component, Prop, Emit, Watch,} from 'vue-property-decorator'

interface  Props{
    Steps:number,
    StepData:string[]
}

@Component
export default class iVsomStep extends tsx.Component<Props>{
    constructor(){
        super()
    }
    @Prop({default:0}) readonly Steps!: number
    @Prop({}) readonly stepdata!:string[]

    protected render():JSX.Element{
        return(
            <div>
                <ul class="steps">
                    {this.stepdata.map((item,index)=>{
                        return(<li
                            key={item+index}
                            class={{'active':this.Steps===index,"stepIcon":this.Steps>index}}
                          >{item}</li>)
                    })}
               </ul>
            </div>
        )
    }
}