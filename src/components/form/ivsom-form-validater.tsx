/**
 * Developer    :   SongQian
 * Time         :   2020-08-13
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   表单验证组件
 */

import { Component, InjectReactive, Prop, ProvideReactive } from 'vue-property-decorator'
import * as tsx from 'vue-tsx-support'
import 'vue-tsx-support/enable-check'


type Props = {
   //是否行内布局
   Inline : Boolean,
   //行内布局间隙
   Span : Number,
   //行内布局偏移
   Offset : Number,
   //必填
   Required: Boolean
   //表单标题
   Label: String
   //最小长度
   Min: number
   //最大长度
   Max: number
   //邮箱验证
   EMail: Boolean
   //电话验证
   Phone: Boolean
   //小数验证
   Double: Boolean
   //ID 身份证验证
   Identifier: Boolean
   //自定义验证
   Validate: RegExp | Function | null
   //验证字段
   Prop: String
   //验证错误文本信息
   ErrorMessage: String,
   //验证事件触发方式
   Trigger: 'blur' | 'change'
}

type ScopedSlots = {
   default: void
}

@Component
export default class iVsomFormValidater extends tsx.Component<Props, any, ScopedSlots> {

   @Prop({ default: false, type: Boolean }) readonly inline !: boolean;

   @Prop({ default : 30, type: Number }) readonly span !: number;

   @Prop({ default: 0, type: Number }) readonly offset !: number;

   @Prop({ default: '' }) readonly label !: string;

   @Prop({ default: false, type: Boolean }) readonly required !: boolean;

   @Prop({ default: 0, type: Number }) readonly min !: number;

   @Prop({ default: 0, type: Number }) readonly max !: number;

   @Prop({ default: false, type: Boolean }) readonly eMail !: boolean;

   @Prop({ default: false, type: Boolean }) readonly phone !: boolean;

   @Prop({ default: false, type: Boolean }) readonly double !: boolean;

   @Prop({ default: false, type: Boolean }) readonly identifier !: boolean;

   @Prop({ default: null, type: Array }) readonly validate !: RegExp | Function | null;

   @Prop({ required: true, type: String }) readonly prop !: string;

   @Prop({ default: '', type: String }) readonly errorMessage !: string;

   @ProvideReactive(Symbol.for('trigger')) @Prop({ default: 'blur', type: String }) readonly trigger !: 'blur' | 'change';

   private messages: string = '';

   @ProvideReactive(Symbol.for('validate')) validator: boolean = true;

   @InjectReactive({ from: Symbol.for('model'), default: {} }) model !: { [key: string]: any };

   @InjectReactive({ from: Symbol.for('labelWidth'), default: 'auto' }) label_width !: number | string;

   @InjectReactive({ from: Symbol.for('position'), default: 'left' }) position !: 'left' | 'center' | 'right';

   public validateField() {
      let me = this;
      me.validator = true;
      if (me.required && me.validator) {

         if (typeof me.model[me.prop] === "string") {
            me.validator = Boolean(me.model[me.prop]) && me.model[me.prop].replace(/^(\s+)|(\s+)$/gi, '') !== '';
         } else if (typeof me.model[me.prop] !== "string") {
            me.validator = me.model[me.prop] !== "" || me.model[me.prop] !== null || me.model[me.prop] !== undefined;
         }

         if(me.model[me.prop] instanceof Array) {
            me.validator = Boolean(me.model[me.prop]) && me.model[me.prop].length > 0;
         }

         me.messages = me.validator ? '' : me.errorMessage ? me.errorMessage : '必填项，请输入文本。';
      }

      if (me.min && me.validator) {
         me.validator = typeof me.model[me.prop] === 'number' ? me.model[me.prop] >= me.min : me.model[me.prop] && me.model[me.prop].length >= me.min;
         me.messages = me.validator ? '' : me.errorMessage ? me.errorMessage : `输入文本长度（大小）小于${me.min}。`;
      }

      if (me.max && me.validator) {
         me.validator = typeof me.model[me.prop] === 'number' ? me.model[me.prop] <= me.max : me.model[me.prop] && me.model[me.prop].length <= me.max;
         me.messages = me.validator ? '' : me.errorMessage ? me.errorMessage : `输入文本长度（大小）大于${me.max}。`;
      }

      if (me.eMail && me.validator) {
         me.validator = me.model[me.prop] && /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$/g.test(me.model[me.prop]);
         me.messages = me.validator ? '' : me.errorMessage ? me.errorMessage : '输入邮箱格式不正确。';
      }

      if (me.phone && me.validator) {
         me.validator = me.model[me.prop] && /^((0?((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8})|((\d{3,4}-)?\d{7,8}))$/g.test(me.model[me.prop]);
         me.messages = me.validator ? '' : me.errorMessage ? me.errorMessage : '输入联系电话格式不对。'
      }

      if (me.double && me.validator) {
         me.validator = me.model[me.prop] && /^((-?[1-9]\d{0,}(\.\d+)?)|(-?0(\.\d+)[1-9]{0,}))$/g.test(me.model[me.prop]);
         me.messages = me.validator ? '' : me.errorMessage ? me.errorMessage : '输入浮点数值格式不对。'
      }

      if (me.identifier && me.validator) {
         me.validator = me.model[me.prop] && /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9XxAa]$/g.test(me.model[me.prop]);
         me.validator = me.validator || (me.model[me.prop] && /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9XxAa]$/g.test(me.model[me.prop]));
         me.validator = me.validator || (me.model[me.prop] && /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/g.test(me.model[me.prop]));
         me.validator = me.validator || (me.model[me.prop] && /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/g.test(me.model[me.prop]));
         me.messages = me.validator ? '' : me.errorMessage ? me.errorMessage : '输入的身份证格式不对。'
      }

      if (me.validate && me.validator) {
         if (me.validate instanceof RegExp) {
            me.validator = me.validate.test(me.model[me.prop]);
            me.messages = me.validator ? '' : me.errorMessage;
         }

         if (me.validate instanceof Function) {
            let callback = (err: Error) => {
               me.validator = true;
               me.messages = '';
               if (err) {
                  me.validator = false;
                  me.messages = err.message || me.errorMessage;
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
      me.$parent.$emit("emitPushValidator", me);
   }

   protected beforeDestroy() {
      let me = this;
      me.$parent.$emit("emitRemoveValidator", me);
   }

   protected render(): JSX.Element {
      let me = this;
      return (
         <div class={{ 'ivsom-form-validator' : true, 'ivsom-form-validator__inline' : me.inline, ['ivsom-form-validator__span_' + me.span] : me.inline, ['ivsom-form-validator__offset_' + me.offset] : me.inline && me.offset > 0 }}>
            { me.required ? <div class='has-required'>*</div> : <div class='has-required'></div>}
            <div class='ivsom-form-validator-label' style={{ width: typeof me.label_width === 'number' ? `${me.label_width}px` : me.label_width, textAlign: me.position }} >{me.label}</div>
            <div class='ivsom-form-validator__wapper'>
               {me.$scopedSlots.default()}
               <div class={['ivsom-form-validator__error', me.validator ? '' : 'hasValidate']} >{me.messages}</div>
            </div>
         </div>
      )
   }

}