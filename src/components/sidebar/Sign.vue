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
        <cite>{{ count }}</cite>天
      </span>
    </div>
    <div class="fly-panel-main fly-signin-main">
      <template v-if="!isSign">
        <button
          id="LAY_signin"
          class="layui-btn layui-btn-danger"
          @click="_userSign()">今日签到
        </button>
        <span>
        可获得
        <cite>{{ integral }}</cite>飞吻
      </span>
      </template>

      <!-- 已签到状态 -->
      <template v-else>
        <button class="layui-btn layui-btn-disabled">{{ msg }}</button>
        <span>获得了<cite>{{ integral }}</cite>飞吻</span>
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
import { userSign } from '@/api'
import { mapState } from 'vuex'
import moment from 'moment'

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
    const isSign = this.userInfo.isSign
    const lastSign = this.userInfo.lastSign
    const nowDate = moment().format('YYYY-MM-DD')
    const lastDate = moment(lastSign).format('YYYY-MM-DD')
    const diff = moment(nowDate).diff(moment(lastDate))
    // 如果过了12点 签到的状态要重新赋值 变成未签到
    if (diff > 0 && isSign) {
      this.isSign = false
    } else {
      this.isSign = isSign
      // 如果今天签到了 计算距离下一次签到的时差
      if (diff === 0 && isSign) {
        this.nextSign()
      } else {
        this.msg = '今日已签到'
      }
    }
  },
  computed: {
    ...mapState(['isLogin', 'userInfo']),
    count: {
      get: function () {
        if (this.userInfo && this.userInfo.count) {
          return this.userInfo.count
        } else {
          return 0
        }
      },
      set: function (v) {
      }
    },
    integral: {
      get: function () {
        const count = parseInt(this.count)
        let result = 0
        if (count < 5) {
          result = 5
        } else if (count >= 5 && count < 15) {
          result = 10
        } else if (count >= 15 && count < 30) {
          result = 15
        } else if (count >= 30 && count < 100) {
          result = 20
        } else if (count >= 100 && count < 365) {
          result = 30
        } else if (count >= 365) {
          result = 50
        }
        return result
      },
      set: function (v) {
      }
    }
  },
  methods: {
    nextSign () {
      // 获取今天 +1 天的时间
      const newDate = moment().add(1, 'day').format('YYYY-MM-DD')
      // 获取现在的时间距离 今天 +1 的秒数
      let seconds = moment(newDate + ' 00:00:00').diff(moment(), 'second')

      let hour = Math.floor(seconds / 3600)
      let min = Math.floor(seconds % 3600 / 60)
      let second = seconds % 60
      this.msg = `签到倒计时 ${hour}:${min < 10 ? '0' + min : min}:${second < 10 ? '0' + second : second}`

      this.timeId = setInterval(() => {
        seconds = moment(newDate + ' 00:00:00').diff(moment(), 'second')
        // 测试用
        // seconds = moment(newDate).diff(moment(), 'second')
        hour = Math.floor(seconds / 3600)
        min = Math.floor(seconds % 3600 / 60)
        second = seconds % 60
        this.msg = `签到倒计时 ${hour}:${min < 10 ? '0' + min : min}:${second < 10 ? '0' + second : second}`
        if (seconds <= 0) {
          clearInterval(this.timeId)
          this.isSign = false
          const user = {
            ...this.$store.state.userInfo
          }
          user.isSign = false
          this.$store.commit('setUserInfo', user)
        }
      }, 1000)
    },
    async _userSign () {
      if (!this.isLogin) {
        this.$pop('shake', '请先登录')
        await this.$router.push({
          path: '/login'
        })
        return
      }
      const res = await userSign()
      const user = {
        ...this.userInfo
      }
      if (res.code === 0) {
        this.$pop('', '签到成功！')
        user.integral = res.data.integral
        user.count = res.data.count
      } else {
        // 用户已经签到
        this.$pop('', '您今日已经签到！')
      }
      user.isSign = true
      user.lastSign = res.lastSign
      // 页面的签到按钮
      this.isSign = true
      this.$store.commit('setUserInfo', user)
    },
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
  },
  watch: {
    userInfo: {
      handler: function (newVal, oldVal) {
        this.integral = newVal.integral
        this.count = newVal.count
      },
      deep: true
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
