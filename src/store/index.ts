import { defineStore } from 'pinia'
import { Names, Bases } from './store-namespace'

//依赖的名字Names.Test
export const useTestStore = defineStore(Names.Test, {
    state: () => {
        return {
            current: 1,
            name: '小强'
        }
    },
    //类似于computed 可以帮我们去修饰我们的值
    getters: {

    },
    //可以操作异步 和 同步提交state
    actions: {
        setCurrent() {
            this.current++
        }
    }
})


//依赖的名字Names.Test
export const useBaseStore = defineStore(Bases.Base, {
    state: () => {
        return {
            name: '奔驰',
            age: 40
        }
    } 
})