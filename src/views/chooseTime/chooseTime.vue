<script lang="ts" setup>
const startChange = (val: string) => {
    console.log(val);
    debugger
}
const endChange = (obj: Object) => {
    console.log(obj);
    debugger
}


//日期
const startChangeDate = (val: string) => {
    console.log(val);
    debugger
}
const endChangeDate = (obj: Object) => {
    console.log(obj);
    debugger
}

//单独设置结束样式
let endOptions = {
    size: 'large',
    clearable: false
}
//单独设置开始样式
let startOptions = {
    size: 'small',
    clearable: true
}
</script>
<template>
    <pro-choose-time @startChange="startChange" @endChange="endChange"></pro-choose-time>
    <br>
    <br>
    <br>
    <br>
    <pro-choose-date :disableToday="true" :endOptions="endOptions"  :startOptions="startOptions" @startChangeDate="startChangeDate"
        @endChangeDate="endChangeDate"></pro-choose-date>
</template>
<style lang="less" scoped>
</style>