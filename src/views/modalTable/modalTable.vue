<script lang="ts" setup>
import { ref } from 'vue'
import { TableOptions } from '../../components/table/type'
import axios from 'axios'
import { de } from 'node_modules/element-plus/es/locale'
// ------------------弹窗部分 -----------------------------
let visible = ref<boolean>(false)
let open = () => {
    getData()
    visible.value = true
}
//弹窗取消
let Cancel = () => {
    visible.value = false
}

//弹窗确认
let Confirm = () => {
    debugger
    // visible.value = false
}

// ------------------表格数据 -----------------------------


//定义数据接口
interface TableData {
    date: string,
    name: string,
    address: string,
}



let current = ref<number>(1)
let pageSize = ref<number>(3)
let total = ref<number>(0)
let tableData = ref<TableData[]>([])
let getData = () => {
    axios.post('/api/list', { current: current.value, pageSize: pageSize.value }).then((res: any) => {
        total.value = res.data.data.total
        tableData.value = res.data.data.rows
    })
}



// 表头
let options: TableOptions[] = [
    {
        label: '日期',
        prop: 'date',
        align: 'center',

        editable: true//是否可以编辑
    },
    {
        label: '姓名',
        prop: 'name',
        align: 'center',

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

const handleEdit = (row: any) => {



}
const handleDelete = (data: any) => {
    console.log(data);
    debugger
}
</script>
<template>
    <el-button type="primary" @click='open'>打开弹出</el-button>
    <pro-modal-table title="编辑" :isScroll="true" v-model:visible="visible" :tableData="tableData" :options="options">
        <template #action="{ data }">
            <el-icon-edit @click="handleEdit(data)"></el-icon-edit>
            <el-icon-delete @click="handleDelete(data)"></el-icon-delete>
        </template>
        <template #footer="{ form }">
            <span class="dialog-footer">
                <el-button @click="Cancel">取 消</el-button>
                <el-button type="primary" @click="Confirm(form)">确 认</el-button>
            </span>
        </template>
    </pro-modal-table>
</template>
<style lang="scss" scoped>
svg {
    width: 1.6em;
    height: 1.6em;
}
</style>