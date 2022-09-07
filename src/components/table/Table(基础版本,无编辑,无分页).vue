<script lang="ts" setup>
import { PropType, computed, ref } from 'vue'
import { TableOptions } from './type'
let props = defineProps({
    options: {
        type: Array as PropType<TableOptions[]>,
        required: true
    },
    data: {
        type: Array as PropType<any[]>,
        required: true
    },
    //-------------- 加载文案 ----------------------------
    elementLoadingText: {
        type: String,
    },
    // 加载图标名
    elementLoadingSpinner: {
        type: String,
    },
    // 加载背景颜色
    elementLoadingBackground: {
        type: String,
    },
    // 加载图标是svg
    elementLoadingSvg: {
        type: String
    },
    // 加载svg的配置
    elementLoadingSvgViewBox: {
        type: String,
    },
})

//不是操作列的
let tableOptions = computed(() => props.options.filter(item => !item.action))

//过滤出操作列
let actionOptions = computed(() => props.options.find(item => item.action))
console.log(1111, actionOptions);


//表格加载
let isLoading = computed(() => !props.data || !props.data.length)
</script>
<template>
    <el-table :data="data" v-bind="$attrs" v-loading="isLoading" :element-loading-text="elementLoadingText"
        :element-loading-spinner="elementLoadingSpinner" :element-loading-background="elementLoadingBackground"
        :element-loading-svg="elementLoadingSvg" :element-loading-svg-view-box="elementLoadingSvgViewBox">
        <template v-for="(item, index) in tableOptions" :key="index">
            <!-- v-if="!item.slot" 没有插槽的 -->
            <el-table-column v-if="!item.slot" :label="item.label" :prop="item.prop" :align="item.align"
                :width="item.width">
            </el-table-column>
            <!-- 有插槽的 -->
            <el-table-column v-else :label="item.label" :prop="item.prop" :align="item.align" :width="item.width">
                <template #default="scope">
                    <slot :name="item.slot" :scope="scope"></slot>
                </template>
            </el-table-column>
        </template>
        <el-table-column :label="actionOptions!.label" :prop="actionOptions!.prop" :align="actionOptions!.align"
            :width="actionOptions!.width">
            <template #default="scope">
                <slot name="action" :scope="scope"></slot>
            </template>
        </el-table-column>
    </el-table>
</template>
<style lang="scss" scoped>
</style>