/**
 * Developer    :   SongQian
 * Time         :   2020-08-13
 * eMail        :   songqian@wtoe.cn
 * Description  :   表单验证组件
 */

 import * as tsx from 'vue-tsx-support'
 import { Component, Prop, InjectReactive, ProvideReactive } from 'vue-property-decorator'
 
 import 'vue-tsx-support/enable-check'

 type Props = {
    //必填
    required : Boolean
    //表单标题
    Label : String
    //最小长度
    Min : number
    //最大长度
    Max : number
    //邮箱验证
    EMail : Boolean
    //电话验证
    Phone : Boolean
    //小数验证
    Double : Boolean
    //ID 身份证验证
    Identifier : Boolean
    //自定义验证
    validate : RegExp | Function | null
    //验证字段
    prop : String
    //验证错误文本信息
    ErrorMessage : String,
    //验证事件触发方式
    trigger : 'blur' | 'change'
 }

 type ScopedSlots = {
    default : void
 }

 @Component
 export default class iVsomFormValidater extends tsx.Component<Props, null, ScopedSlots> {

    @Prop({ default : '' }) readonly label !: string;

    @Prop({ default : false, type: Boolean }) readonly required !: boolean;

    @Prop({ default : 0, type : Number }) readonly min !: number;

    @Prop({ default : 0, type : Number }) readonly max !: number;

    @Prop({ default : false, type : Boolean }) readonly eMail !: boolean;

    @Prop({ default : false, type : Boolean }) readonly phone !: boolean;

    @Prop({ default : false, type : Boolean }) readonly double !: boolean;

    @Prop({ default : false, type : Boolean }) readonly identifier !: boolean;

    @Prop({ default : null, type : Array }) readonly validate !:  RegExp | Function | null;

    @Prop({ required : true, type : String }) readonly prop !: string;

    @Prop({ default : '', type : String }) readonly errroMessage !: string;

    @ProvideReactive(Symbol.for('trigger')) @Prop({ default : 'blur', type : String }) readonly trigger !: 'blur' | 'change';

    private messages : string = '';

    @ProvideReactive(Symbol.for('validate')) validator : boolean = true;
    
    @InjectReactive(Symbol.for('model')) model !: { [key : string] : any };

    @InjectReactive(Symbol.for('labelWidth')) label_width !: number | string;

    @InjectReactive(Symbol.for('position')) label_position !: string;

    protected validateField() {
         let me = this;
         me.validator = true;
         if(me.required && me.validator) {
            me.validator = me.model[me.prop] && me.model[me.prop].replace(/^(\s+)|(\s+)$/gi, '') !== '';
            me.messages = me.validator ? '' : '必填项，请输入文本。';
         }

         if(me.min && me.validator) {
            me.validator = typeof me.model[me.prop] === 'number' ? me.model[me.prop] >= me.min : me.model[me.prop] && me.model[me.prop].length >= me.min;
            me.messages = me.validator ? '' : `输入文本长度（大小）小于${me.min}。`;
         }

         if(me.max && me.validator) {
            me.validator = typeof me.model[me.prop] === 'number' ? me.model[me.prop] <= me.max : me.model[me.prop] && me.model[me.prop].length <= me.max;
            me.messages = me.validator ? '' : `输入文本长度（大小）大于${me.max}。`;
         }

         if(me.eMail && me.validator) {
            me.validator = me.model[me.prop] && /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$/g.test(me.model[me.prop]);
            me.messages = me.validator ? '' : '输入邮箱格式不正确。';
         }

         if(me.phone && me.validator) {
            me.validator = me.model[me.prop] && /^(0?1([38][0-9]|4[5-9]|5[0-3,5-9]|66|7[0-8]|9[89])[0-9]{8})|((\d{3,4}-)?\d{7,8})$/g.test(me.model[me.prop]);
            me.messages = me.validator ? '' : '输入联系电话格式不对。'
         }

         if(me.double && me.validator) {
            me.validator = me.model[me.prop] && /^(-?[1-9]\d+(\.\d+)?)|(-?0(\.\d+)[1-9]\d+)$/g.test(me.model[me.prop]);
            me.messages = me.validator ? '' : '输入浮点数值格式不对。'
         }

         if(me.validate && me.validator) {
            if(me.validate instanceof RegExp) {
               me.validator = me.validate.test(me.model[me.prop]);
               me.messages = me.validator ? '' : me.errroMessage;
            }

            if(me.validate instanceof Function) {
               let callback = (err : Error) => {
                  me.validator = true;
                  me.messages = '';
                  if(err) {
                     me.validator = false;
                     me.messages = err.message || me.errroMessage;
                  }
               }
               me.validate.apply(me, [callback]);
            }
         }
         return me.validator;
    }

    protected clearValidate() {
       let me = this;
       me.validator = true;
    }

    protected mounted() {
       let me = this;
       me.$on('on-validate', me.validateField);
    }

    protected render() : JSX.Element {
       let me = this;
       return (
         <div class="ivsom-form-validator">
            { me.required ? <div class='has-required'>*</div> : <div class='has-required'></div> }
            <div class='ivsom-form-validator-label' style={{ width: typeof me.label_width === 'number' ? `${me.label_width}px` : me.label_width, textAlign: me.label_position }} >{ me.label }</div>
            <div class='ivsom-form-validator__wapper'>
               { me.$scopedSlots.default() }
               <div class={['ivsom-form-validator__error', me.validator ? '' : 'hasValidate']} >{ me.messages }</div>
            </div>
         </div>
       )
    }

 }