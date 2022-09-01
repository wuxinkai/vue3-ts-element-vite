<template>
  <div class="app-main">
    <router-view class="app-container" v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="state.includeList">
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts" setup>
import { reactive, watch } from "vue";
import { useRoute } from 'vue-router'
const route = useRoute()

const state = reactive({
  includeList: []
})
watch(() => route, (newVal) => {
  if (newVal.meta.keepAlive && state.includeList.indexOf(newVal.name) === -1) {
    state.includeList.push(newVal.name);
    console.log(state.includeList);
  }
}, { deep: true }) // 开启深度监听

</script>

<style lang="scss" scoped>
.app-main {
  height: calc(100vh - 0px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header+.app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    height: calc(100vh - 0px);
  }

  .fixed-header+.app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 0px;
  }
}
</style>
