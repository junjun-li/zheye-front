<template>
  <!-- 修改密码 -->
  <div class="layui-form layui-form-pane layui-tab-item layui-show">
    <ValidationObserver
      ref="observer"
      v-slot="{validate}">
      <form>
        <validation-provider
          v-slot="v"
          name="oldPass"
          rules="required|min:6">
          <div class="layui-form-item">
            <label
              class="layui-form-label"
              for="L_nowPass">
              当前密码
            </label>
            <div class="layui-input-inline">
              <input
                id="L_nowPass"
                v-model="oldPass"
                autocomplete="off"
                class="layui-input"
                name="oldPass"
                placeholder="请输入当前登录密码"
                type="password"
              />
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
              for="L_newPass">
              新密码
            </label>
            <div class="layui-input-inline">
              <input
                id="L_newPass"
                v-model="newPass"
                autocomplete="off"
                class="layui-input"
                name="password"
                placeholder="请输入6位数以上密码"
                type="password"
              />
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
              for="L_repass">
              确认密码
            </label>
            <div class="layui-input-inline">
              <input
                id="L_repass"
                v-model="reNewPass"
                autocomplete="off"
                class="layui-input"
                name="rePassword"
                placeholder="确认密码"
                type="password"
              />
            </div>
          </div>
          <div class="error-box">
            <span>{{ v.errors[0] }}</span>
          </div>
        </validation-provider>
        <div class="layui-form-item">
          <button
            class="layui-btn"
            @click.prevent="validate().then(_resetPassWord)">确认修改
          </button>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import {
  ValidationProvider,
  ValidationObserver
} from 'vee-validate'
import { resetPassword } from '@/api'

export default {
  name: 'password',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      oldPass: undefined,
      newPass: undefined,
      reNewPass: undefined
    }
  },
  mounted () {
    // window.observer = this.$refs.observer
  },
  methods: {
    async _resetPassWord () {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }
      const res = await resetPassword({
        oldPass: this.oldPass,
        newPass: this.newPass
      })
      if (res.code === 1) {
        this.$alert(res.msg)
      } else {
        this.$alert(res.msg)
        this.oldPass = undefined
        this.newPass = undefined
        this.reNewPass = undefined
        this.$refs.observer.reset()
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
