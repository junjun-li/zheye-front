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
            v-slot="{ validate }">
            <div class="layui-tab-item layui-show">
              <div class="layui-form layui-form-pane">
                <form method="post">
                  <div class="layui-form-item">
                    <validation-provider
                      v-slot="{errors}"
                      name="username"
                      rules="required|email">
                      <div class="layui-row">
                        <label
                          class="layui-form-label"
                          for="L_email">用户名
                        </label>
                        <div class="layui-input-inline">
                          <input
                            v-model="username"
                            autocomplete="off"
                            class="layui-input"
                            name="username"
                            placeholder="请输入用户名"
                            type="text"
                          />
                        </div>
                        <div class="layui-form-mid layui-word-aux">将会成为您唯一的登入名</div>
                      </div>
                      <div class="layui-row">
                        <span style="color: #c00;">{{ errors[0] }}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <label
                      class="layui-form-label"
                      for="L_username">昵称
                    </label>
                    <validation-provider
                      v-slot="{errors}"
                      name="name"
                      rules="required|min:4|name">
                      <div class="layui-input-inline">
                        <input
                          v-model="name"
                          autocomplete="off"
                          class="layui-input"
                          name="name"
                          placeholder="请输入昵称"
                          type="text"
                        />
                      </div>
                      <div class="layui-form-mid">
                        <span style="color: #c00;">{{ errors[0] }}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <validation-provider
                      v-slot="{errors}"
                      name="password"
                      rules="required|min:6|max:16|confirmed:confirmation"
                    >
                      <div class="layui-row">
                        <label
                          class="layui-form-label"
                          for="L_pass">密码
                        </label>
                        <div class="layui-input-inline">
                          <input
                            v-model="password"
                            autocomplete="off"
                            class="layui-input"
                            name="password"
                            placeholder="请输入密码"
                            type="password"
                          />
                        </div>
                        <div class="layui-form-mid layui-word-aux">6到16个字符</div>
                      </div>
                      <div class="layui-row">
                        <span style="color: #c00;">{{ errors[0] }}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <validation-provider
                      v-slot="{ errors }"
                      vid="confirmation">
                      <div class="layui-row">
                        <label
                          class="layui-form-label"
                          for="L_repass">确认密码
                        </label>
                        <div class="layui-input-inline">
                          <input
                            v-model="repassword"
                            autocomplete="off"
                            class="layui-input"
                            name="repassword"
                            placeholder="请输入密码"
                            type="password"
                          />
                        </div>
                      </div>
                      <div class="layui-row">
                        <span style="color: #c00;">{{ errors[0] }}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <validation-provider
                      v-slot="{errors}"
                      name="code"
                      rules="required|length:4">
                      <div class="layui-row">
                        <label
                          class="layui-form-label"
                          for="L_vercode">验证码
                        </label>
                        <div class="layui-input-inline">
                          <input
                            v-model="code"
                            autocomplete="off"
                            class="layui-input"
                            name="code"
                            placeholder="请输入验证码"
                            type="text"
                          />
                        </div>
                        <div class>
                          <span
                            class="svg"
                            style="color: #c00;"
                            @click="_getCode()"
                            v-html="svg"></span>
                        </div>
                      </div>
                      <div class="layui-form-mid">
                        <span style="color: #c00;">{{ errors[0] }}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <button
                      class="layui-btn"
                      type="button"
                      @click="validate().then(submit)">立即注册
                    </button>
                  </div>
                  <div class="layui-form-item fly-form-app">
                    <span>或者直接使用社交账号快捷注册</span>
                    <a
                      class="iconfont icon-qq"
                      href
                      onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})"
                      title="QQ登入"
                    ></a>
                    <a
                      class="iconfont icon-weibo"
                      href
                      onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})"
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

export default {
  name: 'reg',
  data () {
    return {
      username: '',
      name: '',
      password: '',
      repassword: '',
      code: '',
      svg: ''
    }
  },
  components: {
    ValidationProvider,
    ValidationObserver
  },
  mounted () {
    this._getCode()
  },
  methods: {
    _getCode () {
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
