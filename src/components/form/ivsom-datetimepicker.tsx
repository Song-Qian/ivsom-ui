/**
 * Developer    :   SongQian
 * Time         :   2020-04-21
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   button组件
 */

import { Component, Emit, InjectReactive, ModelSync, Prop, Watch } from 'vue-property-decorator'
import * as tsx from 'vue-tsx-support'
import { formatDateTime, isLeapYear, setDateTime, add } from '../../utils/date'

import 'vue-tsx-support/enable-check'

type Props = {
    //描述提示信息
    Placeholder: String
    //头部 icon
    Prefix: String
    //尾部 icon
    Suffix: String
    //width
    Width: String | Number
    //表单大小
    Size: 'medium' | 'small' | 'mini'
    //范围日历(双日历)
    Range: Boolean
    //展开方式
    Method: 'hover' | 'focus'
    //是否禁用时间选择器
    HiddenTimePicker: Boolean
    //v-model 值的格式化
    ValueFormatter: String
    //输入框显示的格式化
    LabelFormatter: String
    //是否24小时制
    IsTwentyFour : boolean
    //组件的值
    Value : String | Array<String>
}

type ScopedSlots = {
    prefix: String
    suffix: String
}

@Component
export default class iVsomDateTimePicker extends tsx.Component<Props, any, ScopedSlots> {
    
    @Prop({ default: 220 }) readonly width !: string | number;
    @Prop({ default: 'icon-gongnengtubiao-130' }) readonly prefix !: string;
    @Prop({ default: '' }) readonly suffix !: string;
    @Prop({ default: 'medium' }) readonly size !: 'medium' | 'small' | 'mini';
    @Prop({ default: false, type: Boolean }) readonly range !: boolean;
    @Prop({ default: 'hover', type: String }) readonly method !: string;
    @Prop({ default: 'yyyy/MM/dd', type: String }) readonly valueFormatter !: string;
    @Prop({ default: 'yyyy/MM/dd', type: String }) readonly labelFormat !: string;
    @Prop({ default: true, type: Boolean }) readonly isTwentyFour !: boolean;
    @Prop({ default: false, type: Boolean }) readonly hiddenTimePicker !: boolean;
    @ModelSync("value", "on-update", { default: '' }) valueSync !: string | Array<string>;

    @InjectReactive({ from: Symbol.for('validate'), default: true }) validate !: boolean;
    @InjectReactive({ from: Symbol.for('trigger'), default: 'blur' }) trigger !: 'blur' | 'change';

    private current : Date = setDateTime(new Date(), 0, 'h');
    private next : Date = setDateTime(new Date(), new Date().getMonth() + 1, 'M');
    private currentDateOperating = 'day';
    private nextDateOperating = 'day';

    @Watch('current', { deep: true, immediate: false })
    protected handlerDateTimeRangeChange() {
        const me = this;
        if (me.current.getTime() >= me.next.getTime()) {
            me.next = setDateTime(me.current, me.current.getMonth() + 1, 'M');
        }
    }

    @Watch('next', { deep: true, immediate: false })
    protected handlerNextDateTimeRangeChange() {
        const me = this;
        if (me.next.getTime() <= me.current.getTime()) {
            me.current = setDateTime(me.next, me.next.getMonth() - 1, 'M');
        }
    }

    protected isStart(date: Date, unit: string): boolean {
        const me = this;
        let value = me.range ? me.valueSync[0] : me.valueSync as string;
        return !!value && setDateTime(new Date(value), 0, unit).getTime() === setDateTime(date, 0, unit).getTime();
    }

    protected isEnd(date: Date, unit : string): boolean {
        const me = this;
        let value = me.range ? me.valueSync[1] : me.valueSync as string;
        return setDateTime(new Date(value), 0, unit).getTime() === setDateTime(date, 0, unit).getTime();
    }

    protected isDateTimeInRange(date: Date) : boolean {
        let me = this;
        let valuePrev = me.range ? me.valueSync[0] : me.valueSync as string;
        let valueNext = me.range ? me.valueSync[1] : me.valueSync as string;
        return !!valuePrev && new Date(valuePrev).getTime() <= date.getTime() && !!valueNext && new Date(valueNext).getTime() >= date.getTime();
    }

    protected prevMonth(date: Date) : Array<JSX.Element> | null {
        let me = this;
        let prev = setDateTime(date, date.getMonth() - 1, "M");
        let day = me.dayList(prev);
        let week = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        return week === 0 ? null : new Array(week).fill(0).map(function(it, k) { return <div class="ivsom-datetimepicker__cell is-prev-month">{ day - k }</div> }).reverse();
    }

    protected nextMonth(date: Date) : Array<JSX.Element> | null {
        let me = this;
        let week = new Date(date.getFullYear(), date.getMonth(), me.dayList(date)).getDay();
        return week === 6 ? null : new Array(6 - week).fill(0).map(function(it, k) { return <div class="ivsom-datetimepicker__cell is-next-month">{ k + 1 }</div> });
    }

    protected dayList(date: Date) : number {
        const month = [31, (isLeapYear(date) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        return month[date.getMonth()];
    }

    protected modifyMonth(month: number, type: string) {
        const me = this;
        if (type === 'prev') {
            me.current = setDateTime(me.current, month, 'M');
            me.currentDateOperating = 'day';
        }

        if (type === 'next') {
            me.next = setDateTime(me.next, month, 'M');
            me.nextDateOperating = 'day';
        }
    }

    protected modifyYear(year: number, type: string) {
        const me = this;
        if (type === 'prev') {
            me.current = setDateTime(me.current, year, 'y');
            me.currentDateOperating = 'day';
        }

        if (type === 'next') {
            me.next = setDateTime(me.next, year, 'y');
            me.nextDateOperating = 'day';
        }
    }

    protected modifyHours(event : WheelEvent, type: string) {
        const me = this;
        let eventDelta = event.detail || -event.deltaY + 40;
        let value =  eventDelta / 120 > 0 ? 1 : -1;
        if (type === 'prev') {
            let hours = Math.min(Math.max(0,  me.current.getHours() + value), 23);
            if (me.range) {
                let now = me.valueSync[0] ? new Date(me.valueSync[0]) : new Date(new Date().toLocaleDateString());
                me.current = setDateTime(me.current, hours, 'h');
                me.valueSync = [formatDateTime(now, me.valueFormatter, me.isTwentyFour), me.valueSync[1]];
                return;
            }
            let now =  me.valueSync ? new Date(me.valueSync as string) : new Date(new Date().toLocaleDateString());
            me.current = setDateTime(now, hours, 'h');
            me.valueSync = formatDateTime(now, me.valueFormatter, me.isTwentyFour);
        } else if (type === 'next') {
            let hours = Math.min(Math.max(0,  me.next.getHours() + value), 23);
            if (me.range) {
                let now = me.valueSync[1] ? new Date(me.valueSync[1]) : new Date(new Date().toLocaleDateString());
                me.next = setDateTime(me.next, hours, 'h');
                me.valueSync = [me.valueSync[0], formatDateTime(now, me.valueFormatter, me.isTwentyFour)];
                return;
            }
            let now = me.valueSync ? new Date(me.valueSync as string) : new Date(new Date().toLocaleDateString());
            me.next = setDateTime(me.next, hours, 'h')
            me.valueSync = formatDateTime(now, me.valueFormatter, me.isTwentyFour);
        }
    }

    protected modifyMinute(event : WheelEvent, type: string) {
        const me = this;
        let eventDelta = event.detail || -event.deltaY + 40;
        let value =  eventDelta / 120 > 0 ? 1 : -1;
        if (type === 'prev') {
            let minutes = Math.min(Math.max(0,  me.current.getMinutes() + value), 59);
            me.current = setDateTime(me.current, minutes, 'm')
        } else if (type === "next") {
            let minutes = Math.min(Math.max(0,  me.next.getMinutes() + value), 59);
            me.next = setDateTime(me.next, minutes, 'm');
        }
    }

    protected modifySecond(event : WheelEvent, type: string) {
        const me = this;
        let eventDelta = event.detail || -event.deltaY + 40;
        let value =  eventDelta / 120 > 0 ? 1 : -1;
        if (type === "prev") {
            let seconds = Math.min(Math.max(0,  me.current.getSeconds() + value), 59);
            me.current = setDateTime(me.current, seconds, 's');
        } else if (type === "next") {
            let seconds = Math.min(Math.max(0,  me.next.getSeconds() + value), 59);
            me.next = setDateTime(me.next, seconds, 's');
        }
    }

    protected modifyDateSwitch(event: MouseEvent, target: string, handler: string) {
        const me = this;
        if(target === 'prev') {
            let unit = me.currentDateOperating === 'year' ? 'y' : 'M';
            let diff = me.currentDateOperating === 'year' ? 24 : 1;
            let value = unit === 'y' ? me.current.getFullYear() : me.current.getMonth();
            me.current = handler === 'subtract' ? setDateTime(me.current, value + (-diff), unit) : setDateTime(me.current, value + diff, unit);
        }

        if(target === 'next') {
            let unit = me.nextDateOperating === 'year' ? 'y' : 'M';
            let count = me.nextDateOperating === 'year' ? 24 : 1;
            let value = unit === 'y' ? me.next.getFullYear() : me.next.getMonth();
            me.next = handler === 'subtract' ? setDateTime(me.next, value  + ( -count), unit) : setDateTime(me.next, value + count, unit);
        }
    }

    protected onChange(event: MouseEvent, value: Date): void {
        const me = this;
        if (me.range) {
            var min = Math.min(new Date(me.valueSync[0]).getTime(), value.getTime());
            var max = Math.max(new Date(me.valueSync[0]).getTime(), value.getTime());
            me.valueSync = me.valueSync.length === 2 ? [formatDateTime(value, me.valueFormatter, me.isTwentyFour)] : [
                formatDateTime(new Date(min), me.valueFormatter, me.isTwentyFour), 
                formatDateTime(new Date(max), me.valueFormatter, me.isTwentyFour)
            ];
            return;
        }

        me.valueSync = formatDateTime(value, me.valueFormatter, me.isTwentyFour);
    }

    protected mounted() {
        const me  = this;
        const today = setDateTime(new Date(), 0, 'h');
        me.valueSync = me.range ? [formatDateTime(today, me.valueFormatter, me.isTwentyFour), formatDateTime(add(today, 23.99999972222222, 'h'), me.valueFormatter, me.isTwentyFour)] : formatDateTime(today, me.valueFormatter, me.isTwentyFour);
    }

    protected render() : JSX.Element {
        const me = this;
        let startTime = me.range && me.valueSync[0] ? formatDateTime(new Date(me.valueSync[0]), me.labelFormat, me.isTwentyFour) : "";
        let endTime = me.range && me.valueSync[1] ? formatDateTime(new Date(me.valueSync[1]), me.labelFormat, me.isTwentyFour) : "";
        let time = !me.range && me.valueSync ? formatDateTime(new Date(me.valueSync as string), me.labelFormat, me.isTwentyFour) : "";
        const prefixEl = (me.$scopedSlots.prefix ? <div class='ivsom-datetimepicker__prefix'>{me.$scopedSlots.prefix && me.$scopedSlots.prefix(me.prefix)}</div> :
            me.prefix ? <div class='ivsom-datetimepicker__prefix'><i class={['iconfont', me.prefix]}></i></div> : null)
        const suffixEl = (me.$scopedSlots.suffix ? <div class='ivsom-datetimepicker__suffix'>{me.$scopedSlots.suffix && me.$scopedSlots.suffix(me.suffix)}</div> :
            me.suffix ? <div class='ivsom-datetimepicker__suffix'><i class={['iconfont', me.suffix]}></i></div> : null)
        const ctx = me.range ? 
            (<div class="ivsom-datetimepicker__ctx">
                <input class='ivsom-datetimepicker__start' value={ startTime } />
                <div class='ivsom-datetimepicker__separator'>至</div>
                <input class='ivsom-datetimepicker__end' value={ endTime } />
            </div> ) :  ( <div class="ivsom-datetimepicker__ctx">
                <input class='ivsom-datetimepicker__timer' value={ time } />
            </div>);
        
        const w = typeof me.width === 'number' ? `${me.width}px` : me.width;
        const c_p_day = me.dayList(setDateTime(me.current, me.current.getMonth() - 1, "M"));
        const c_week = new Date(me.current.getFullYear(), me.current.getMonth(), 1).getDay();
        const c_day = me.dayList(me.current);
        const p_p_day = me.dayList(setDateTime(me.next, me.next.getMonth() - 1, "M"));
        const p_week = new Date(me.next.getFullYear(), me.next.getMonth(), 1).getDay();
        const p_day = me.dayList(me.next);

        return (
            <div class={{ 'ivsom-datetimepicker' : true, ['ivsom-datetimepicker__' + me.size]: true, 'ivsom-datetimepicker__hover' : me.method === 'hover', 'ivsom-datetimepicker__focus' : me.method === 'focus' }} style={{ width: w }} tabindex={999}>
                <div class="ivsom-datetimepicker__warpper">
                    {prefixEl}
                    { ctx }
                    {suffixEl}
                </div>
                <div class="ivsom-datetimepicker__dropdown">
                    <div class="ivsom-datetimepicker__dropdown_wrapper">
                        <div class="ivsom-datetimepicker__container">
                            <div class="ivsom-datetimepicker__header">
                                <i class="iconfont icon-gongnengtubiao-28" onClick={ tsx.modifiers.stop((e : MouseEvent) => me.modifyDateSwitch(e, 'prev', 'subtract')) } />
                                <div>
                                    <span onClick={ () => me.currentDateOperating = 'year' }>{ me.current.getFullYear() }年</span>
                                    <span onClick={ () => me.currentDateOperating = 'month' }>{ (me.current.getMonth() + 1) }月</span>
                                </div>
                                <i class="iconfont icon-gongnengtubiao-29" onClick={ tsx.modifiers.stop((e : MouseEvent) => me.modifyDateSwitch(e, 'prev', 'add')) } />
                            </div>
                            <div class="ivsom-datetimepicker__body">
                                <div class={{ 'ivsom-datetimepicker__dayrange': true, 'ivsom-datetimepicker__isDay' : me.currentDateOperating === 'day'  }}>
                                    <div class="ivsom-datetimepicker__header">周未</div>
                                    <div class="ivsom-datetimepicker__header">周一</div>
                                    <div class="ivsom-datetimepicker__header">周二</div>
                                    <div class="ivsom-datetimepicker__header">周三</div>
                                    <div class="ivsom-datetimepicker__header">周四</div>
                                    <div class="ivsom-datetimepicker__header">周五</div>
                                    <div class="ivsom-datetimepicker__header">周六</div>
                                    {
                                        new Array(42).fill(0).map((_, k) => {
                                            if (k < c_week) {
                                                return <div class="ivsom-datetimepicker__cell is-prev-month">{ c_p_day - c_week + k + 1 }</div>
                                            }

                                            if (k - c_week < c_day) {
                                                return <div 
                                                    class={
                                                        { 
                                                            "ivsom-datetimepicker__cell" : true, 
                                                            "ivsom-datetimepicker__inRange" : me.isDateTimeInRange(setDateTime(me.current, k - c_week + 1, "d")) && me.range, 
                                                            "ivsom-datetimepicker__isStart" : me.isStart(setDateTime(me.current, k - c_week + 1, 'd'), 'h'),
                                                            "ivsom-datetimepicker__isEnd" : me.isEnd(setDateTime(me.current, k - c_week + 1, 'd'), 'h')
                                                        }
                                                    } 
                                                    onClick={ tsx.modifiers.stop((event : MouseEvent) => me.onChange(event, setDateTime(me.current, k - c_week + 1, 'd'))) }
                                                >
                                                    <span>{ k - c_week + 1 }</span>
                                                </div>
                                            }

                                            return <div class="ivsom-datetimepicker__cell is-next-month">{ k - (c_day + c_week) + 1 }</div>

                                        })
                                    }
                                </div>
                                <div class={{ 'ivsom-datetimepicker__month': true, 'ivsom-datetimepicker__isMonth' : me.currentDateOperating === 'month'  }}>
                                    { new Array(12).fill(0).map((it, i) => <div class="ivsom-datetimepicker__cell" onClick={ tsx.modifiers.stop(() => me.modifyMonth(i, 'prev')) }  >{i + 1} 月</div> ) }
                                </div>
                                <div class={{ 'ivsom-datetimepicker__year': true, 'ivsom-datetimepicker__isYear' : me.currentDateOperating === 'year' }}>
                                    { new Array(24).fill(0).map((it, i) => <div class="ivsom-datetimepicker__cell" onClick={ tsx.modifiers.stop(() => me.modifyYear(me.current.getFullYear() + i, 'prev'))} >{ me.current.getFullYear() + i } 年</div>)  }
                                </div>
                            </div>
                            <div class="ivsom-datetimepicker__footer">
                                {
                                    !me.hiddenTimePicker ? (
                                        <div class="ivsom-datetimepicker__timer">
                                            {
                                                !me.isTwentyFour ? <div class="ivsom-datetimepicker__meridiem">{ Math.ceil(me.current.getHours() / 12) <= 1 ? 'a.m.' : 'p.m.' }</div> : null
                                            }
                                            <ul class="ivsom-datetimepicker__hour" onWheel={ tsx.modifiers.stop.prevent((e: WheelEvent) => me.modifyHours(e, 'prev')) }>
                                                { 
                                                    new Array(24).fill(0).map((_, i) => {
                                                        var hour = me.isTwentyFour ? i : (i % 12 === 0 && i !== 0 ? 12 : i % 12)
                                                        return <li class={{ 'ivsom-datetimepicker__isHour' : me.current.getHours() === i }} key={i}>{ ((new Array(2).join('0')) + hour).slice(-2) }</li>
                                                    }) 
                                                }
                                            </ul>
                                            <ul class="ivsom-datetimepicker__minute" onWheel={ tsx.modifiers.stop.prevent((e: WheelEvent) => me.modifyMinute(e, 'prev')) }>{ new Array(60).fill(0).map((_, i) => <li class={{ 'ivsom-datetimepicker__isMinute' : me.current.getMinutes() === i }} key={i} >{ ((new Array(2).join('0')) + i).slice(-2) }</li>) }</ul>
                                            <ul class="ivsom-datetimepicker__second" onWheel={ tsx.modifiers.stop.prevent((e: WheelEvent) => me.modifySecond(e, 'prev')) }>{ new Array(60).fill(0).map((_, i) => <li class={{ 'ivsom-datetimepicker__isSecond' : me.current.getSeconds() === i }} key={i} >{ ((new Array(2).join('0')) + i).slice(-2) }</li>) }</ul>
                                        </div>
                                    ) : null
                                }
                            </div>
                        </div>
                        {
                            me.range ? (
                                <div class="ivsom-datetimepicker__container" style='border-left: 1px solid #ddd;'>
                                    <div class="ivsom-datetimepicker__header">
                                        <i class="iconfont icon-gongnengtubiao-28" onClick={ tsx.modifiers.stop((e : MouseEvent) => me.modifyDateSwitch(e, 'next', 'subtract')) } />
                                        <div>
                                            <span  onClick={ () => me.nextDateOperating = 'year' }>{ me.next.getFullYear() }年</span>
                                            <span  onClick={ () => me.nextDateOperating = 'month' }>{ (me.next.getMonth() + 1) }月</span>
                                        </div>
                                        <i class="iconfont icon-gongnengtubiao-29" onClick={ tsx.modifiers.stop((e : MouseEvent) => me.modifyDateSwitch(e, 'next', 'add')) } />
                                    </div>
                                    <div class="ivsom-datetimepicker__body">
                                        <div class={{ 'ivsom-datetimepicker__dayrange': true, 'ivsom-datetimepicker__isDay' : me.nextDateOperating === 'day'  }}>
                                            <div class="ivsom-datetimepicker__header">周未</div>
                                            <div class="ivsom-datetimepicker__header">周一</div>
                                            <div class="ivsom-datetimepicker__header">周二</div>
                                            <div class="ivsom-datetimepicker__header">周三</div>
                                            <div class="ivsom-datetimepicker__header">周四</div>
                                            <div class="ivsom-datetimepicker__header">周五</div>
                                            <div class="ivsom-datetimepicker__header">周六</div>
                                            {
                                                new Array(42).fill(0).map((_, k) => {
                                                    if (k < p_week) {
                                                        return <div class="ivsom-datetimepicker__cell is-prev-month">{ p_p_day - p_week + k + 1 }</div>
                                                    }

                                                    if (k - p_week < p_day) {
                                                        return <div 
                                                            class={
                                                                { 
                                                                    "ivsom-datetimepicker__cell" : true, 
                                                                    "ivsom-datetimepicker__inRange" : me.isDateTimeInRange(setDateTime(me.next, k - p_week + 1, "d")) && me.range,
                                                                    "ivsom-datetimepicker__isStart" : me.isStart(setDateTime(me.next, k - p_week + 1, 'd'), 'h'),
                                                                    "ivsom-datetimepicker__isEnd" : me.isEnd(setDateTime(me.next, k - p_week + 1, 'd'), 'h')
                                                                }
                                                            }
                                                            onClick={ tsx.modifiers.stop((event : MouseEvent) => me.onChange(event, setDateTime(me.next, k - p_week + 1, 'd'))) }
                                                        >
                                                            <span>{ k - p_week + 1 }</span>
                                                        </div>
                                                    }

                                                    return <div class="ivsom-datetimepicker__cell is-next-month">{ k - (p_day + p_week) + 1 }</div> 
                                                })
                                            }
                                        </div>
                                        <div class={{ 'ivsom-datetimepicker__month': true, 'ivsom-datetimepicker__isMonth' : me.nextDateOperating === 'month'  }}>
                                            { new Array(12).fill(0).map((it, i) => <div class="ivsom-datetimepicker__cell"  onClick={ tsx.modifiers.stop(() => me.modifyMonth(i, 'next')) }>{i + 1} 月</div> ) }
                                        </div>
                                        <div class={{ 'ivsom-datetimepicker__year': true, 'ivsom-datetimepicker__isYear' : me.nextDateOperating === 'year' }}>
                                            { new Array(24).fill(0).map((it, i) => <div class="ivsom-datetimepicker__cell"  onClick={ tsx.modifiers.stop(() => me.modifyYear(me.next.getFullYear() + i, 'next'))}>{ me.next.getFullYear() + i } 年</div>)  }
                                        </div>
                                    </div>
                                    <div class="ivsom-datetimepicker__footer">
                                        {
                                            !me.hiddenTimePicker ? (
                                                <div class="ivsom-datetimepicker__timer">
                                                    {
                                                        !me.isTwentyFour ? <div class="ivsom-datetimepicker__meridiem">{ Math.ceil(me.next.getHours() / 12) <= 1 ? 'a.m.' : 'p.m.' }</div> : null
                                                    }
                                                    <ul class="ivsom-datetimepicker__hour" onWheel={ tsx.modifiers.stop.prevent((e: WheelEvent) => me.modifyHours(e, 'next')) }>
                                                        { 
                                                            new Array(24).fill(0).map((_, i) => {
                                                                var hour = me.isTwentyFour ? i : (i % 12 === 0 && i !== 0 ? 12 : i % 12)
                                                                return <li class={{ 'ivsom-datetimepicker__isHour' : me.next.getHours() === i }} key={i}>{ ((new Array(2).join('0')) + hour).slice(-2) }</li>
                                                            }) 
                                                        }
                                                    </ul>
                                                    <ul class="ivsom-datetimepicker__minute" onWheel={ tsx.modifiers.stop.prevent((e: WheelEvent) => me.modifyMinute(e, 'next')) }>{ new Array(60).fill(0).map((_, i) => <li class={{ 'ivsom-datetimepicker__isMinute' : me.next.getMinutes() === i }}  key={i} >{ ((new Array(2).join('0')) + i).slice(-2) }</li>) }</ul>
                                                    <ul class="ivsom-datetimepicker__second" onWheel={ tsx.modifiers.stop.prevent((e: WheelEvent) => me.modifySecond(e, 'next')) }>{ new Array(60).fill(0).map((_, i) => <li class={{ 'ivsom-datetimepicker__isSecond' : me.next.getSeconds() === i }}  key={i} >{ ((new Array(2).join('0')) + i).slice(-2) }</li>) }</ul>
                                                </div>
                                            ) : null
                                        }
                                    </div>
                                </div>
                            ) : null
                        }
                    </div>
                </div>
            </div>
        )
    }
}