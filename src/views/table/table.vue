<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { TableOptions } from '../../components/table/type'
import axios from 'axios'
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
        prop: 'action',
        action: true
    }
]

//定义数据接口
interface TableData {
    date: string,
    name: string,
    address: string,
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
    console.log('父组件的scope', scope);
}
//接收编辑后的关闭按钮
let close = (scope: any) => {
    console.log('父组件的scope', scope);
}

// 行编辑专用
let editRowIndex = ref<string>('')

// 点击一行做标识，在点击列的时候做判断用
let edit = (scope: any) => {

    editRowIndex.value = 'edit'
}

let handleDelete = (scope: any) => {

    // editRowIndex.value = 'delete'
}

// 分页
onMounted(() => {
    getData()
})

//初始化数据名称
let tableData = ref<TableData[]>([])

let current = ref<number>(1)
let pageSize = ref<number>(3)
let total = ref<number>(0)

let getData = () => {
    axios.post('/api/list', {
        current: current.value,
        pageSize: pageSize.value
    }).then((res: any) => {
        total.value = res.data.data.total
        tableData.value = res.data.data.rows
        console.log(res.data);
    })
}
//分页设置
let sizeChange = (val: number) => {
    pageSize.value = val
    getData()
}
let currentChange = (val: number) => {
    current.value = val
    getData()
}

</script>
<template>
    <pro-table :data="tableData" isEditRow :options="options" elementLoadingText="加载中，等待一下吧……"
        elementLoadingBackground="rgba(0,0,0,.3)" :element-loading-svg="svg"
        element-loading-svg-view-box="-10, -10, 50, 50" @check="check" @close="close" editIcon="star"
        v-model:editRowIndex="editRowIndex" pagination paginationAlign="center" :total="total" :currentPage="current"
        :pageSize="pageSize"  @sizeChange="sizeChange" @currentChange="currentChange">
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
        <!-- 编辑行专用插槽 -->
        <template #editRow="{scope}">
            <el-button type="primary">确认1</el-button>
            <el-button type="danger">取消1</el-button>
        </template>

        <!-- 插槽插入到设置图标 -->
        <template #editCell="{scope}">
            <el-button type="primary">确认2</el-button>
            <el-button type="danger">取消2</el-button>
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