import { App } from 'vue'

import chooseArea from './chooseArea'
import iconChoose from './iconChoose'
import trent from './trent'
import notification from './notification'
import list from "./list";
import menu from "./menu";
import progress from "./progress";
import chooseTime from "./chooseTime";
import chooseDate from "./chooseDate";
import chooseCity from "./chooseCity";
import modalForm from "./modalForm";
import modalTable from "./modalTable";
import table from "./table";
import calendar from "./calendar";
import proFrom from "./from";
const components = [chooseArea, iconChoose, trent, notification, list, menu, progress, chooseTime, chooseDate, chooseCity, proFrom,modalForm,modalTable,table,calendar]

export default {
    install(app: App) {
        components.map(item => {
            app.use(item)
        })
    }
}