<script lang="ts" setup>
import { ref, watch, PropType } from 'vue'
import { FormOptions } from '../../components/from/types/type'
let props = defineProps({
    visible: {
        type: Boolean,
        default: false
    },
    // 表单的配置项
    options: {
        type: Array as PropType<FormOptions[]>,
        required: true
    },
    isScroll: {
        type: Boolean,
        default: false
    },
    // 下面方法对应为处理上传事件
    onChange: {
        type: Function
    },
    beforeUpload: {
        type: Function
    },
    onPreview: {
        type: Function
    },
    onRemove: {
        type: Function
    },
    beforeRemove: {
        type: Function
    },
    onSuccess: {
        type: Function
    },
    onExceed: {
        type: Function
    },
})


//弹出框的显示和隐藏
let dialogVisible = ref<boolean>(props.visible)

//双向数据绑定
let emits = defineEmits(['update:visible'])

watch(() => props.visible, val => {
    dialogVisible.value = val
})

watch(() => dialogVisible.value, val => {
    emits('update:visible', val)
})


//作用域插槽传参
let formDom = ref()

</script>
<template>
    <!-- <div :class="{ 'pro-choose-icon-dialog-body-height': isScroll }"> -->
    <div :class="{ 'pro-choose-icon-dialog-body': isScroll }">
        <el-dialog v-model="dialogVisible" v-bind="$attrs">
            <!-- 表单内容 -->
            <template #default>
                <pro-form isScroll :options="options" ref="formDom" label-width="80px" @on-change="onChange"
                    @before-upload="beforeUpload" @on-preview="onPreview" @on-remove="onRemove"
                    @before-remove="beforeRemove" @on-success="onSuccess" @on-exceed="onExceed">
                    <template #uploadArea>
                        <slot name="uploadArea"></slot>
                    </template>
                    <template #uploadTip>
                        <slot name="uploadTip"></slot>
                    </template>
                </pro-form>
            </template>
            <!-- 弹窗插槽 -->
            <template #footer>
                <!--  组件插槽 -->
                <slot name="footer" :form="formDom"></slot>
            </template>
        </el-dialog>
    </div>

</template>
<style lang="scss" scoped>
</style>