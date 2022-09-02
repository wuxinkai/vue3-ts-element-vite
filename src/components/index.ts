import { App } from 'vue'

import chooseArea from './chooseArea'
import iconChoose from './iconChoose'
import trent from './trent'
import notification from './notification'
import list from "./list";
import menu from "./menu";
const components = [chooseArea, iconChoose, trent, notification, list,menu]

export default {
    install(app: App) {
        components.map(item => {
            app.use(item)
        })
    }
}