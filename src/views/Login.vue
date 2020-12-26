<template>
  <div class="layui-container fly-marginTop">
    <div
      class="fly-panel fly-panel-user"
      pad20>
      <div
        class="layui-tab layui-tab-brief"
        lay-filter="user">
        <ul class="layui-tab-title">
          <li class="layui-this">登入</li>
          <li>
            <router-link :to="{name: 'reg'}">注册</router-link>
          </li>
        </ul>
        <div
          id="LAY_ucm"
          class="layui-form layui-tab-content"
          style="padding: 20px 0;">
          <validation-observer
            ref="observer"
            v-slot="{ validate }">
            <div class="layui-tab-item layui-show">
              <div class="layui-form layui-form-pane">
                <form method="post">
                  <div class="layui-form-item">
                    <label
                      class="layui-form-label"
                      for="L_email">用户名
                    </label>
                    <validation-provider
                      v-slot="{errors}"
                      name="email"
                      rules="required|email">
                      <div class="layui-input-inline">
                        <input
                          id="L_email"
                          v-model="username"
                          autocomplete="off"
                          class="layui-input"
                          name="username"
                          placeholder="请输入用户名"
                          type="text"/>
                      </div>
                      <div class="layui-form-mid">
                        <span style="color: #c00;">{{ errors[0] }}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <label
                      class="layui-form-label"
                      for="L_pass">
                      密码
                    </label>
                    <validation-provider
                      v-slot="{errors}"
                      name="password"
                      rules="required|min:6">
                      <div class="layui-input-inline">
                        <input
                          id="L_pass"
                          v-model="password"
                          autocomplete="off"
                          class="layui-input"
                          name="password"
                          placeholder="请输入密码"
                          type="password"/>
                      </div>
                      <div class="layui-form-mid">
                        <span style="color: #c00;">{{ errors[0] }}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <validation-provider
                      ref="codefield"
                      v-slot="{errors}"
                      name="code"
                      rules="required|length:4">
                      <div class="layui-row" style="display: flex;align-items: center">
                        <label
                          class="layui-form-label"
                          for="L_code">验证码
                        </label>
                        <div class="layui-input-inline">
                          <input
                            id="L_code"
                            v-model="code"
                            autocomplete="off"
                            class="layui-input"
                            name="code"
                            placeholder="请输入验证码"
                            type="text"
                          />
                        </div>
                        <span
                          style="color: #c00;"
                          @click="_getCaptcha()"
                          v-html="svg"></span>
                      </div>
                      <div class="layui-form-mid">
                        <span style="color: #c00;">{{ errors[0] }}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <button
                      class="layui-btn"
                      type="button">
                      立即登录
                    </button>
                    <span style="padding-left:20px;">
                      <router-link :to="{name: 'forget'}">忘记密码？</router-link>
                    </span>
                  </div>
                  <div class="layui-form-item fly-form-app">
                    <span>或者使用社交账号登入</span>
                    <a
                      class="iconfont icon-qq"
                      href
                      title="QQ登入"
                    ></a>
                    <a
                      class="iconfont icon-weibo"
                      href
                      title="微博登入"
                    ></a>
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
import { getCaptcha } from '@/api'

export default {
  name: 'login',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      username: '',
      password: '',
      code: '',
      svg: ''
    }
  },
  created () {
    this._getCaptcha()
  },
  mounted () {

  },
  methods: {
    async _getCaptcha () {
      const res = await getCaptcha()
      this.svg = res.data.data
      console.log(res)
    },
    async submit () {
    }
  }
}
</script>

<style
  lang="scss"
  scoped>
// 公用样式可以放在App.vue中
</style>
