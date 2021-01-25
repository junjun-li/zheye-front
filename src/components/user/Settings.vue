<template>
  <div
    class="fly-panel fly-panel-user"
    pad20>
    <div
      class="layui-tab layui-tab-brief"
      lay-filter="user">
      <ul
        id="LAY_mine"
        class="layui-tab-title">
        <li>
          <router-link
            :to="{name: 'info'}"
            exact-active-class="layui-this">我的资料
          </router-link>
        </li>
        <li>
          <router-link
            :to="{name: 'pic'}"
            exact-active-class="layui-this">头像
          </router-link>
        </li>
        <li>
          <router-link
            :to="{name: 'email'}"
            exact-active-class="layui-this">修改邮箱
          </router-link>
        </li>
        <li>
          <router-link
            :to="{name: 'passwd'}"
            exact-active-class="layui-this">修改密码
          </router-link>
        </li>
        <li>
          <router-link
            :to="{name: 'account'}"
            exact-active-class="layui-this">帐号绑定
          </router-link>
        </li>
      </ul>
      <div
        class="layui-tab-content"
        style="padding: 20px 0;">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'settings',
  mounted () {
    window.vue = this
  }
}
</script>

<style
  lang="scss"
  scoped>
</style>
