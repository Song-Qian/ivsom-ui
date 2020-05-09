/**
 * Developer    :   SongQian
 * Time         :   2020-05-09
 * eMail        :   songqian@wtoe.cn
 * Description  :   Tabs 组件
 */

 import * as tsx from 'vue-tsx-support'
 import { Component } from 'vue-property-decorator'

 type ScopedSlots = {
     default : void
 }

 @Component
 export default class iVsomTabs extends tsx.Component<any, any, ScopedSlots> {

    constructor() {
         super()
    }

     protected render() : JSX.Element {
         const me =this;
         return (
             <div class='ivsom-tabs'>
                 { me.$scopedSlots.default && me.$scopedSlots.default() }
             </div>
         )
     }

 }