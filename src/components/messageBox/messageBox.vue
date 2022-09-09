<script lang="ts"  name="Confirm" setup>
import { PropType, ref, onMounted } from 'vue'
const props = defineProps({
  text: {
    type: String,
    default: '默认文本'
  },
  title: {
    type: String,
    default: '温馨提示'
  },
  icon: {
    type: String,
    default: '温馨提示'
  },
  // 点击 确认/提交 后执行 
  confirmCallback: {
    type: Function as PropType<() => void>
  },
  //点击取消执行
  cancelCallback: {
    type: Function as PropType<() => void>
  }
})

//弹出显示隐藏
const show = ref<boolean>(false)

// 实现渐入过渡效果
onMounted(() => {
  setTimeout(() => {
    show.value = true
  }, 20)
})

</script>
<template>
  <div class="pro-confirm" :class="{ fade: show }">
    <div class="wrapper" :class="{ fade: show }">
      <div class="head">
        <p>{{ title }}</p>
        <i class="iconfont icon-guanbi" @click="cancelCallback"></i>
      </div>
      <div class="body">
        <i class="iconfont icon-warning"></i>
        <component :is="`el-icon-exit`"></component>
        <span>{{ text }}</span>
      </div>
      <div class="foot">
        <span class="left" @click="cancelCallback">取消</span>
        <span class="right" @click="confirmCallback">确认</span>
      </div>
    </div>
  </div>
</template>
<style lang="scss"  scoped>
$proColor: #27ba9b;

.pro-confirm {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 8888;
  background: rgba(0, 0, 0, 0);

  &.fade {
    // 过渡效果
    transition: all 0.4s;
    background: rgba(0, 0, 0, 0.5);
  }
}

.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 420px;
  height: 164px;
  padding: 15px;
  border-radius: 4px;
  background: #fff;
  opacity: 0;

  &.fade {
    // 过渡效果
    transition: all 0.4s;
    transform: translate(-60%, -50%); // 由右往左渐入效果
    opacity: 1;

  }

  >.head {
    display: flex;
    align-items: center;
    justify-content: space-between;

    >.iconfont {
      cursor: pointer;
    }

    >p {
      font-size: 18px;
    }
  }

  >.body {
    margin-left: 30px;

    .icon-warning {
      margin-right: 6px;
      color: #cf4444;
    }
  }

  .foot {
    display: flex;
    justify-content: flex-end;

    >span {
      display: block;
      padding: 6px 15px;
      color: #fff;
      border-radius: 4px;
      cursor: pointer;

      &.left {
        border-color: #ccc;
        background: #ccc;
      }

      &.right {
        margin-left: 15px;
        border-color: $proColor;
        background: $proColor;
      }
    }
  }
}
</style>