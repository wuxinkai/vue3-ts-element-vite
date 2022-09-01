<script lang="ts" setup>
let props = defineProps<{
    collapse: boolean
}>()

//切换图标
let emits = defineEmits(['update:collapse'])
const toggle = () => {
    emits('update:collapse', !props.collapse)
}

</script>
<template>
    <div class="header">
        <span @click="toggle">
            <el-icon-expand v-if="collapse"></el-icon-expand>
            <el-icon-fold v-else></el-icon-fold>
        </span>
    </div>
</template>
<style lang="scss" scoped>
.header {
    height: 60px;
    padding: 0  20px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #dcdfe6 ;
}
</style>