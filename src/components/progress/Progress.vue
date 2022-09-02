<script lang="ts" setup>
import { onMounted, ref } from "vue";
const props = defineProps({
    percentage: {
        type: Number,
        default: 0,
    },
    isAnimate: {
        type: Boolean,
        default: false,
    },
    time: {
        type: Number,
        default: 3000,
    },
})

let p = ref(0)
onMounted(() => {
    //判断是否需要动画
    if (props.isAnimate) {
        let t = Math.ceil(props.time / props.percentage)
console.log(t );
        let timer = setInterval(() => {
            p.value += 1
            if (p.value >= props.percentage) {
                p.value = props.percentage
                clearInterval(timer)
            }
        }, t)
    } else {
        p.value = props.percentage;
    }
})
</script>
<template>
    <el-progress :percentage="p" v-bind="$attrs" />
</template>
<style lang="scss" scoped>
</style>