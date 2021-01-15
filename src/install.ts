/**
 * Developer    :   SongQian
 * Time         :   2020-04-21
 * eMail        :   songqian@wtoe.cn
 * Description  :   ivsom组件打包入口   
 */

import '~/styles'
import iVsomBreadCrumbs from './components/breadcrumbs/ivsom-breadcrumbs'
import iVsomButton from './components/button/ivsom-button'
import iVsomButtonGroup from './components/button/ivsom-button-group'
import iVsomCheckBox from './components/form/ivsom-checkbox'
import iVsomCheckBoxGroup from './components/form/ivsom-checkbox-group'
import iVsomForm from './components/form/ivsom-form'
import iVsomFormValidater from './components/form/ivsom-form-validater'
import iVsomInput from './components/form/ivsom-input'
import iVsomInputNumber from './components/form/ivsom-input-number'
import iVsomRadio from './components/form/ivsom-radio'
import iVsomRadioGroup from './components/form/ivsom-radio-group'
import iVSomSelect from './components/form/ivsom-select'
import iVsomSlider from './components/form/ivsom-slider'
import iVsomCol from './components/layout/ivsom-col'
import iVsomRow from './components/layout/ivsom-row'
import iVsomList from './components/list/ivsom-list'
import iVsomMenu from './components/menu/ivsom-menu'
import iVsomMenuItem from './components/menu/ivsom-menu-item'
import iVsomPagination from './components/page/ivsom-pagination'
import iVsomStep from './components/step/ivsom-step'
import iVsomSwitch from './components/form/ivsom-switch'
import iVsomTabs from './components/tabs/ivsom-tabs'
import iVsomTabsPanel from './components/tabs/ivsom-tabs-panel'
import iVsomUpload from './components/upload/ivsom-upload'
import iVsomMessage from './components/message/ivsom-message'

const components: Array<any> = [
    iVsomRow,
    iVsomCol,
    iVsomButton,
    iVsomButtonGroup,
    iVsomBreadCrumbs,
    iVsomTabs,
    iVsomTabsPanel,
    iVsomMenu,
    iVsomMenuItem,
    iVsomRadioGroup,
    iVsomRadio,
    iVsomCheckBox,
    iVsomCheckBoxGroup,
    iVsomInputNumber,
    iVsomSwitch,
    iVsomSlider,
    iVsomPagination,
    iVsomInput,
    iVsomStep,
    iVsomList,
    iVsomForm,
    iVsomFormValidater,
    iVSomSelect,
    iVsomUpload
]

const install = (Vue: any) => {
    Vue.config.devtools = true;
    components.forEach((el, n: number) => {
        Vue.component((<any>el).name, el);
    })

    Vue.prototype.$ivsom_message = {
        alert : iVsomMessage.alert,
        confirm : iVsomMessage.confirm,
        prompt : iVsomMessage.prompt,
        toast : iVsomMessage.toast
    }
}

export default {
    version: '0.0.1',
    install,
    ...components
}