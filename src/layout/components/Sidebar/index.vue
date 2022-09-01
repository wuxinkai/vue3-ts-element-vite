<template>
  <Logo></Logo>
  <el-menu :collapse="isCollapse" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
    <el-menu-item :index="''+subindex" v-for="(route,subindex) in routerList" :key="route.path + subindex" @click='clickItem(route)'>
      <el-icon>
        <icon-menu />
      </el-icon>
      <span>{{route?.meta?.title}}</span>
    </el-menu-item>
  </el-menu>
</template>
<script lang="ts" setup>
import {Menu as IconMenu } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
import Logo from "./logo.vue";

const router = useRouter();


let routerList = router.getRoutes();
routerList = routerList.filter((v) => v.redirect !== "index");

const isCollapse = ref(false);

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};


const clickItem = (item: any) => {
  if (item.path) {
    router.push({ path: item.path });
  }
};
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 100vh;
}
</style>
