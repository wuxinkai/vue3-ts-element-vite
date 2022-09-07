// 全局组件注册
import { App } from 'vue'
import Form from "./Form.vue";


//这个组件可以通过use的形式使用
export default {
    install(app: App) {
        app.component('pro-form', Form)
    }
}