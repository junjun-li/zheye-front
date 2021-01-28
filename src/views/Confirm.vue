<template>
  <div class="layui-container flex">
    <div class="layui-row font pb3">确定更新账号为：{{ username }}吗？</div>
    <div class="layui-row">
      <button
        :class="{'layui-btn-disabled': isSend}"
        class="layui-btn"
        type="button"
        @click="submit()">
        确定更新
      </button>
      <router-link
        class="layui-btn layui-btn-primary"
        to="/">返回首页
      </router-link>
    </div>
  </div>
</template>

<script>
import { updateUsername } from '@/api'

export default {
  name: 'confirm',
  data () {
    return {
      username: '',
      key: '',
      isSend: false
    }
  },
  mounted () {
    const queryStr = window.location.href.replace(/.*\?/, '')
    const obj = Object.fromEntries(queryStr.split('&').map(v => v.split('=')))
    this.username = decodeURIComponent(obj.username)
    this.key = obj.key
  },
  methods: {
    submit () {
      updateUsername({
        key: this.key,
        username: this.username
      }).then((res) => {
        if (res.code === 0) {
          // this.isSend = true
          this.$alert('修改成功, 请重新登录', () => {
            localStorage.clear()
            this.$store.commit('setUserInfo', {})
            this.$store.commit('setIsLogin', false)
            this.$router.push('/login')
          })
          // setTimeout(() => {
          //   this.$router.push('/')
          // }, 1000)
        }
      })
    }
  }
}
</script>

<style
  lang="scss"
  scoped>
.flex {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  min-height: 260px;
}
.font {
  font-size: 16px;
  color: #333;
}
</style>
