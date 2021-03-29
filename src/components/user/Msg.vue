<template>
  <div
    class="fly-panel fly-panel-user"
    pad20>
    <div
      id="LAY_msg"
      class="layui-tab layui-tab-brief"
      lay-filter="user"
      style="margin-top: 15px;">
      <button
        id="LAY_delallmsg"
        class="layui-btn layui-btn-danger">清空全部消息
      </button>
      <div
        id="LAY_minemsg"
        style="margin-top: 10px;">
        <!--<div class="fly-none">您暂时没有最新消息</div>-->
        <ul class="mine-msg">
          <li data-id="123">
            <blockquote class="layui-elem-quote">
              <a
                href="/jump?username=Absolutely"
                target="_blank">
                <cite>Absolutely</cite>
              </a>
              回答了您的求解
              <a
                href="/jie/8153.html/page/0/#item-1489505778669"
                target="_blank">
                <cite>layui后台框架</cite>
              </a>
            </blockquote>
            <p>
              <span>1小时前</span>
              <a
                class="layui-btn layui-btn-small layui-btn-danger fly-delete"
                href="javascript:;"
              >删除
              </a>
            </p>
          </li>
          <li data-id="123">
            <blockquote class="layui-elem-quote">系统消息：欢迎使用 layui</blockquote>
            <p>
              <span>1小时前</span>
              <a
                class="layui-btn layui-btn-small layui-btn-danger fly-delete"
                href="javascript:;"
              >删除
              </a>
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getHistoryMsg } from '@/api'
import { mapState } from 'vuex'

export default {
  name: 'user-msg',
  data () {
    return {
      params: {
        page: 1,
        pageSize: 10
      },
      ws: {}
    }
  },
  computed: {
    ...mapState({
      token: 'token'
    })
  },
  created () {
    this._getHistoryMsg()
  },
  methods: {
    async _getHistoryMsg () {
      const res = await getHistoryMsg(this.params)
      console.log(res)
    }
  }
}
</script>

<style
  lang="scss"
  scoped>
</style>
