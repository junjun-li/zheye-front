<template>
  <div id="app">
    <imooc-header></imooc-header>
    <router-view></router-view>
    <imooc-footer></imooc-footer>
  </div>
</template>
<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'app',
  components: {
    'imooc-header': Header,
    'imooc-footer': Footer
  }
}
</script>

<style lang="scss">
@import "assets/css/global.css";
@import "assets/css/layui-layer/layer.css";
// 公用样式
.svg {
  position: relative;
  top: -4px;
}
.d-flex {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  &.flex-start {
    justify-content: flex-start;
  }
  &.flex-end {
    justify-content: flex-end;
  }
  &.flex-center {
    justify-content: center;
  }
}
</style>
