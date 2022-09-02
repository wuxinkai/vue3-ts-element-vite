# 创建vue3+ts+vite+axios+pinia+elementui学习

### 引入图标
下载
```
cnpm install @element-plus/icons-vue
```
main 引入图标
```
import * as Icons from '@element-plus/icons-vue'
//大写转小写
import { toLine } from './utils'
//转成 el-icon-xx的形式
for (let i in Icons) {
    //传承el的形式
    console.log(`el-icon-${toLine(i)}`);
    app.component(`el-icon-${toLine(i)}`, (Icons as any)[i])
}
```
utils/index.ts
```
export const toLine = (value: string) => {
    //驼峰转横杠  改成小写
    return value.replace(/(A-Z)g/, '-$1').toLocaleLowerCase()
}
```
### 收缩菜单
```
```

### v-model传值  双向数据绑定
父页面 v-model:collaps
```

import { ref } from 'vue'
let isCollapse = ref(false)

<nav-header v-model:collapse="isCollapse"></nav-header>
```
子页面
1. let props = defineProps<{collapse: boolean}>() 获取父页值
2. let emits = defineEmits(['update:collapse']) 注册要广播的事件名
3. emits('update:collapse', !props.collapse) 发送事件，
```
<script lang="ts" setup>
let props = defineProps<{
    collapse: boolean
}>()

//切换图标
let emits = defineEmits(['update:collapse'])

const toggle = () => {
    emits('update:collapse', !props.collapse)
}

</script>
<template>
    <el-icon-expand @click="toggle" v-if="collapse"></el-icon-expand>
    <el-icon-fold @click="toggle" v-else></el-icon-fold>
</template>
```
### 全局组件注册

- 组件页面 components\iconChoose\IconDialog.vue
- 组件页面 components\iconChoose\IconDialog.vue
```
import { App } from 'vue'
import IconDialog from "./IconDialog.vue";


//这个组件可以通过use的形式使用
export default {
    install(app: App) {
        app.component('pro-icon-dialog', IconDialog)
    }
}
```
 组件页面 components\index.ts
```
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
```
min.ts页面引入
```
import proUI from './components'
const app = createApp(App)
app.use(proUI)
```

####  v-bind="$attrs"  继承父页面上所有的属性
子页面
```
<el-menu  v-bind="$attrs" > </el-menu>
```
父页面 上的所有属性都能通过 v-bind="$attrs"继承到子页面的 组件上
```
  <pro-menu :data="data1" defaultActive="2" text-color="green" active-text-color="red" background-color="#ccc"></pro-menu>
```

### jsx应用
```
npm i -D @vitejs/plugin-vue-jsx

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  plugins: [vue(), vueJsx()],
})
```
### 菜单 自定义建名   （很重要）
```
``
### ！感叹号表示一定有这个属性
`