
import { reactive } from 'vue'
import type { IntData } from '../../type/todoList'


//通过IntData的类型约束，实现id不报错
const data = reactive<IntData>({
    list: [],
    addList: {
        id: 0,
        type: false,
        title: ''
    }
})

//增加数据
const addFn = () => {
    data.list.push({ ...data.addList, id: data.list.length + 1 })  //id 不能将类型“number”分配给类型“never”
    data.addList.title = ''
}
//跳转页面清空数据
const clearData = () => {
    data.list = []
}


//箭头函数 return 可以用小括号包裹
export default () => ({
    data,
    addFn,
    clearData
})