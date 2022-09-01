<script lang="ts" setup>
import navHeader from './components/navHeader/index.vue'
import navSide from './components/navSide/index.vue'
/*
:collapse="isCollapse" 折叠按钮
default-active="2"  选中哪一个

*/


import { ref } from 'vue'

let isCollapse = ref(false)


</script>
<template>
  <el-container>
    <el-aside width="auto">
      <nav-side v-model:collapse="isCollapse"></nav-side>
    </el-aside>
    <el-container>
      <el-header>
        <nav-header v-model:collapse="isCollapse"></nav-header>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<style lang="scss" scoped>
.el-header {
  padding: 0;
}
</style>