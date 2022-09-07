<script lang="ts" setup>
import { ref } from 'vue'
import { TableOptions } from '../../components/table/type'

let options: TableOptions[] = [
    {
        label: '日期',
        prop: 'date',
        align: 'center',
        slot: 'date',// 有插槽
        editable: true//是否可以编辑
    },
    {
        label: '姓名',
        prop: 'name',
        align: 'center',
        slot: 'name',
    },
    {
        label: '地址',
        prop: 'address',
        align: 'center',
        editable: true,
    },
    {
        label: '操作',
        align: 'center',
        action: true
    }
]

//定义数据接口
interface TableData {
    date: string,
    name: string,
    address: string,
}
//初始化数据名称
let tableData = ref<TableData[]>([])
//获取数据
setTimeout(() => {
    tableData.value = [
        {
            date: '2016-05-03',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-02',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-04',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-01',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
    ]
}, 100)


let editRowIndex = ref<string>('')

let edit = (scope: any) => {
    console.log(123, scope);
    editRowIndex.value = 'edit'
}

let handleDelete = (scope: any) => {
    console.log(123, scope);
}


let svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
  `


//接收编辑后的编辑按钮
let check = (scope: any) => {
  console.log('父组件的scope',scope);
}
//接收编辑后的关闭按钮
let close = (scope: any) => {
  console.log('父组件的scope',scope);
}
</script>
<template>
    <pro-table :data="tableData" :options="options" elementLoadingText="加载中，等待一下吧……"
        elementLoadingBackground="rgba(0,0,0,.3)" :element-loading-svg="svg"
        element-loading-svg-view-box="-10, -10, 50, 50"   @check="check"  @close="close" editIcon="star">
        <template #date="{scope}">
            <el-icon-timer></el-icon-timer>
            {{scope.row.date}}
        </template>
        <template #name="{scope}">
            <el-icon-timer></el-icon-timer>
            {{scope.row.name}}
        </template>
        <template #action="{scope}">
            <el-button type="primary" @click="edit(scope)">编辑</el-button>
            <el-button type="danger" @click="handleDelete(scope)">删除</el-button>
        </template>
        <!-- 插槽插入到设置图标 -->
        <template #editCell="{scope}">
            <el-button type="primary">确认</el-button>
            <el-button type="danger" >取消</el-button>
        </template>
    </pro-table>
</template>
<style lang="scss" scoped>
svg {
    width: 1.4em;
    height: 1.4em;
    position: relative;
  top: 4px;
 
  cursor: pointer;
}

</style>