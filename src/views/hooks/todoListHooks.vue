<template>
    <div>
        <div class="add-box">
            <el-input v-model="data.addList.title" class="input-st"></el-input>
            <el-button type="primary" class="btnst" @click="addFn">添加1</el-button>
        </div>
        <div>
            <el-table :data="data.list">
                <el-table-column prop="id" label="id"></el-table-column>
                <el-table-column prop="title" label="标题"></el-table-column>
                <el-table-column prop="type" label="状态"></el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script lang="ts" setup>
import {onUnmounted } from "vue";
import todoList from './todoList'
//通过函数导出,在页面中使用
let { data, addFn,clearData } = todoList()

//离开页面前
onUnmounted(() => {
    clearData()
})
</script>
<style lang="scss" scoped>
.add-box {
    display: flex;
    padding: 16px;

    .input-st {
        width: 200px;
    }

    .btnst {
        margin-left: 16px;
    }
}


</style>