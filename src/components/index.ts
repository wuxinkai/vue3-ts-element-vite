import { App } from 'vue'

import chooseArea from './chooseArea'
import iconChoose from './iconChoose'

const components = [chooseArea, iconChoose,]

export default {
    install(app: App) {
        components.map(item => {
            app.use(item)
        })
    }
}