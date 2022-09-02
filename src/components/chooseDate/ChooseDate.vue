<script lang="ts" setup>
import { ref, watch } from "vue";
let props = defineProps({
    // 开始日期的占位符
    startPlaceholder: {
        type: String,
        default: "请选择开始日期",
    },
    // 结束日期的占位符
    endPlaceholder: {
        type: String,
        default: "请选择结束日期",
    },
    // 是否禁用选择今天之前的日期
    disableToday: {
        type: Boolean,
        default: true,
    },
})

//开始时间
const startDate = ref<Date | null>(null)
//结束时间
const endDate = ref<Date | null>(null)

const endDateDisabled = ref<Boolean>(true)

let emits = defineEmits(["startChangeDate", "endChangeDate"]);

// 开始日期禁用
const startDisabledDate = (time: Date) => {
    //今天之前的被禁用
    if (props.disableToday) return time.getTime() < Date.now() - 1000 * 60 * 60 * 24;
}
// 禁用结束日期的函数 ,不能选择小于开始日期的时间
const endDisabledDate = (time: Date) => {
    if (startDate.value) {
        //加上一天，不能选择，开始日期选择的当天
        return time.getTime() < startDate.value.getTime() + 1000 * 60 * 60 * 24;
    }
}

//监听开始时间
watch(() => startDate.value, val => {
    //控制结束日期是否能选择
    if (!val) {
        endDateDisabled.value = true
        endDate.value = null
    } else {
        endDateDisabled.value = false
        emits('startChangeDate', val)
    }
})

//结束日期监听
watch(() => endDate.value, val => {
    if (val) {
        emits('endChangeDate', {
            startDate: startDate.value,
            endDate: endDate.value,
        })
    }
})
</script>

<template>
    <div>
        <el-date-picker v-model="startDate" type="date" :placeholder="startPlaceholder"
            :disabledDate="startDisabledDate" v-bind="$attrs.startOptions"></el-date-picker>

        <el-date-picker v-model="endDate" type="date" :placeholder="endPlaceholder" :disabled="endDateDisabled"
            :disabledDate="endDisabledDate" v-bind="$attrs.endOptions"></el-date-picker>
    </div>
</template>
<style lang="scss" scoped>
</style>