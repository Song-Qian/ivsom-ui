/**
 * Developer    :   SongQian
 * Time         :   2020-06-15
 * eMail        :   songqian@wtoe.cn
 * Description  :   pagination组件
 */
import * as tsx from 'vue-tsx-support'
import { Component, Prop, Emit, Watch,} from 'vue-property-decorator'

interface Props{
    pageNumber:Number,//当前页
    pageSize:number[],//每页显示条数
    totalCount:Number,//总条数
    pageGroup:Number,//连续页码个数
   
}
interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget&InputEvent;
}

@Component
export default class iVsomPagination extends tsx.Component<Props,Event>{
    constructor(){
        super()
    }
    @Prop ({default:1}) readonly pageNumber!:number
    @Prop ({default:[10,20,30,50]}) readonly pagesize!:number[]
    @Prop ({}) readonly totalcount!:number
    @Prop ({default:5}) readonly pagegroup!:number
    
   
    private currentPage=this.pageNumber
    private currentSize:any=this.getCurrent
    private jumpPageNumber=1
    private showPrevMore=false
    private showNextMore=false

    @Watch("currentSize")
    currentSizeValue (newValue:any, oldValue:any) {
      if(newValue !== oldValue){
        if(this.currentPage >= this.totalPage){ //当前页面大于总页面数
          this.currentPage = this.totalPage
        }
        this.$emit('jumpPage', {currentPage: this.currentPage, currentSize: this.currentSize})
      }
    }

    protected created(){
     this.currentSize=this.pagesize[0]
     this.currentPage=this.pageNumber
    }
    get showPageHelper (){
      return this.totalcount > 0
    }

    get getCurrentPage(){
      return this.currentPage
    }

    get getCurrent(){
       return this.currentSize=this.pagesize[0]
    }

    get totalPage (){
      return Math.ceil(this.totalcount /Number(this.currentSize));

    }

    get groupList (){
      const groupArray = []
      const totalPage = this.totalPage   
      const pageGroup = this.pagegroup
      const _offset = (pageGroup - 1) / 2
      let current = this.currentPage
      const offset = {
        start: current - _offset,
        end: current + _offset
      }
      if (offset.start < 1) {
        offset.end = offset.end + (1 - offset.start)
        offset.start = 1
      }
      if (offset.end > totalPage) {
        offset.start = offset.start - (offset.end - totalPage)
        offset.end = totalPage
      }
      if (offset.start < 1) offset.start = 1
      this.showPrevMore = (offset.start > 1)
      this.showNextMore = (offset.end < totalPage)
      console.log(offset.end)
      for (let i = offset.start; i <= offset.end; i++) {
        groupArray.push(i)
      }
      return groupArray
    }

    protected prevPage (){
      if (this.currentPage > 1) {
        this.jumpPage(this.currentPage - 1)
      }
    }

    protected  nextPage () {
      var arr = document.getElementsByClassName("page-common")
     
      if (this.currentPage < this.totalPage) {
        if(this.currentPage>1){
          document.getElementsByClassName("page-item")[1].classList.remove("disabled")
        }
        console.log(arr[this.currentPage])
        if(arr[this.currentPage]!==undefined){
          arr[this.currentPage].classList.add("page-current");
          arr[this.currentPage-1].classList.remove("page-current");
          this.jumpPage(this.currentPage + 1)
        }
       
      } 
    }

    protected  showPrevPage() {
      this.currentPage = this.currentPage - this.pagegroup > 0 ? this.currentPage - this.pagegroup : 1
    }

    protected showNextPage() {
      this.currentPage = this.currentPage + this.pagegroup < this.totalPage ? this.currentPage + this.pagegroup : this.totalPage
      console.log(222)
    }
    
    protected goPage (jumpPageNumber:number) {
      console.log(jumpPageNumber)
      if(Number(jumpPageNumber) <= 0){
        jumpPageNumber = 1
      }if(Number(jumpPageNumber) >= this.totalPage){
        jumpPageNumber = this.totalPage
      }
      this.jumpPage(Number(jumpPageNumber))
    }
    
    protected jumpPage (pageNumber:number) {
      console.log(pageNumber,this.currentPage)
      var arr = document.getElementsByClassName("page-item");
      if (this.currentPage !== pageNumber) { 
        arr[pageNumber+1].classList.add("page-current");
        arr[this.currentPage+1].classList.remove("page-current");
         //点击的页码不是当前页码
        this.currentPage = pageNumber
      //父组件通过change方法来接受当前的页码
      Number(this.currentSize)==pageNumber
      if(this.currentPage>1){
        arr[1].classList.remove("disabled")
      }
     
      this.$emit('jumpPage', {currentPage: this.currentPage, currentSize: this.currentSize})
      }
    }
    
    protected input(e:HTMLInputEvent){
      this.jumpPageNumber=e.target.value as any
    }

    protected render() :JSX.Element{
        return(
            <div class="page-helper">
              {this.showPageHelper ? ( <div class="page-list">
              <span>共{this.totalPage }页 / { this.totalcount }条</span>
              <span class="page-item" onClick={e=>{this.jumpPage(1)}}>首页</span>
              <span class={`page-item ${this.currentPage === 1? 'disabled':""}`}   onClick={this.prevPage}>上一页</span>
              {this.showPrevMore ? ( <span class="page-ellipsis"  onClick={this.showPrevPage}>...</span>):(<span></span>)}
              {this.groupList.map((val,index)=>{
                  return(<span  class={`page-item page-common ${this.currentPage==val?'page-current':""}`} key={index} onClick={e=>{this.jumpPage(val)}}>{val}</span>)
              })}
              {this.showNextMore ? (<span class="page-ellipsis"  onClick={this.showNextPage}>...</span>):(<span></span>)}
              <span  class={`page-item page-common }`}>{this.totalcount/this.totalPage}</span>
              <span class={`page-item ${this.currentPage === this.totalPage?'disabled':"" }`}  onClick={this.nextPage}>下一页</span>
              <span class="page-item" onClick={e=>{this.jumpPage(this.totalPage)}}>末页</span>
              <select class="page-select" onChange={e=>{this.jumpPage(this.currentPage)}} value={this.currentSize}>
                {this.pagesize.map((val,index)=>{
                    return(<option  key={index} value={val}>{ val }条/页</option>)
                })}
              </select>
              <span class="ml20">跳至</span>
              <span class="page-jump-to"><input type="type" value={this.jumpPageNumber} onInput={e=>{this.input(e as HTMLInputEvent)}} /></span>
              <span>页</span>
              <span class="page-item jump-go-btn" onClick={e=>{this.goPage(this.jumpPageNumber)}}>GO</span>
              </div>):(<div></div>)}   
            </div >
        )
    }

}
