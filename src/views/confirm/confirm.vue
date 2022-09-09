<script lang="ts" setup>
import { MessageBox } from '../../components/messageBox'

//点击弹窗出提示
const openMessageBox = () => {
    MessageBox({ text: '亲，您是否确认删除商品吗', title: "这个是头部" }).then(() => {
        // 发请求删除商品...
        console.log('发请求删除商品');
    }, () => {
        // 提示信息...
        console.log('取消提示信息...');
    })
}
</script>
<template>
    <el-button @click="openMessageBox">是否删除提示组件</el-button>
</template>
<style lang="less" scoped>

</style>