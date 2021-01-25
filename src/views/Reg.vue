<template>
  <div class="layui-container fly-marginTop">
    <div
      class="fly-panel fly-panel-user"
      pad20>
      <div
        class="layui-tab layui-tab-brief"
        lay-filter="user">
        <ul class="layui-tab-title">
          <li>
            <router-link :to="{name: 'login'}">登入</router-link>
          </li>
          <li class="layui-this">注册</li>
        </ul>
        <div
          id="LAY_ucm"
          class="layui-form layui-tab-content"
          style="padding: 20px 0;">
          <validation-observer
            ref="observer"
            v-slot="{validate}">
            <div class="layui-tab-item layui-show">
              <div class="layui-form layui-form-pane">
                <form>
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
                          v-model="regForm.username"
                          class="layui-input"
                          name="username"
                          placeholder="将会成为您唯一的登入名"
                          type="text"/>
                      </div>
                    </div>
                    <div class="error-box">
                      <span>{{ v.errors[0] }}</span>
                    </div>
                  </validation-provider>
                  <validation-provider
                    v-slot="v"
                    name="name"
                    rules="required|min:4|max:10">
                    <div class="layui-form-item">
                      <label
                        class="layui-form-label"
                        for="name">
                        昵称
                      </label>
                      <div class="layui-input-inline">
                        <input
                          id="name"
                          v-model="regForm.name"
                          class="layui-input"
                          name="name"
                          placeholder="请输入昵称"
                          type="text"/>
                      </div>
                    </div>
                    <div class="error-box">
                      <span>{{ v.errors[0] }}</span>
                    </div>
                  </validation-provider>
                  <validation-provider
                    v-slot="v"
                    rules="required|min:6"
                    vid="confirmation">
                    <div class="layui-form-item">
                      <label
                        class="layui-form-label"
                        for="password">密码
                      </label>
                      <div class="layui-input-inline">
                        <input
                          id="password"
                          v-model="regForm.password"
                          class="layui-input"
                          name="password"
                          placeholder="请输入6位数以上密码"
                          type="password"/>
                      </div>
                    </div>
                    <div class="error-box">
                      <span>{{ v.errors[0] }}</span>
                    </div>
                  </validation-provider>
                  <validation-provider
                    v-slot="v"
                    rules="required|confirmed:confirmation">
                    <div class="layui-form-item">
                      <label
                        class="layui-form-label"
                        for="rePassword">确认密码
                      </label>
                      <div class="layui-input-inline">
                        <input
                          id="rePassword"
                          v-model="regForm.rePassword"
                          class="layui-input"
                          name="rePassword"
                          placeholder="再次输入密码"
                          type="password"/>
                      </div>
                    </div>
                    <div class="error-box">
                      <span>{{ v.errors[0] }}</span>
                    </div>
                  </validation-provider>
                  <validation-provider
                    v-slot="v"
                    rules="required|length:4">
                    <div class="layui-form-item">
                      <label
                        class="layui-form-label"
                        for="code">验证码
                      </label>
                      <div class="layui-input-inline">
                        <input
                          id="code"
                          v-model="regForm.code"
                          class="layui-input"
                          name="code"
                          placeholder="请输入验证码"
                          type="text"/>
                      </div>
                      <div
                        @click="_getCaptcha()"
                        v-html="svg"/>
                    </div>
                    <div class="error-box">
                      <span>{{ v.errors[0] }}</span>
                    </div>
                  </validation-provider>
                  <div class="layui-form-item">
                    <button
                      class="layui-btn"
                      type="button"
                      @click="validate().then(submitReg)">立即注册
                    </button>
                  </div>
                  <div class="layui-form-item fly-form-app">
                    <span>或者直接使用社交账号快捷注册</span>
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
import {
  ValidationProvider,
  ValidationObserver
} from 'vee-validate'
import {
  getCaptcha,
  reg
} from '@/api'
import { mapState } from 'vuex'

export default {
  name: 'reg',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      regForm: {
        username: '11776174@qq.com',
        name: 'lijunjun',
        password: '123456',
        rePassword: '123456',
        code: '1234',
        sid: ''
      },
      svg: ''
    }
  },
  computed: {
    ...mapState(['sid'])
  },
  created () {
    this.regForm.sid = this.sid
    this._getCaptcha()
  },
  methods: {
    async _getCaptcha () {
      getCaptcha(this.sid).then(res => {
        if (res.code === 0) {
          this.svg = res.data.data
        }
      })
    },
    async submitReg () {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }
      const res = await reg(this.regForm)
      if (res.code === 1) {
        this.$alert(res.msg)
      } else {
        this.$alert(res.msg)
      }
    }
  }
}
</script>

<style
  lang="scss"
  scoped>
.layui-form-item {
  margin-bottom: 0px;
}
.error-box {
  height: 20px;
  span {
    color: red;
  }
}
</style>
