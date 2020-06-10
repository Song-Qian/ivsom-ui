/**
 * Developer    :   SongQian
 * Time         :   2020-04-21
 * eMail        :   songqian@wtoe.cn
 * Description  :   ivsom组件打包入口   
 */

import '~/styles'

import iVsomButton from './components/button/ivsom-button'
import iVsomButtonGroup from './components/button/ivsom-buttonGroup'
import iVsomBreadCrumbs from './components/breadcrumbs/ivsom-breadcrumbs'
import iVsomNumberInput from './components/form/ivsom-number-input'
import iVsomRow from './components/layout/ivsom-row'
import iVsomCol from './components/layout/ivsom-col'
import iVsomTabs from './components/tabs/ivsom-tabs'
import iVsomTabsPanel from './components/tabs/ivsom-tabs-panel'
import iVsomMenu from './components/menu/ivsom-menu'
import iVsomMenuItem from './components/menu/ivsom-menu-item'
import iVsomRadio from './components/radio/ivsom-radio'
import iVsomCheckbox from './components/checkbox/ivsom-checkbox'
import iVsomInputNumber from './components/number/ivsom-input-number'
import iVsomSwitch from './components/switch/ivsom-switch'

const components : Array<any> = [
    iVsomRow,
    iVsomCol,
    iVsomButton,
    iVsomButtonGroup,
    iVsomBreadCrumbs, 
    iVsomNumberInput,
    iVsomTabs, 
    iVsomTabsPanel,
    iVsomMenu,
    iVsomMenuItem,
    iVsomRadio,
    iVsomCheckbox,
    iVsomInputNumber,
    iVsomSwitch
]

const install = (Vue : any) => {
    components.forEach((el, n : number) => {
        Vue.component((<any>el).name, el);
    })
}

if(typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    version : '0.0.1',
    install,
    ...components
}