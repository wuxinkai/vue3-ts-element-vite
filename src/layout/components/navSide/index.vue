<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { ref } from "vue";
const router = useRouter()
const clickRun = (path: string) => {
  router.push({ path });
}
const handleOpen = () => { }
const handleClose = () => { }

const isCollapse = ref(false);

</script>
<template>
  <el-menu default-active="2" :collapse="isCollapse" class="el-menu-vertical-demo" @open="handleOpen"
    @close="handleClose">
    <el-sub-menu index="1">
      <template #title>
        <el-icon-location></el-icon-location>
        <span>有二级菜单</span>
      </template>
      <el-menu-item index="1-1" @click="clickRun('/iconChoose')">弹出组件</el-menu-item>
      <el-menu-item index="1-2" @click="clickRun('/chooseArea')">三级联动组件</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="2">
      <el-icon-menu> </el-icon-menu>
      <span>第一级菜单</span>
    </el-menu-item>
  </el-menu>
</template>
<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>