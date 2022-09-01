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
```

```