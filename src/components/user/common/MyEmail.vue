<template>
  <validation-observer
    ref="observer"
    v-slot="{validate}">
    <div class="layui-form layui-form-pane layui-tab-item layui-show">
      <validation-provider
        v-slot="v"
        name="email"
        rules="required|email">
        <div class="layui-form-item">
          <label class="layui-form-label">邮箱
          </label>
          <div class="layui-input-inline">
            <input
              v-model="username"
              class="layui-input input-disabled"
              disabled
              name="email"
              type="text"/>
          </div>
          <div class="layui-form-mid">
            <span style="color: #c00;"></span>
          </div>
        </div>
        <div class="error-box">
          <span>{{ v.errors[0] }}</span>
        </div>
      </validation-provider>
      <validation-provider
        v-slot="v"
        name="email"
        rules="required|email">
        <div class="layui-form-item">
          <label class="layui-form-label">新邮箱
          </label>
          <div class="layui-input-inline">
            <input
              v-model="updateUserName"
              class="layui-input"
              name="email"
              type="text"/>
          </div>
          <div class="layui-form-mid">
            <span style="color: #c00;"></span>
          </div>
        </div>
        <div class="error-box">
          <span>{{ v.errors[0] }}</span>
        </div>
      </validation-provider>
      <div class="layui-form-item">
        <button
          class="layui-btn"
          @click="validate().then(submitUpdate)">确认修改
        </button>
      </div>
    </div>
  </validation-observer>
</template>

<script>
import {
  ValidationObserver,
  ValidationProvider
} from 'vee-validate'
// import { sendUpdateEmail } from '@/api'
export default {
  name: 'MyEmail',
  data () {
    return {
      username: '',
      updateUserName: '981311431@qq.com'
    }
  },
  components: {
    ValidationProvider,
    ValidationObserver
  },
  mounted () {
    // this.username = this.$store.state.userInfo.username
  },
  methods: {
    async submitUpdate () {
      // let res = await sendUpdateEmail(this.updateUserName)
      // if (res.code === 0) {
      //   this.$pop('', '邮件发送成功,请登录原邮箱查看')
      // }
    }
  }

}
</script>

<style
  lang="scss"
  scoped>
.error-box {
  height: 20px;

  span {
    color: #c00;
  }
}

.input-disabled {
  background-color: #f5f7fa;
  border-color: #e4e7ed;
  color: #c0c4cc;
  cursor: not-allowed;
}

.layui-form-item {
  margin-bottom: 0;
}
</style>
