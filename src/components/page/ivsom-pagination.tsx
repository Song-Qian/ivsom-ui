/**
 * Developer    :   DongGuiLing
 * Time         :   2020-06-15
 * eMail        :   
 * Description  :   pagination组件
 */
import * as tsx from 'vue-tsx-support'
import { Component, Prop } from 'vue-property-decorator'

import 'vue-tsx-support/enable-check'

interface Props {
  currentPage: Number,//当前
  totalCount: Number,//总条数
  limit:Number//每页显示条数

}
interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget & InputEvent;
}

@Component
export default class iVsomPagination extends tsx.Component<Props, Event>{
  constructor() {
    super()
  }

  @Prop({ default: 1 }) currentPage!: number
  @Prop({ default: 1 }) limit!: number
  @Prop({}) readonly totalCount!: number
  @Prop({default:false}) readonly showTotal!: boolean
  @Prop({default:false}) readonly showSize!: boolean
  @Prop({default:false}) readonly showElevator!: boolean



  private  limitNums=[5,10,15,20,25,30]
  protected limitNum=this.limit
  private jumpPageNumber=1
 
  get totalPage(){
    return Math.ceil(this.totalCount / this.limit)
  }

  get indexs() {
    console.log(this.totalCount, this.limit)
    console.log(this.totalPage)
    var left = 1
    var right = this.totalPage
    var ar = []
    if (this.totalPage >= 11) {
      if (this.currentPage > 5 && this.currentPage < this.totalPage - 4) {
        left = this.currentPage - 5
        right = this.currentPage + 4
      } else {
        if (this.currentPage <= 5) {
          left = 1
          right = 10
        } else {
          right = this.totalPage
          left = this.totalPage - 9
        }
      }
    }
    while (left <= right) {
      ar.push(left)
      left++
    }
    if (ar[0] > 1) {
      ar[0] = 1;
      ar[1] = -1;
     
    }
    if (ar[ar.length - 1] < this.totalPage) {
      ar[ar.length - 1] = this.totalPage;
      ar[ar.length - 2] = 0;
    }
    return ar
  }

  protected btnClick(data: any) {
    if (data < 1) return;
      if (data != this.currentPage) {
        this.currentPage = data
      }if(this.limitNum!==this.limit&&this.limitNum!==null){//每页显示条数改变
        let pages=Math.ceil(this.totalCount / this.limitNum);
        if(data>pages){
          data=pages;
        }
        this.$emit('update:limit', this.limitNum);
      }
      this.$emit('update:currentPage', data);
      this.$emit('change-handle', data)
    
  }


  protected nextPage(data: number) {
    console.log(this.totalPage)
    console.log(this.totalCount, this.limit)
    if (this.currentPage >= this.totalPage) return;
    this.btnClick(this.currentPage + 1);
  }

  protected prvePage(data: number) {
    if (this.currentPage <= 1) return;
    this.btnClick(this.currentPage - 1);
  }

  protected setButtonClass(isNext: any) {
    if (isNext) {
      return this.currentPage >= this.totalPage ? "page-button-disabled" : ""
    }
    else {
      return this.currentPage <= 1 ? "page-button-disabled" : ""
    }
  }

  protected input(e:HTMLInputEvent){
    this.jumpPageNumber=e.target.value as any
    this.limitNum=e.target.value as any
  }

  protected  initLimitNums() {
    this.limitNum=this.limit;
    if (!this.limitNums.includes(this.limit)) {
      this.limitNums.push(this.limit);
      this.limitNums.sort(function (a, b) {
        return a-b;
      });
    }
  }

  protected created(){
    this.initLimitNums();
  }

  protected goPage (jumpPageNumber:number) {
    if(Number(jumpPageNumber) <= 0){
      jumpPageNumber = 1
    }if(Number(jumpPageNumber) >= this.totalPage){
      jumpPageNumber = this.totalPage
    }
    this.btnClick(Number(jumpPageNumber))
  }

  protected render(): JSX.Element {
    return (
      <div class="page-bar">
        <ul>
          {this.showTotal?( <li><a style="border:none">共{this.totalCount}条记录  第{this.currentPage}/{this.totalPage}页</a></li>):null}
          <li><a class={this.setButtonClass(0)} onClick={e => { this.prvePage(this.currentPage) }}>上一页</a></li>
          {this.indexs.map((val, index) => {
            // console.log(this.indexs)
            return (<li class={{ "active": this.currentPage === val }} key={index}>
              <a onClick={e => { this.btnClick(val) }}>{val < 1 ? "..." : val}</a>
            </li>
            )
          })}
          <li><a class={this.setButtonClass(1)} onClick={e => { this.nextPage(this.currentPage) }}>下一页</a></li>
          {this.showSize?( <li style="position: relative;width: 74px;">
          <select  value={this.limitNum} onInput={e=>{this.input(e as any)}} onChange={e=>{this.btnClick(this.currentPage)}}>
            {this.limitNums.map((val,index)=>{
              return( <option value={val}>{val}条/页</option>)  
            })}
          </select>
          </li>):null}
          {this.showElevator?(<li><a style="border:none">跳至</a></li> ):null}
          {this.showElevator?(<li><a style="border:none"><input type="number" style="width:60px;height:20px" value={this.jumpPageNumber} onInput={e=>{this.input(e as any)}} /></a></li>):null}
          {this.showElevator?(<li><a style="border:none">页</a></li>):null}
          {this.showElevator?(<li><a class="page-item jump-go-btn" onClick={e=>{this.goPage(this.jumpPageNumber)}}>GO</a></li>):null}        
        </ul>
      </div>

    )
  }

}
