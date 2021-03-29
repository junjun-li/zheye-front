<template>
  <div class="fly-header layui-bg-black">
    <div class="layui-container">
      <a
        class="fly-logo"
        href="/">
        <img
          alt="layui"
          src="@/assets/img/logo-2.png"/>
      </a>
      <ul class="layui-nav fly-nav layui-hide-xs">
        <li class="layui-nav-item layui-this">
          <a href="/">
            <i class="iconfont icon-jiaoliu"></i>
            交流
          </a>
        </li>
        <li class="layui-nav-item">
          <a href="case/case.html">
            <i class="iconfont icon-iconmingxinganli"></i>
            案例
          </a>
        </li>
        <li class="layui-nav-item">
          <a
            href="http://www.layui.com/"
            target="_blank">
            <i class="iconfont icon-ui"></i>
            框架
          </a>
        </li>
      </ul>

      <ul class="layui-nav fly-nav-user">
        <!-- 未登入的状态 -->
        <template v-if="!isShow">
          <li class="layui-nav-item">
            <a
              class="iconfont icon-touxiang layui-hide-xs"
              href="../user/login.html"></a>
          </li>
          <li class="layui-nav-item">
            <router-link :to="{name: 'login'}">登入</router-link>
          </li>
          <li class="layui-nav-item">
            <router-link :to="{name: 'reg'}">注册</router-link>
          </li>
          <li class="layui-nav-item layui-hide-xs">
            <a
              class="iconfont icon-qq"
              href
              onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})"
              title="QQ登入"></a>
          </li>
          <li class="layui-nav-item layui-hide-xs">
            <a
              class="iconfont icon-weibo"
              href
              onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})"
              title="微博登入"></a>
          </li>
        </template>

        <!-- 登入后的状态 -->
        <template v-else>
          <!-- 调整了Hover的区域 -->
          <li
            class="layui-nav-item"
            @mouseleave="hide()"
            @mouseover="show()">
            <a
              class="fly-nav-avatar"
              href="javascript:;">
              <cite class="layui-hide-xs">{{ userInfo.name }}</cite>
              <!-- <i class="iconfont icon-renzheng layui-hide-xs" title="认证信息：layui 作者"></i> -->
              <i
                v-show="userInfo.isVip !== '0'"
                class="layui-badge fly-badge-vip layui-hide-xs">VIP{{ userInfo.isVip }}
              </i>
              <img :src="pic"/>
              <!--<img :src="`/img/${userInfo.pic}`"/>-->
              <!--http://localhost:3000/img/1587000589108.png-->
            </a>
            <dl
              :class="{'layui-show': isHover}"
              class="layui-nav-child layui-anim layui-anim-upbit">
              <dd>
                <router-link to="/center/set">
                  <i class="layui-icon">&#xe620;</i>
                  基本设置
                </router-link>
              </dd>
              <dd>
                <a href="user/message.html">
                  <i
                    class="iconfont icon-tongzhi"
                    style="top: 4px;"></i>
                  我的消息
                </a>
              </dd>
              <dd>
                <a href="user/home.html">
                  <i
                    class="layui-icon"
                    style="margin-left: 2px; font-size: 22px;">&#xe68e;
                  </i>
                  我的主页
                </a>
              </dd>
              <hr style="margin: 5px 0;"/>
              <dd>
                <a
                  href="javascript:void(0)"
                  style="text-align: center;"
                  @click="logout">退出
                </a>
              </dd>
            </dl>
          </li>
          <div
            v-show="num.message && num.message !== 0"
            class="fly-nav-msg">
            {{ num.message }}
          </div>
          <transition name="fade">
            <div
              v-show="hasMsg"
              class="layui-layer-tips">
              <div class="layui-layer-content">
                您有{{ num.message }}条未读消息
                <i class="layui-layer-TipsG layui-layer-TipsB"></i>
              </div>
            </div>
          </transition>
        </template>
      </ul>
    </div>

  </div>
</template>

<script>
import store from '@/store'
import {
  mapGetters,
  mapState
} from 'vuex'

export default {
  name: 'Header',
  data () {
    return {
      isHover: false,
      hoverCtrl: {},
      hasMsg: false
      // @/assets/img/avatar.jpeg
      // pic: (this.$store.state.userInfo && this.$store.state.userInfo.pic)
      //   ? baseUrl + this.$store.state.userInfo.pic
      //   : '/img/bear-200-200.jpg'
    }
  },
  computed: {
    ...mapState(['num']),
    isShow () {
      return this.$store.state.isLogin
      // return false
    },
    userInfo () {
      return (
        this.$store.state.userInfo || {
          name: '',
          pic: '',
          isVip: '0'
        }
      )
    },
    ...mapGetters(['pic'])
  },
  methods: {
    logout () {
      this.$confirm('确定退出吗?', () => {
        localStorage.clear()
        this.$store.commit('setToken', '')
        this.$store.commit('setUserInfo', '')
        this.$store.commit('setIsLogin', false)
        // 解决重复push同一个导航路由的报错
        this.$router.push('/index', () => {})
      }, () => {})
    },
    show () {
      // 当用户的鼠标移入头像的时候，去显示操作菜单
      clearTimeout(this.hoverCtrl)
      this.hoverCtrl = setTimeout(() => {
        this.isHover = true
      }, 200)
    },
    hide () {
      // 当用户的鼠标移出头像的时候，去隐藏操作菜单
      clearTimeout(this.hoverCtrl)
      this.hoverCtrl = setTimeout(() => {
        this.isHover = false
      }, 500)
    }
  },
  watch: {
    num (newVal, oldVal) {
      console.log(newVal)
      if (newVal.event && newVal !== oldVal) {
        this.hasMsg = true
        setTimeout(() => {
          this.hasMsg = false
        }, 2000)
      }
    }
  }
}
</script>

<style
  lang="scss"
  scoped>
.fly-logo {
  left: -15px;
  top: -10px;
  margin-left: 15px;
}

.fly-nav-msg {
  top: 33px;
  .layui-layer-tips {
    position: absolute;
    white-space: nowrap;
    left: -8px;
    top: 30px;
    z-index: 2000;
  }
}

.layui-layer-content {
  left: -30px;
}
</style>
