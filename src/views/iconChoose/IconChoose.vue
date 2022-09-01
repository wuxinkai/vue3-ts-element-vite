<script lang="ts" setup>


import {ref} from 'vue'

let visible =ref<Boolean>(false)

</script>
<template>
    <!-- 按钮 -->
    <pro-icon-dialog title="选中图标" v-model:visible="visible">
        请选择图标
    </pro-icon-dialog>
</template>
<style lang="scss" scoped>
</style>