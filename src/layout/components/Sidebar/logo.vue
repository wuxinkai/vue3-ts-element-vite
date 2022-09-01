<template>
  <div class="sidebar-logo-container">
    <transition name="sidebarLogoFade">
      <router-link key="collapse" class="sidebar-logo-link" to="/">
        <img src="http://oss.admin.gumingchen.icu/file/88c34cda-53bb-41f3-983d-dfbd45f5bcf6.png" class="sidebar-logo" />
        <h1>SVN管理</h1>
      </router-link>
    </transition>
  </div>
</template>

<script setup lang='ts'>
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 60px;
  line-height: 60px;
  padding: 0 20px;
  overflow: hidden;
  border-bottom: 1px solid #dcdfe6;
  & .sidebar-logo-link {
    height: 100%;
    width: 100%;
    display: flex;
    h1 {
      font-size: 20px;
      font-weight: bold;
    }

    & .sidebar-logo {
      width: 50px;
      height: auto;
      vertical-align: middle;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
