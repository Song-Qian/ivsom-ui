/**
 * Developer    :   SongQian
 * Time         :   2020-05-28
 * eMail        :   songqian@wtoe.cn
 * Description  :   radio组件
 */

import { Component, InjectReactive } from 'vue-property-decorator';
import * as tsx from 'vue-tsx-support';
import 'vue-tsx-support/enable-check';

interface Props {
    //Radio 文本
    Text: String,
    //Radio v-model值
    Value: any,
    //Radio 禁用
    Disabled: Boolean,
    //Radio 大小
    Size: 'medium' | 'small' | 'mini'
    //Radio 样式
    Type: 'circle' | 'check' | 'button'
}

interface Event {
    onChange: (e: MouseEvent) => void;
}

@Component
export default class iVsomRadio extends tsx.Component<Props, Event>{
    constructor() {
        super()
    }

    @InjectReactive(Symbol.for('validate')) validate !: boolean;
    @InjectReactive(Symbol.for('trigger')) trigger !: 'blur' | 'change';

    protected render(): JSX.Element {
        const me = this;
        return (
            <div class="ivsom-radio"></div>
        )
    }

}
