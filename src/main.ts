import { createApp } from 'vue'

import App from './App.vue'
import router from "./router"
import Directive from './directive/index' // 自定义指令
import { toLine } from './utils'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import proUI from './components'
import * as Icons from '@element-plus/icons-vue'



import '@/assets/styles/index.scss'
import { createPinia } from "pinia"

const app = createApp(App)
//循环图标组件，全局注册
for (let i in Icons) {
    //传承el的形式
    app.component(`el-icon-${toLine(i)}`, (Icons as any)[i])
}

import './mock'


app.use(ElementPlus)
app.use(Directive)
app.use(createPinia())
app.use(proUI)
app.use(router)
app.mount('#app')
