<template>
  <div class="fly-panel fly-signin">
    <div class="fly-panel-title">
      签到
      <i class="fly-mid"></i>
      <a
        id="LAY_signinHelp"
        class="fly-link"
        href="javascript:;"
        @click="showInfo()">说明
      </a>
      <i class="fly-mid"></i>
      <a
        id="LAY_signinTop"
        class="fly-link"
        href="javascript:;"
        @click="showTop()">
        活跃榜
        <span class="layui-badge-dot"></span>
      </a>
      <span
        v-show="isSign || isLogin"
        class="fly-signin-days">
        已连续签到
        <cite>10</cite>天
      </span>
    </div>
    <div class="fly-panel-main fly-signin-main">
      <template v-if="!isSign">
        <button
          id="LAY_signin"
          class="layui-btn layui-btn-danger">今日签到
        </button>
        <span>
        可获得
        <cite>5</cite>飞吻
      </span>
      </template>

      <!-- 已签到状态 -->
      <template v-else>
        <button class="layui-btn layui-btn-disabled">{{ msg }}</button>
        <span>获得了<cite>10</cite>飞吻</span>
      </template>
    </div>
    <sign-info
      :isShow="isShow"
      @closeModal="close()"></sign-info>
    <sign-list
      :isShow="showList"
      @closeModal="close()"></sign-list>
  </div>
</template>

<script>
import SignInfo from './SignInfo'
import SignList from './SignList'
import { mapState } from 'vuex'

export default {
  name: 'sign',
  components: {
    SignInfo,
    SignList
  },
  data () {
    return {
      isShow: false,
      showList: false,
      current: 0,
      isSign: false, // 是否签到
      timeId: '',
      msg: ''
    }
  },
  mounted () {
  },
  computed: {
    ...mapState(['isLogin', 'userInfo'])
  },
  methods: {
    showInfo () {
      this.isShow = true
    },
    showTop () {
      this.showList = true
    },
    close () {
      this.isShow = false
      this.showList = false
    },
    choose (val) {
      this.current = val
    }
  }
}
</script>
<style lang="scss">
@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}
.mask {
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 20000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.layui-layer {
  position: fixed;
  width: 300px;
  height: 480px;
  top: 50%;
  left: 50%;
  margin-top: -240px;
  margin-left: -150px;
  background: #fff;
  z-index: 21000;
  &.active {
    animation-fill-mode: both;
    animation-duration: 0.2s;
    animation-name: bounceIn;
  }
  .layui-layer-title {
    height: 42px;
    line-height: 42px;
    padding: 0 20px;
    color: #333;
    background-color: #f8f8f8;
  }
  .layui-layer-content {
    padding: 20px;
  }
  .layui-tab-content {
    padding: 0 10px;
  }
  .layui-tab-item {
    line-height: 45px;
    li {
      border-bottom: 1px dotted #dcdcdc;
      &:last-child {
        border-bottom: none;
      }
    }
    img {
      width: 30px;
      height: 30px;
      border-radius: 2px;
    }
  }
}
</style>
