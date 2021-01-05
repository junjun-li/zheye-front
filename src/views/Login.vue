<template>
  <div class="layui-container fly-marginTop">
    <div
      class="fly-panel fly-panel-user"
      pad20>
      <div
        class="layui-tab layui-tab-brief"
        lay-filter="user">
        <ul class="layui-tab-title">
          <li class="layui-this">
            <router-link to="/login">登录</router-link>
          </li>
          <li>
            <router-link to="/reg">注册</router-link>
          </li>
        </ul>
        <div
          id="LAY_ucm"
          class="layui-form layui-tab-content"
          style="padding: 20px 0;">
          <!-- // eslint-disable-next-line vue/no-unused-vars -->
          <validation-observer
            ref="observer"
            v-slot="{validate}">
            <div class="layui-tab-item layui-show">
              <div class="layui-form layui-form-pane">
                <form method="post">
                  <validation-provider
                    v-slot="v"
                    name="email"
                    rules="required|email">
                    <div class="layui-form-item">
                      <label
                        class="layui-form-label"
                        for="username">邮箱
                      </label>
                      <div class="layui-input-inline">
                        <input
                          id="username"
                          v-model="username"
                          autocomplete="off"
                          class="layui-input"
                          name="username"
                          placeholder="请输入邮箱"
                          type="text"/>
                      </div>
                    </div>
                    <div class="error-box">
                      <span>{{ v.errors[0] }}</span>
                    </div>
                  </validation-provider>
                  <validation-provider
                    v-slot="v"
                    name="password"
                    rules="required|min:6">
                    <div class="layui-form-item">
                      <label
                        class="layui-form-label"
                        for="password">密码
                      </label>
                      <div class="layui-input-inline">
                        <input
                          id="password"
                          v-model="password"
                          autocomplete="off"
                          class="layui-input"
                          name="password"
                          placeholder="请输入密码"
                          type="password"/>
                      </div>
                    </div>
                    <div class="error-box">
                      <span>{{ v.errors[0] }}</span>
                    </div>
                  </validation-provider>
                  <validation-provider
                    v-slot="v"
                    name="code"
                    rules="required|length:4">
                    <div class="layui-form-item">
                      <div class="layui-row">
                        <label
                          class="layui-form-label"
                          for="code">验证码
                        </label>
                        <div class="layui-input-inline">
                          <input
                            id="code"
                            v-model="code"
                            autocomplete="off"
                            class="layui-input"
                            name="code"
                            placeholder="请输入验证码"
                            type="text"/>
                        </div>
                        <div v-html="svg" @click="_getCaptcha()" />
                      </div>
                    </div>
                    <div class="error-box">
                      <span>{{ v.errors[0] }}</span>
                    </div>
                  </validation-provider>
                  <div class="layui-form-item">
                    <button
                      class="layui-btn"
                      style="margin-right: 20px;"
                      type="button"
                      @click="validate().then(submitLogin)">立即登录
                    </button>
                    <span>
                      <router-link :to="{name: 'forget'}">忘记密码？</router-link>
                    </span>
                  </div>
                  <div class="layui-form-item fly-form-app">
                    <span>或者使用社交账号登入</span>
                    <a
                      class="iconfont icon-qq"
                      href
                      onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})"
                      title="QQ登入"></a>
                    <a
                      class="iconfont icon-weibo"
                      href
                      onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})"
                      title="微博登入"></a>
                  </div>
                </form>
              </div>
            </div>
          </validation-observer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCaptcha } from '@/api/index'
import {
  ValidationObserver,
  ValidationProvider
} from 'vee-validate'
import { v4 as uuid } from 'uuid'

export default {
  name: 'login',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      username: '11776174@qq.com',
      password: '123456',
      code: '',
      svg: '',
      sid: ''
    }
  },
  mounted () {
    // window.vue = this
    // let sid = ''
    // if (localStorage.getItem('sid')) {
    //   sid = localStorage.getItem('sid')
    // } else {
    //   sid = uuid()
    //   localStorage.setItem('sid', sid)
    // }
    // this.sid = sid
    // this.$store.commit('setSid', sid)
    this._getCaptcha()
  },
  methods: {
    _getCaptcha () {
      const sid = this.sid
      this.code = ''
      getCaptcha(sid).then(res => {
        if (res.code === 0) {
          this.svg = res.data.data
          this.code = res.data.text
        }
      })
    },
    async submitLogin () {
      // const isValid = await this.$refs.observer.validate()
      // if (!isValid) {
      //   return
      // }
      // login({
      //   username: this.username,
      //   password: this.password,
      //   code: this.code,
      //   sid: this.sid
      // }).then(res => {
      //   if (res.code === 1) {
      //     this.$alert(res.msg, this._getCode)
      //   } else {
      //     // 存储用户的登录名
      //     res.data.username = this.username
      //     this.$store.commit('setUserInfo', res.data)
      //     this.$store.commit('setToken', res.data.token)
      //     this.$store.commit('setIsLogin', true)
      //     this.$router.push('index')
      //   }
      // })
    }
  }
}
</script>

<style
  lang="scss"
  scoped>
.svg {
  // position: relative;
  // top: -4px;
  height: 38px;
}
.layui-form-item {
  margin-bottom: 0;
}
.error-box {
  height: 20px;
  span {
    color: #c00;
  }
}
</style>
