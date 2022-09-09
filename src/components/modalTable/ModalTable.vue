<script lang="ts" setup>
import { ref, watch, PropType } from 'vue'
import { TableOptions } from '../../components/table/type'
let props = defineProps({
    visible: {
        type: Boolean,
        default: false
    },
    options: {
        type: Array as PropType<TableOptions[]>,
        required: true
    },
    tableData: {
        type: Array as PropType<any[]>,
        required: true
    },
})

//
let tableDom = ref()

//拷贝与i分自己页面用不去修改父页面值
let dialogVisible = ref<boolean>(props.visible)

//双向数据绑定
let emits = defineEmits(['update:visible'])

watch(() => props.visible, val => {
    dialogVisible.value = val
})

watch(() => dialogVisible.value, val => {
    emits('update:visible', val)
})




</script>
<template>
    <el-dialog v-model="dialogVisible" v-bind="$attrs">
        <template #default>
            <pro-table ref="tableDom" :data="tableData" :options="options">
                <template #action>
                
                    <slot name="action" :data="tableDom"></slot>
                </template>
            </pro-table>
        </template>
        <!-- 弹窗插槽 -->
        <template #footer>
            <!--  组件插槽 -->
            <slot name="footer" :form="tableDom"></slot>
        </template>
    </el-dialog>
</template>
<style lang="scss" scoped>

</style>