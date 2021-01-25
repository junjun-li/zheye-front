<template>
  <validation-observer
    ref="observer"
    v-slot="{validate}">
    <div class="layui-form layui-form-pane layui-tab-item layui-show">
      <validation-provider
        v-slot="v"
        name="name"
        rules="required|min:4|max:10">
        <div class="layui-form-item">
          <label
            class="layui-form-label"
            for="L_username">昵称
          </label>
          <div class="layui-input-inline">
            <input
              v-model="name"
              class="layui-input"
              name="name"
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
        name="location"
        rules="required">
        <div class="layui-form-item">
          <label
            class="layui-form-label"
            for="L_city">城市
          </label>
          <div class="layui-input-inline">
            <input
              v-model="location"
              class="layui-input"
              type="text"/>
          </div>
        </div>
        <div class="error-box">
          <span>{{ v.errors[0] }}</span>
        </div>
      </validation-provider>
      <validation-provider
        v-slot="v"
        name="gender"
        rules="required">
        <div class="layui-form-item">
          <label
            class="layui-form-label"
            for="L_city">性别
          </label>
          <div class="layui-input-inline gray mt1 ml1">
            <label
              class="mr1"
              for="gender1">
              <input
                id="gender1"
                v-model="gender"
                name="sex"
                title="男"
                type="radio"
                value="0"/>
              <i
                :class="{'layui-icon-radio': gender ==='0'}"
                class="layui-icon layui-icon-circle"></i>
              男
            </label>
            <label for="gender2">
              <input
                id="gender2"
                v-model="gender"
                name="sex"
                title="女"
                type="radio"
                value="1"/>
              <i
                :class="{'layui-icon-radio': gender ==='1'}"
                class="layui-icon layui-icon-circle"></i>
              女
            </label>
          </div>
        </div>
        <div class="error-box">
          <span>{{ v.errors[0] }}</span>
        </div>
      </validation-provider>
      <div class="layui-form-item layui-form-text">
        <label
          class="layui-form-label"
          for="L_sign">签名
        </label>
        <div class="layui-input-block">
          <textarea
            v-model="regmark"
            class="layui-textarea"
            placeholder="随便写些什么刷下存在感"
            style="height: 80px;">
          </textarea>
        </div>
      </div>
      <div
        class="layui-form-item"
        style="margin-top: 15px">
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
// import { updateUserInfo } from '@/api'

export default {
  name: 'myInfo',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      username: '',
      name: '',
      location: '',
      gender: '',
      regmark: ''
    }
  },
  mounted () {
    const {
      username,
      name,
      location,
      gender,
      regmark
    } = this.$store.state.userInfo
    this.username = username || ''
    this.name = name || ''
    this.location = location || ''
    this.gender = gender || ''
    this.regmark = regmark || ''
  },
  methods: {
    async submitUpdate () {
      // const isValid = await this.$refs.observer.validate()
      // if (!isValid) {
      //   return
      // }
      // const res = await updateUserInfo({
      //   username: this.username,
      //   name: this.name,
      //   location: this.location,
      //   gender: this.gender,
      //   regmark: this.regmark
      // })
      // if (res.code === 0) {
      //   this.$pop('', '修改成功')
      //   this.$store.commit('setUserInfo', {
      //     ...this.$store.state.userInfo,
      //     username: this.username,
      //     name: this.name,
      //     location: this.location,
      //     gender: this.gender,
      //     regmark: this.regmark
      //   })
      // }
    }
  }
}
</script>

<style
  lang="scss"
  scoped>
.layui-icon-radio {
  color: #5fb878;
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
