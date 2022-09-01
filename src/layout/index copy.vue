<script lang="ts" setup>
import Sidebar from "./components/Sidebar/index.vue";
import Header from "./components/Header/index.vue";
import Main from "./components/Main/index.vue";
</script>
<template>
  <div class="layout">
    <div class="sidebar">
      <Sidebar></Sidebar>
    </div>
    <div class="layout-right">
      <Header ref="headerDom"></Header>
      <Main></Main>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.layout {
  display: flex;
  height: 100%;
  overflow: hidden;

  &-right {
    flex: 1;
  }
}
</style>