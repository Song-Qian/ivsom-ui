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
import iVsomRow from './components/layout/ivsom-row'
import iVsomCol from './components/layout/ivsom-col'

const components : Array<any> = [
    iVsomRow,
    iVsomCol,
    iVsomButton,
    iVsomButtonGroup,
    iVsomBreadCrumbs
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