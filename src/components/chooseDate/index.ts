// 全局组件注册
import { App } from 'vue'
import ChooseDate from "./ChooseDate.vue";


//这个组件可以通过use的形式使用
export default {
    install(app: App) {
        app.component('pro-choose-date', ChooseDate)
    }
}