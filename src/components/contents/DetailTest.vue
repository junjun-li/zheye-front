<template>
  <div>
    <imooc-panel></imooc-panel>
    <div class="layui-container">
      <div class="layui-row layui-col-space15">
        <div class="layui-col-md8 content detail">
          <div class="fly-panel detail-box">
            <h1>Imooc社区，基于 layui 的极简社区页面模版</h1>
            <!--帖子状态-->
            <div class="fly-detail-info">
              <!-- <span class="layui-badge">审核中</span> -->
              <span class="layui-badge layui-bg-green fly-detail-column">动态</span>

              <span
                class="layui-badge"
                style="background-color: #999;">未结</span>
              <!-- <span class="layui-badge" style="background-color: #5FB878;">已结</span> -->

              <span class="layui-badge layui-bg-black">置顶</span>
              <span class="layui-badge layui-bg-red">精帖</span>

              <div
                class="fly-admin-box"
                data-id="123">
                <span
                  class="layui-btn layui-btn-xs jie-admin"
                  type="del">删除</span>

                <span
                  class="layui-btn layui-btn-xs jie-admin"
                  type="set">置顶</span>
                <!-- <span class="layui-btn layui-btn-xs jie-admin" type="set" field="stick" rank="0" style="background-color:#ccc;">取消置顶</span> -->

                <span
                  class="layui-btn layui-btn-xs jie-admin"
                  type="set">加精</span>
                <!-- <span class="layui-btn layui-btn-xs jie-admin" type="set" field="status" rank="0" style="background-color:#ccc;">取消加精</span> -->
              </div>
              <span class="fly-list-nums">
            <a href="#comment"><i
              class="iconfont"
              title="回答">&#xe60c;</i> 66</a>
            <i
              class="iconfont"
              title="人气">&#xe60b;</i> 99999
          </span>
            </div>
            <!--收藏, 作者信息-->
            <div class="detail-about">
              <a
                class="fly-avatar"
                href="../user/home.html">
                <img
                  alt="贤心"
                  src="https://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg">
              </a>
              <div class="fly-detail-user">
                <a
                  class="fly-link"
                  href="../user/home.html">
                  <cite>贤心</cite>
                  <i
                    class="iconfont icon-renzheng"
                    title="认证信息："></i>
                  <i class="layui-badge fly-badge-vip">VIP3</i>
                </a>
                <span>2017-11-30</span>
              </div>
              <div
                id="LAY_jieAdmin"
                class="detail-hits"
                data-id="123">
                <span style="padding-right: 10px; color: #FF7200">悬赏：60飞吻</span>
                <span
                  class="layui-btn layui-btn-xs jie-admin"
                  type="edit"><a href="add.html">编辑此贴</a></span>
              </div>
            </div>
            <div class="layui-btn-container fly-detail-admin">
              <button class="layui-btn layui-btn-sm jie-admin">编辑</button>
              <button class="layui-btn layui-btn-sm jie-admin-collect">收藏</button>
            </div>
            <!--这里是帖子的内容部分-->
            <div class="detail-body photos">
              这里是帖子的内容部分
            </div>
          </div>

          <div
            id="flyReply"
            class="fly-panel detail-box">
            <fieldset
              class="layui-elem-field layui-field-title"
              style="text-align: center;">
              <legend>回帖</legend>
            </fieldset>

            <ul
              id="jieda"
              class="jieda">
              <li
                class="jieda-daan"
                data-id="111">
                <div class="detail-about detail-about-reply">
                  <a
                    class="fly-avatar"
                    href="">
                    <img
                      alt=" "
                      src="https://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg">
                  </a>
                  <div class="fly-detail-user">
                    <a
                      class="fly-link"
                      href="">
                      <cite>贤心</cite>
                      <i
                        class="iconfont icon-renzheng"
                        title="认证信息：XXX"></i>
                      <i class="layui-badge fly-badge-vip">VIP3</i>
                    </a>

                    <span>(楼主)</span>
                    <!--
                    <span style="color:#5FB878">(管理员)</span>
                    <span style="color:#FF9E3F">（社区之光）</span>
                    <span style="color:#999">（该号已被封）</span>
                    -->
                  </div>

                  <div class="detail-hits">
                    <span>2017-11-30</span>
                  </div>

                  <i
                    class="iconfont icon-caina"
                    title="最佳答案"></i>
                </div>
                <div class="detail-body jieda-body photos">
                  <p>香菇那个蓝瘦，这是一条被采纳的回帖</p>
                </div>
                <div class="jieda-reply">
              <span
                class="jieda-zan zanok"
                type="zan">
                <i class="iconfont icon-zan"></i>
                <em>66</em>
              </span>
                  <span type="reply">
                <i class="iconfont icon-svgmoban53"></i>
                回复
              </span>
                  <div class="jieda-admin">
                    <span type="edit">编辑</span>
                    <span type="del">删除</span>
                    <!-- <span class="jieda-accept" type="accept">采纳</span> -->
                  </div>
                </div>
              </li>

              <li data-id="111">
                <div class="detail-about detail-about-reply">
                  <a
                    class="fly-avatar"
                    href="">
                    <img
                      alt=" "
                      src="https://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg">
                  </a>
                  <div class="fly-detail-user">
                    <a
                      class="fly-link"
                      href="">
                      <cite>贤心</cite>
                    </a>
                  </div>
                  <div class="detail-hits">
                    <span>2017-11-30</span>
                  </div>
                </div>
                <div class="detail-body jieda-body photos">
                  <p>蓝瘦那个香菇，这是一条没被采纳的回帖</p>
                </div>
                <div class="jieda-reply">
              <span
                class="jieda-zan"
                type="zan">
                <i class="iconfont icon-zan"></i>
                <em>0</em>
              </span>
                  <span type="reply">
                <i class="iconfont icon-svgmoban53"></i>
                回复
              </span>
                  <div class="jieda-admin">
                    <span type="edit">编辑</span>
                    <span type="del">删除</span>
                    <span
                      class="jieda-accept"
                      type="accept">采纳</span>
                  </div>
                </div>
              </li>

              <!-- 无数据时 -->
              <!-- <li class="fly-none">消灭零回复</li> -->
            </ul>
            <!--<Pagination-->
            <!--  :current="current"-->
            <!--  :size="15"-->
            <!--  :total="101"-->
            <!--  hasSelect-->
            <!--  hasTotal-->
            <!--  showEnd-->
            <!--  showType="text"-->
            <!--  @changeCurrent="changeCurrent"/>-->
            <div style="margin-top: 10px; margin-bottom: 10px;display: flex;justify-content: flex-end;">
              <el-pagination
                :current-page="currentPage"
                :page-size="100"
                :page-sizes="[100, 200, 300, 400]"
                :total="400"
                layout="total, sizes, prev, pager, next, jumper"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"/>
            </div>
            <div class="layui-form layui-form-pane">
              <form
                action="/jie/reply/"
                method="post">
                <Editor/>
                <div class="layui-form-item">
                  <validation-provider
                    v-slot="{errors}"
                    name="code"
                    rules="required|length:4">
                    <div class="layui-row">
                      <label class="layui-form-label">验证码</label>
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
                          @click="_getCaptcha"
                          v-html="svg"></span>
                      </div>
                    </div>
                    <div class="layui-form-mid">
                      <span style="color: #c00;">{{ errors[0] }}</span>
                    </div>
                  </validation-provider>
                </div>
                <div class="layui-form-item">
                  <input
                    name="jid"
                    type="hidden"
                    value="123">
                  <button
                    class="layui-btn">提交回复
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="layui-col-md4">
          <imooc-hotList></imooc-hotList>
          <imooc-ads></imooc-ads>
          <imooc-links></imooc-links>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HotList from '@/components/sidebar/HotList'
import Ads from '@/components/sidebar/Ads'
import Links from '@/components/sidebar/Links'
import List from '@/components/contents/List'
import Panel from '@/components/Panel'
import Editor from '@/components/modules/editor'
import CodeMix from '@/mixin/code'
import Pagination from '@/components/modules/Pagination'
import {
  getComments,
  getPostDetail
} from '@/api'

export default {
  name: 'Detail',
  mixins: [CodeMix],
  components: {
    Pagination,
    Editor,
    'imooc-hotList': HotList,
    'imooc-ads': Ads,
    'imooc-links': Links,
    'imooc-panel': Panel
  },
  data () {
    return {
      currentPage: 0
    }
  },
  created () {
    if (!this.$route.query.id) {
      this.$router.push('/')
      return
    }
    this._getPostDetail()
    this._getComments()
  },
  methods: {
    async _getPostDetail () {
      const res = await getPostDetail(this.$route.query.id)
      console.log(res)
    },
    async _getComments () {
      const res = await getComments(this.$route.query.id)
      console.log(res)
    },
    changeCurrent (current) {
      this.current = current
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style
  lang="scss"
  scoped>
.fly-detail-admin {
  text-align: right;
  border-top: 1px dotted #eaeaea;
  background: #f8f8f8;
  padding-top: 10px;
}

.fly-detail-info {
  span {
    margin-right: 5px;
  }
}

.jieda-body {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
