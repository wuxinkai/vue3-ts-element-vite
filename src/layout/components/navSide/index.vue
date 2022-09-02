
<script lang="ts" setup>
import { ref } from "vue";
let data1 = [
  {
    a: "有二级菜单",
    b: "xxx",
    c: "Document",
    xxxx: [
      {
        a: "弹出组件",
        b: "/iconChoose",
        c: "Female",
      },
      {
        a: "三级联动组件",
        b: "/chooseArea",
        c: "Male",
      },
      {
        a: "趋势标记",
        b: "/trentViews",
        c: "Pointer",
      },
      {
        a: "tabs切换",
        b: "/notification",
        c: "Star",
      },
      {
        a: "菜单组件",
        b: "/menu",
        c: "PieChart",
      },
      {
        a: "进度条",
        b: "/progress",
        c: "PieChart",
      }
    ],
  },
];

const opends = ref(["xxx"])

</script>
<template>
  <!-- 增加router模式 -->
  <!-- 
    修改字段属性可以任何属性传进来
    name="a" 
    index="b" 
    icon="c"
   -->
  <pro-menu :data="data1" name="a" index="b" icon="c" children="xxxx" :defaultActive="$route.path"
    :default-openeds="opends" text-color="green" router active-text-color="red" background-color="#ccc">
  </pro-menu>
</template>
<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>