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

```
### ！感叹号表示一定有这个属性

```
```


# 省市区 
通过下拉实现三级联动

### API
#### 事件
|事件名|说明 |参数|
|:----|----|----|
|change|选择了省市区三级之后触发|省市区数据|
#### 数据格式
|key|说明 |类型|
|:----|----|----|
|province|省份数据|{name:string,code:number}|
|city|市数据|{name:string,code:number}|
|area|区数据|{name:string,code:number}|

# 趋势标记
|属性|说明 |类型|可选值|默认值|
|:----|----|----|----|----|
|type|上升趋势还是下降趋势 |up/down|up/down||up|
|upIcon|上升图标 |string|-|arrowUp|
|downIcon|下降图标 |string|-|arrowDown|
|text|趋势显示文字 |string|-|-|
|upIconColor|上升图标颜色|string |-|#f5222d|
|downIconColor|下降图标颜色|string |-|#52c41a|
|upTextColor|上升文字颜色|string |-|#52c41a|
|downTextColor|下降文字颜色|string |-|#52c41a|

#### slots插槽
|名称|说明 |
|:----|----|
|default|趋势显示的文字|

# 时间选择
|属性|说明 |类型|可选值|默认值|
|:----|----|----|----|----|
|startPlaceholder|开始时间占位符|string|-|请选择开始时间|
|endPlaceholder|结束时间占位符|string|-|请选择结束时间|
|startTimeStart|开始时间开始选择|string|-|08:00|
|startStep|开始时间的步长|string|-|00:30|
|startTimeEnd|开始时间的结束选择|string|-|00:30|
|endTimeStart|结束时间时间开始选择|string|-|08:00|
|endStep|结束时间的步长|string|-|00:30|
|endTimeEnd|结束时间的结束选择|string|-|24:00|

### 时间插件事件
|事件|说明 |参数|
|:----|----|----|
|startChange|开始时间变化时触发|val:string 开始时间|
|endChange|结束时间变化时触发|val:string 开始时间|

### value数据格式
|key|说明 |类型|
|:----|----|----|
|startTime|开始时间|string|
|endTime|结束时间|string|


# 日期选择
|属性|说明 |类型|可选值|默认值|
|:----|----|----|----|----|
|startPlaceholder|开始时间占位符|string|-|请选择开始日期|
|endPlaceholder|结束时间占位符|string|-|请选择结束日期|
|disableToday|是否禁用选择今天之前的日期|boolean|-|true|
### 日期选择事件
|事件|说明 |参数|
|:----|----|----|
|startChange|开始时间变化时触发|val:string 开始时间|
|endChange|结束时间变化时触发|val:string 开始时间|

### value数据格式
|key|说明 |类型|
|:----|----|----|
|startDate|开始日期|string|
|endDate|结束日期|string|

# popover 提示插件
|属性|说明 |类型|可选值|默认值|
|:----|----|----|----|----|
|icon|显示的图标|string|-|Bell|
|value|显示的图标|string, number|-|-|
|max|显示的图标|number|-|-|
|isDot|显示的图标|boolean|true/false|false|

#### slots插槽
|名称|说明 |
|:----|----|
|default|点击图标之后显示的内容|

# 列表组件  
#### poprs
|属性|说明 |类型|可选值|默认值|
|:----|----|----|----|----|
|list|列表的内容|ListOptions[]|必填|-|
|actions|操作的内容|ActionOptions[]|-|[]|


#### ListOptions 数据格式
|key|说明 |类型|
|:----|----|----|
|title|tab的标题|string|
|content|列表内容|string|

#### ListItem数据格式
|key|说明 |类型|
|:----|----|----|
|avatan|图像|string|
|title|标题|string|
|desc|描述|string|
|time|时间|string|
|tag|标签|string|
|tagType|标签样式|success/info/warning/danger|
#### ActionOptions数据格式
|key|说明 |类型|
|:----|----|----|
|text|操作标题|string|
|icon|操作图标|string|

# 菜单
|属性|说明 |类型|可选值|默认值|
|:----|----|----|----|----|
|defaultActive|默认选中菜单的index值|string|-|-|
|router|是否是路由模式|Boolean|false/true|false|
|name|菜单标题的键名|string|-|name|
|index|菜单标识的键名|string|-|index|
|icon|检测图标键名|string|-|icon|
|children|菜单子菜单的键名|string|-|children|

# 三级联动城市选择
#### 事件

|事件名|说明 |参数|
|:----|----|----|
|changeCity|开始时间变化时候触发|val:City 城市信息|
|changeProvince|按省份选择时触发|val:Province 开始时间|

#### City数据格式
|key|说明 |类型|
|:----|----|----|
|id|城市编码|string|
|spell|城市拼音|string|
|name|城市名称|string|

# 日历封装
安装插件
```
cnpm i -S @fullcalendar/core
cnpm i -S @fullcalendar/interaction
cnpm i -S @fullcalendar/daygrid
```
### 
|属性|说明 |类型|可选值|默认值|
|:----|----|----|----|----|
|local|日历语音|string|-|zh-cn|
|initiaView|视图模式|string|-|dayGridMonth|
|buttonText|按钮文字|object|-|-|
|handerToolbar|头部工具栏|object|-|-|
|footerToolbar|底部工具类|object|-|-|
|event|日历渲染事件|object|-|-|
|eventContent|自定义渲染|EventItem[]|-|[]|

#### eventItem数据格式
|key|说明 |类型|
|:----|----|----|
|type|表单项的类型|string|
|value|表单项初始值|string|
|label|表单label|string|
|prop|表单项标识|string|
|rules|表单项的验证规则| 和element-plus表单规则一样|
|placeholder|表单占位符|string|
|attr|表单属性|和element-plus表单属性一样|
|children|表单子元素| FromOptions[]|
|uploadAttrs|上传选项配置| FromOptions[]|

#### slots插槽
|名称|说明 |
|:----|----|
|uploadArea|上传组件的占位符|
|uploadTip|上传组件的提示信息|
|action|表单按钮|

# 弹窗表单
|属性|说明 |类型|可选值|默认值|
|:----|----|----|----|----|
|isScroll|是否在可视区域滚动|Boolean|true/false|false|
|visible|弹窗显示隐藏|Boolean|true/false|false|
|options|表配置项|FormOptions[]|必填|-|
|onChange|文件状态改变的钩子 添加文件 上传和上传失败被调用|function(file,fileList){}|-|-|

# 表格+分页

|属性|说明 |类型|可选值|默认值|
|:----|----|----|----|----|
|opstions|表格配置项|TableOptions|必填|-|
|data|表格数据|TableOptions|必填|-|
|elementLoadingText|加载文案|string|-|-|
|elementLoadingBackground|加载背景颜色|string|-|-|
|elementLoadingSpinner|加载图标名|string|-|-|
|elementLoadingSvg|加载图标svg|string|-|-|
|elementLoadingSvgViewBox|加载图标svg的配置|string|-|-|
|editIcon|表格配置项|string|-|Exit|
|isEditRow|是否可以编辑|Boolean|true/false|false|
|exitRowIndex|编码按钮标识|string|-|-|
|pagintion|是否显示分页|Boolean|true/false|false|
|pagintionAlign|显示对齐方式|string|left/center/right|-|
|currentPage|当前是几个|number|-|1|
|pageSize|当前一个多少条数据|number|-|10|
|pageSizes|显示分页数据多少条选项|string|-|[10,20,30]|
|total|数据总数|number|-|-|


#### 事件
|事件名|说明 |参数|
|:----|----|----|
|confirm|可编辑单元格确认事件|scope是当前行数据|
|cancel|可编辑单元格取消事件|scope是当前行数据|
|size-change|分页当前显示条数改变时候触发|val：当前页条数|
|current-change|当前页改变时候触发|val：当前页|

#### slots插槽
|名称|说明 |
|:----|----|
|cellEdit|自定义可编辑单元格内容|
|editRow|自定义可编辑行按钮内容|
|action|自定义编辑区域内容|

- 图标选择器
- 伸缩菜单
- 省市区选择器
- 时间选择器
- 日期选择器
- 城市选择器
- 趋势标记
- 通知列表
- 通知菜单
- 导航菜单
- 动态进度条
- 可配置型表单
- 可配置型表格
- 弹出框表单
- 日历
- 提示弹出封装