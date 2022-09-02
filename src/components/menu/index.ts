// 全局组件注册
import { App } from 'vue'
import Menu from "./Menu.vue";
import infiniteMenu from "./infiniteMenu";


//这个组件可以通过use的形式使用
export default {
    install(app: App) {
        app.component('pro-menu', Menu)
        app.component('pro-infinite-menu', infiniteMenu)
    }
}