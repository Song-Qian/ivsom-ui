/**
 * Developer    :   SongQian
 * Time         :   2020-05-09
 * eMail        :   songqian@wtoe.cn
 * Description  :   Tabs Panel组件
 */

 import * as tsx from 'vue-tsx-support'
 import { Component } from 'vue-property-decorator'

 @Component
 export default class iVsomTabsPanel extends tsx.Component<any> {

     constructor() {
         super()
     }

     protected render() : JSX.Element {
         return (
             <div class="ivsom-tabs-panel"></div>
         )
     }
 }