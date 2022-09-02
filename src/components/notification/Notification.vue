<script lang="ts" setup>
import { toLine } from '../../utils'
let props = defineProps({
    //图标
    icon: {
        type: String,
        default: 'Bell'
    },
    //显示个数
    value: {
        type: [String, Number],
        default: ''
    },
    //显示最大熟练超过用+号显示
    max: {
        type: Number
    },
    //显示小圆点
    isDot: {
        type: Boolean,
        default: false
    },
})
</script>
<template>

    <el-popover placement="bottom"  :width="300" trigger="click">
        <template #default>
            <slot></slot>
        </template>
        <template #reference>
            <el-badge style="cursor:pointer" :value="value" :max="max" :is-dot="isDot">
                <component :is="`el-icon-${toLine(icon)}`"></component>
            </el-badge>
        </template>
    </el-popover>
</template>
<style lang="scss" scoped>
</style>