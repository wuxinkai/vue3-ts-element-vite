<script lang="ts" setup>

import { ref } from 'vue'
//接口套接口
export interface Data {
    name: string,
    code: string,
}
//接口套接口
export interface Conall {
    province: Data,
    city: Data,
    area: Data,
}

let  datas = ref({})

const getchangeData = (data: Conall) => {
    datas.value=data
}
</script>
<template>
    <pro-choose-area @change="getchangeData"></pro-choose-area>
    <h1 v-if="Object.keys(datas).length">{{datas}}</h1>
</template>
<style lang="scss" scoped>
</style>