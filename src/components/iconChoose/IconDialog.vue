<script lang="ts" setup>
/**
 * 选择图标
 * 
 * **/
import { ref, watch } from "vue";
import * as ElIcons from '@element-plus/icons-vue'
import { toLine, useCopy } from '../../utils'
let props = defineProps<{
    title: string, //标题
    visible: boolean //弹出
}>()

let emits = defineEmits(['update:visible'])

//拷贝一份父组件传递给visible
let dialogVisible = ref<boolean>(props.visible)

const handleClick = () => {
    emits('update:visible', !props.visible)
}

//改变了子组件的属性
watch(() => props.visible, val => {
    dialogVisible.value = val
})

//通过子组件改变父组件的v-modal属性
watch(() => dialogVisible.value, val => {
    emits('update:visible', val)
})


//点击赋值图标
const clickItem = (item: string) => {
    let text1 = `el-icon-${toLine(item)}`
    // let text2 = `<el-icon-${toLine(item)} />`
    useCopy(text1)
    dialogVisible.value = false
}
</script>
<template>
    <!-- 按钮 -->
    <el-button @click="handleClick">
        <slot></slot>
    </el-button>
    <!-- 弹出窗 -->
    <div class="pro-choose-icon-dialog-body">
        <el-dialog :title="title" v-model="dialogVisible">
            <div class="container">
                <div class="item" v-for="(item, index) in Object.keys(ElIcons)" @click="clickItem(item)">
                    <div class="text">
                        <component :is="`el-icon-${toLine(item)}`"></component>
                    </div>
                    <div class="icon">{{ item }}</div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<style lang="scss" scoped>
.container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    .icon {
        font-size: 14px;
    }

    .item {
        width: 20%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 15px;

        svg {
            width: 2em;
            height: 2em;
        }
    }
}
</style>