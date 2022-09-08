<script lang="ts" setup>
import { computed, useSlots } from 'vue'
import { toLine } from '../../utils'
let props = defineProps({
    //标记当前趋势是上升（up）还是下降（down）
    type: {
        type: String,
        default: 'up'
    },
    //趋势文字 1 是插槽 2 父组件传递
    text: {
        type: String,
        default: '文字'
    },
    //图标
    upIconColor: {
        type: String,
        default: '#f5222d'
    },
    //图标
    downIconColor: {
        type: String,
        default: '#52c41a'
    },
    //文字颜色
    upTextColor: {
        type: String,
        default: 'green'
    },
    //文字颜色
    downTextColor: {
        type: String,
        default: 'pink'
    },
    //自定义图标
    upIcon: {
        type: String,
        default: 'ArrowUp'
    },
    downIcon: {
        type: String,
        default: 'ArrowDown'
    }
})

//插槽
let slots = useSlots()


//设置文字颜色
let textColor = computed(() => {
    return props.type == 'up' ? props.upTextColor : props.downTextColor
})

//替换图标

</script>
<template>
    <div class="trend">
        <!-- 插槽和父传值只能有一个  插槽的技巧slots.default 二选一-->
        <div class="text" :style="{ color: textColor }">
            <slot v-if="slots.default"></slot>
            <div v-else>{{ text }}</div>
        </div>
        <div class="icon">
            <!-- <el-icon-arrowup :style="{ color: upIconColor }" v-if="type === 'up'"></el-icon-arrowup>
            <el-icon-arrowdown :style="{ color: downIconColor }" v-else></el-icon-arrowdown> -->
            <component :is="`el-icon-${toLine(upIcon)}`" :style="{ color: upIconColor }" v-if="type === 'up'">
            </component>
            <component :is="`el-icon-${toLine(downIcon)}`" :style="{ color: downIconColor }" v-else></component>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.trend {
    display: flex;
    align-items: center;

    .icon {
        display: flex;
        align-items: center;
        margin-left: 6px;
    }
}
svg{
    width: 1em;
    height: 1em;
}
</style>