<template>
  <div class="layui-container fly-marginTop">
    <div
      class="fly-panel fly-panel-user"
      pad20>
      <div
        class="layui-tab layui-tab-brief">
        <ul class="layui-tab-title">
          <li>
            <router-link :to="{name: 'login'}">登入</router-link>
          </li>
          <li class="layui-this">
            找回密码
            <!--重置密码-->
          </li>
        </ul>
        <div
          id="LAY_ucm"
          class="layui-form layui-tab-content"
          style="padding: 20px 0;">
          <div class="layui-tab-item layui-show">
            <!-- 重置密码 -->
            <!--
          <div class="fly-msg">{{d.username}}，请重置您的密码</div>
          <div class="layui-form layui-form-pane"  style="margin-top: 30px;">
            <form action="/user/repass" method="post">
              <div class="layui-form-item">
                <label for="L_pass" class="layui-form-label">密码</label>
                <div class="layui-input-inline">
                  <input type="password" id="L_pass" name="pass" required lay-verify="required" autocomplete="off" class="layui-input">
                </div>
                <div class="layui-form-mid layui-word-aux">6到16个字符</div>
              </div>
              <div class="layui-form-item">
                <label for="L_repass" class="layui-form-label">确认密码</label>
                <div class="layui-input-inline">
                  <input type="password" id="L_repass" name="repass" required lay-verify="required" autocomplete="off" class="layui-input">
                </div>
              </div>
              <div class="layui-form-item">
                <label for="L_vercode" class="layui-form-label">人类验证</label>
                <div class="layui-input-inline">
                  <input type="text" id="L_recode" name="recode" required lay-verify="required" placeholder="请回答后面的问题" autocomplete="off" class="layui-input">
                </div>
                <div class="layui-form-mid">
                  <span style="color: #c00;">{{d.recode}}</span>
                </div>
              </div>
              <div class="layui-form-item">
                <input type="hidden" name="username" value="{{d.username}}">
                <input type="hidden" name="email" value="{{d.email}}">
                <button class="layui-btn" alert="1" lay-filter="*" lay-submit>提交</button>
              </div>
            </form>
          </div>

          <div class="fly-error">该重置密码链接已失效，请重新校验您的信息</div>
          <div class="fly-error">非法链接，请重新校验您的信息</div>
            -->

            <div class="layui-form layui-form-pane">
              <form method="post">
                <div class="layui-form-item">
                  <label
                    class="layui-form-label"
                    for="L_email">用户名
                  </label>
                  <div class="layui-input-inline">
                    <input
                      id="L_email"
                      v-model="username"
                      autocomplete="off"
                      class="layui-input"
                      name="username"
                      placeholder="请输入用户名"
                      type="text"
                    />
                  </div>
                </div>
                <div class="layui-form-item">
                  <div class="layui-row">
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
                      class="svg"
                      style="color: #c00;"
                      @click="_getCaptcha()"
                      v-html="svg"/>
                  </div>
                </div>
                <div class="layui-form-item">
                  <button
                    class="layui-btn"
                    type="button"
                    @click="submit">提交
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {
  getCaptcha,
  forget
} from '@/api'

export default {
  name: 'forget',
  components: {},
  data () {
    return {
      username: '',
      code: '',
      svg: ''
    }
  },
  mounted () {
    this._getCaptcha()
  },
  methods: {
    async _getCaptcha () {
      const res = await getCaptcha()
      this.svg = res.data.data
      console.log(res)
    },
    async submit () {
      const res = await forget({
        username: this.username
      })
      console.log(res)
    }
  }
}
</script>

<style
  lang="scss"
  scoped>
// 公用样式可以放在App.vue中
</style>
