<template>
  <!-- 修改密码 -->
  <div class="layui-form layui-form-pane layui-tab-item layui-show">
    <form
      action="/user/repass"
      method="post">
      <div class="layui-form-item">
        <label
          class="layui-form-label"
          for="L_nowpass">当前密码
        </label>
        <div class="layui-input-inline">
          <input
            id="L_nowpass"
            autocomplete="off"
            class="layui-input"
            lay-verify="required"
            name="nowpass"
            required
            type="password"
          />
        </div>
      </div>
      <div class="layui-form-item">
        <label
          class="layui-form-label"
          for="L_pass">新密码
        </label>
        <div class="layui-input-inline">
          <input
            id="L_pass"
            autocomplete="off"
            class="layui-input"
            lay-verify="required"
            name="pass"
            required
            type="password"
          />
        </div>
        <div class="layui-form-mid layui-word-aux">6到16个字符</div>
      </div>
      <div class="layui-form-item">
        <label
          class="layui-form-label"
          for="L_repass">确认密码
        </label>
        <div class="layui-input-inline">
          <input
            id="L_repass"
            autocomplete="off"
            class="layui-input"
            lay-verify="required"
            name="repass"
            required
            type="password"
          />
        </div>
      </div>
      <div class="layui-form-item">
        <button
          key="set-mine"
          class="layui-btn">确认修改
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'password'
}
</script>

<style
  lang="scss"
  scoped>
</style>
