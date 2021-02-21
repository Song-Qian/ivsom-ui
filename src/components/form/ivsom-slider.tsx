/**
 * Developer    :   DongGuiLing
 * Time         :   2020-06-11
 * eMail        :   
 * Description  :   slider组件
 */

import * as tsx from 'vue-tsx-support'
import { Component, Prop, Watch, Ref } from 'vue-property-decorator'

import 'vue-tsx-support/enable-check'

interface Props {
	max: Number,
	min: Number,
	disabled: Boolean,
	range: Boolean
}
declare enum Position {
	left,
	right,
	now,
	isBtn,
	propoWidth
}

@Component
export default class iVsomSlider extends tsx.Component<Props>{
	constructor() {
		super()
	}
	@Prop({ default: 100 }) readonly max!: number;
	@Prop({ default: 0 }) readonly min!: number;
	@Prop({ default: false }) readonly disabled!: boolean;
	@Prop({ default: false }) readonly range!: boolean;

	@Ref('mySlider') protected readonly mySlider !: HTMLElement;
	@Ref('propo') protected readonly propo !: HTMLElement;
	@Ref('rightBtn') protected readonly rightBtn !: HTMLElement;
	@Ref('leftBtn') protected readonly leftBtn !: HTMLElement;
	@Ref('propoBg') protected readonly propoBg !: HTMLElement;
	@Ref('propoRange') protected readonly propoRange !: HTMLElement;

	@Watch("min")
	protected getMin() {
		this.myDefault()
	}

	@Watch("max")
	protected getMax() {
		this.myDefault()
	}

	private myPosition = {
		left: 0,
		right: 0,
		now: 0,
		isBtn: 0,
		propoWidth: 0
	}
	private myDefault: any = null

	protected btnFun(index: any) {
		this.myPosition.isBtn = index
	}
	protected mounted() {
		//滑块
		let that = this
		var mySlider: any = null
		let myWidth = 0
		this.$nextTick(() => {
			mySlider = this.$refs.mySlider
			let propo = this.$refs.propo as HTMLElement
			let rightBtn = this.$refs.rightBtn as HTMLElement
			let leftBtn = this.$refs.leftBtn as HTMLElement
			let propoBg = this.$refs.propoBg as HTMLElement
			let propoRange = this.$refs.propoRange as HTMLElement
			var hasMove=false
			const elementLeft = (e: any) => { //计算x坐标
				var offset = e.offsetLeft;
				if (e.offsetParent != null) offset += elementLeft(e.offsetParent);
				return offset;
			}
			const myCount = () => { //计算滑动
				if (this.myPosition.right > this.myPosition.left) { //判断滑动范围
					this.myPosition.propoWidth = this.myPosition.right - this.myPosition.left;
					propo.style.width = this.myPosition.propoWidth + '%';
					propo.style.left = this.myPosition.left + '%';
					
					if(!this.range){
						propoBg.style.width=(this.max-this.myPosition.propoWidth) + '%';
					}else{
						propoRange.style.width=this.myPosition.right - this.myPosition.left+ '%';
						propoRange.style.left = this.myPosition.left + '%';
					}
					this.$emit("valueFun", Number(this.myPosition.left), Number(this.myPosition.right), Number(this.myPosition.propoWidth))
				} else if (this.myPosition.right < this.myPosition.left) {
					this.myPosition.propoWidth = this.myPosition.left - this.myPosition.right
					propo.style.width = this.myPosition.propoWidth + '%'
					propo.style.left = this.myPosition.right + '%'
					propoBg.style.width=(this.max-this.myPosition.propoWidth) + '%';
					this.$emit("valueFun", Number(this.myPosition.right), Number(this.myPosition.left), Number(this.myPosition.propoWidth))
				} else if (this.myPosition.right == this.myPosition.left) {//按钮位置滑到最大值或者最小值
					this.myPosition.propoWidth = this.myPosition.left - this.myPosition.right
					propo.style.width = this.myPosition.propoWidth + '%'
					propo.style.left = this.myPosition.right + '%'
					propoBg.style.width=this.max+ '%';
					this.$emit("valueFun", Number(this.myPosition.right), Number(this.myPosition.left), Number(this.myPosition.propoWidth))
				}

			}

			this.myDefault = () => {//初始化
				this.myPosition.right = this.max
				this.myPosition.left = this.min
				this.myPosition.isBtn = 0

				if (this.max > this.min) {
					this.myPosition.propoWidth = this.max - this.min					
					propo.style.left = this.myPosition.left + '%'
				} else {
					this.myPosition.propoWidth = this.min - this.max
					propo.style.left = this.myPosition.right + '%'
				}

				propo.style.width = this.max + '%'
				if(!this.range){
					propoBg.style.width=this.min + '%'
				}
				if(this.range){
					propoRange.style.width=(this.max-this.min) + '%'
					propoRange.style.left=this.myPosition.left + '%'
				}
				if (this.range) { leftBtn.style.left = this.myPosition.right + '%' }
				rightBtn.style.left = this.myPosition.left + '%'
				this.$emit("valueFun", this.myPosition.left, this.myPosition.right, this.myPosition.propoWidth)
			}
			let mySliderX = elementLeft(mySlider) //滑动块x坐标

			if (!this.disabled) {
				if (this.range) {
					leftBtn.addEventListener('mousedown', (e: MouseEvent) => {
						document.onmousemove= e =>{ //屏幕滑动事件
							console.log(111)
							if(hasMove){
								let pageX = e.pageX - mySliderX //获取滑动x坐标
								myWidth = (pageX / mySlider.offsetWidth) * 100 //计算百分比
								if (myWidth > 100) { //判断不超出范围
									myWidth = 100
								} else if (myWidth < 0) {
									myWidth = 0
								}
								if (this.myPosition.isBtn == 1 && myWidth < 50) {//判断焦点
									this.myPosition.left = myWidth
									rightBtn.style.left = myWidth + '%'
								} else if (this.myPosition.isBtn == 2 && myWidth > 50) {
									this.myPosition.right = myWidth
									leftBtn.style.left = myWidth + '%'
								}
							
								myCount()
								e.preventDefault()
							}	
						}
						document.onmouseup = e => {
							//鼠标弹起来的时候不再移动
							document.onmousemove = null;
						   //预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动）  
						  document.onmouseup = null;
					  };
					})
					
				}
				rightBtn.addEventListener('mousedown', (e: MouseEvent) => {
					document.onmousemove= e =>{ //屏幕滑动事件
						console.log(222)
						let pageX = e.pageX - mySliderX //获取滑动x坐标
						myWidth = (pageX / mySlider.offsetWidth) * 100 //计算百分比
						if (this.range) {
							if (myWidth > 100) { //判断不超出范围
								myWidth = 100
							} else if (myWidth < 0) {
								myWidth = 0
							}
							if (this.myPosition.isBtn == 1 && myWidth < 50) {//判断焦点
								this.myPosition.left = myWidth
								rightBtn.style.left = myWidth + '%'
							} else if (this.myPosition.isBtn == 2 && myWidth > 50) {
								this.myPosition.right = myWidth
								leftBtn.style.left = myWidth + '%'
							}
						} else {
							if (myWidth > 100) { //判断不超出范围
								myWidth = 100
							} else if (myWidth < 0) {
								myWidth = 0
							}
							this.myPosition.left = myWidth
							rightBtn.style.left = myWidth + '%'
						}
					
						myCount()
			        	e.preventDefault()	
					
				}
				document.onmouseup = e => {
					//鼠标弹起来的时候不再移动
					document.onmousemove = null;
				   //预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动）  
				  document.onmouseup = null;
			  };
				})
				
		
				mySlider.addEventListener('mousedown', (e: MouseEvent) => {//点击事件
					let touchX = e.pageX - mySliderX
					myWidth = (touchX / mySlider.offsetWidth) * 100 //计算百分比
					hasMove=false;
					if(this.range){
						if (myWidth > 100) { //判断不超出范围
							myWidth = 100
						} else if (myWidth < 0) {
							myWidth = 0
						} else if (myWidth < 50) {
							this.myPosition.left = myWidth
							rightBtn.style.left = myWidth + '%'
						} else if (myWidth > 50) {
							this.myPosition.right = myWidth
							leftBtn.style.left = myWidth + '%'
						} else if (myWidth = 50) {
							leftBtn.style.left = rightBtn.style.left
						}
					}else{
						if (myWidth > 100) { //判断不超出范围
							myWidth = 100
						} else if (myWidth < 0) {
							myWidth = 0
						}
						this.myPosition.left = myWidth
						rightBtn.style.left = myWidth + '%'
					}
					this.myPosition.now = (touchX / mySlider.offsetWidth) * 100
					mySliderX = elementLeft(mySlider) //滑动块x坐标
					myCount()
					e.preventDefault()
				})
				mySlider.addEventListener('mouseup', (e: MouseEvent) => {//点击事件
					mySliderX = elementLeft(mySlider) //滑动块x坐标
					e.preventDefault()
					false
				})
			}
			this.myDefault()
		})



	}

	protected render(): JSX.Element {
		return (
			<div class={`slider ${this.disabled ? 'ivsom-slider_disabled' : ''} `} ref="mySlider">
				{this.range ? (<div class="left-btn" ref="leftBtn" onMousedown={(e) => { this.btnFun(2) }}>
					<span >{parseInt(this.myPosition.right + '%')}</span>
				</div>) : null}
				<div class="propo" ref="propo"></div>
				{this.range ?(<div class="propo-range" ref="propoRange"></div>):(<div class="propo-bg" ref="propoBg"></div>)}	
				{/* <div class="propo-bg" ref="propoBg"></div> */}
				<div class="right-btn" ref="rightBtn" onMousedown={(e) => { this.btnFun(1) }} >
					<span >{parseInt(this.myPosition.left + '%')}</span>
				</div>
			</div>
		)
	}
}