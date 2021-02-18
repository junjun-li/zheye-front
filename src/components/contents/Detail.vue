<template>
  <div class="layui-container">
    <Panel></Panel>
    <div class="layui-row layui-col-space15">
      <div class="layui-col-md8 content detail">
        <div class="fly-panel detail-box">
          <h1>{{ page.title }}</h1>
          <div class="fly-detail-info">
            <!-- <span class="layui-badge">审核中</span> -->
            <span
              v-if="page.catalog === 'share'"
              class="layui-badge layui-bg-green fly-detail-column"
            >分享</span>
            <span
              v-else-if="page.catalog === 'ask'"
              class="layui-badge layui-bg-green fly-detail-column"
            >提问</span>
            <span
              v-else-if="page.catalog === 'advise'"
              class="layui-badge layui-bg-green fly-detail-column"
            >建议</span>
            <span
              v-else-if="page.catalog === 'logs'"
              class="layui-badge layui-bg-green fly-detail-column"
            >动态</span>
            <span
              v-else-if="page.catalog === 'discuss'"
              class="layui-badge layui-bg-green fly-detail-column"
            >交流</span>
            <span
              v-else-if="page.catalog === 'notice'"
              class="layui-badge layui-bg-green fly-detail-column"
            >公告</span>

            <span
              v-if="page.isEnd === '0'"
              class="layui-badge"
              style="background-color: #999;">未结</span>
            <span
              v-else
              class="layui-badge"
              style="background-color: #5FB878;">已结</span>

            <span
              v-show="page.isTop === '1'"
              class="layui-badge layui-bg-black">置顶</span>
            <span
              v-for="(tag,index) in page.tags"
              :key="'tags' + index"
              :class="tag.class"
              class="layui-badge"
            >{{ tag.name }}</span>

            <!--
              <div class="fly-admin-box" data-id="123">
              <span class="layui-btn layui-btn-xs jie-admin" type="del">删除</span>

              <span class="layui-btn layui-btn-xs jie-admin" type="set" field="stick" rank="1">置顶</span>
              <span
                class="layui-btn layui-btn-xs jie-admin"
                type="set"
                field="stick"
                rank="0"
                style="background-color:#ccc;"
              >取消置顶</span>

              <span class="layui-btn layui-btn-xs jie-admin" type="set" field="status" rank="1">加精</span>
              <span
                class="layui-btn layui-btn-xs jie-admin"
                type="set"
                field="status"
                rank="0"
                style="background-color:#ccc;"
              >取消加精</span>
            </div>
            -->
            <span class="fly-list-nums">
              <a href="#comment">
                <i
                  class="iconfont"
                  title="回答">&#xe60c;</i>
                {{ page.answer }}
              </a>
              <i
                class="iconfont"
                title="人气">&#xe60b;</i>
              {{ page.reads }}
            </span>
          </div>
          <!-- 收藏、作者信息 -->
          <div class="detail-about">
            <a
              class="fly-avatar"
              href="../user/home.html">
              <img :src="page.uid?page.uid.pic: '/img/bear-200-200.jpg'"/>
            </a>
            <div class="fly-detail-user">
              <a
                class="fly-link"
                href="../user/home.html">
                <cite>{{ page.uid ? page.uid.name : 'imooc' }}</cite>
                <!-- <i class="iconfont icon-renzheng" title="认证信息："></i> -->
                <i
                  v-if="page.uid && page.uid.isVip !== '0'? page.uid.isVip : false"
                  class="layui-badge fly-badge-vip mr1"
                >VIP{{ page.uid.isVip }}
                </i>
              </a>
              <span>{{ page.created }}</span>
            </div>
            <div class="detail-hits">
              <span style="padding-right: 10px; color: #FF7200">悬赏：{{ page.integral }}</span>
            </div>
          </div>
          <!--<div class="layui-btn-container fly-detail-admin pt1">-->
          <!--  <router-link-->
          <!--    :to="{-->
          <!--      name: 'edit',-->
          <!--      params: { id: $route.query.id }-->
          <!--    }"-->
          <!--    class="layui-btn layui-btn-sm jie-admin">编辑-->
          <!--  </router-link>-->
          <!--  <a-->
          <!--    class="layui-btn layui-btn-sm jie-admin-collect"-->
          <!--    href>收藏-->
          <!--  </a>-->
          <!--</div>-->
          <div
            class="detail-body photos"
            v-html="content"></div>
        </div>

        <!-- 回帖相关的内容 -->
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
              v-for="(item,index) in comments"
              :key="index"
              class="jieda-daan">
              <div class="detail-about detail-about-reply">
                <a
                  class="fly-avatar"
                  href>
                  <img
                    :src="item.uid ? item.uid.pic : '/img/bear-200-200.jpg'"
                    alt=" "/>
                </a>
                <div class="fly-detail-user">
                  <a
                    class="fly-link"
                    href>
                    <cite>{{ item.uid ? item.uid.name : 'imooc' }}</cite>
                    <i
                      v-if="item.uid && item.uid.isVip !=='0'?item.uid.isVip : false "
                      class="layui-badge fly-badge-vip"
                    >VIP{{ item.uid.isVip }}
                    </i>
                  </a>

                  <span v-if="item.uid && item.uid._id === userInfo._id">(楼主)</span>
                  <!--
                    <span style="color:#5FB878">(管理员)</span>
                    <span style="color:#FF9E3F">（社区之光）</span>
                    <span style="color:#999">（该号已被封）</span>
                  -->
                </div>

                <div class="detail-hits">
                  <span>{{ item.createdTime }}</span>
                </div>
                <i
                  v-show="item.isBest === '1'"
                  class="iconfont icon-caina"
                  title="最佳答案"></i>
              </div>
              <div
                class="detail-body jieda-body photos"
                v-html="escapeHtml(item.content)"></div>
              <div class="jieda-reply">
                <span
                  :class="{'zanok' :item.handed === '1'}"
                  class="jieda-zan"
                  type="zan"
                  @click="_setLink(item)">
                  <i class="iconfont icon-zan"></i>
                  <em>{{ item.hands }}</em>
                </span>
                <!--<span type="reply">-->
                <!--  <i class="iconfont icon-svgmoban53"></i>-->
                <!--  回复-->
                <!--</span>-->
                <div class="jieda-admin">
                  <!--<span-->
                  <!--  v-show="page.isEnd ==='0' && item.uid._id === userInfo._id"-->
                  <!--  @click="editComment(item)">编辑</span>-->
                  <!-- <span type="del">删除</span> -->
                  <span
                    v-show="page.isEnd ==='0' && item.uid._id === userInfo._id"
                    @click="setBest(item)">采纳</span>
                </div>
              </div>
            </li>
            <!-- 无数据时 -->
            <li
              v-if="comments.length === 0"
              class="fly-none">
              消灭零回复
            </li>
          </ul>
          <div style="margin-top: 10px; margin-bottom: 10px;display: flex;justify-content: flex-end;">
            <el-pagination
              :current-page="currentPage"
              :page-size="pageSize"
              :page-sizes="[5, 10, 20, 30, 40, 50]"
              :total="total"
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"/>
          </div>
          <div class="layui-form layui-form-pane">
            <form>
              <validation-observer
                ref="observer"
                v-slot="{ validate }">
                <Editor
                  :initContent="editInfo.content"
                  @changeContent="addContent"/>
                <div class="layui-form-item">
                  <validation-provider
                    v-slot="{errors}"
                    name="code"
                    rules="required|length:4">
                    <div class="layui-row">
                      <label
                        class="layui-form-label"
                        for="code">验证码
                      </label>
                      <div class="layui-input-inline">
                        <input
                          id="code"
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
                          @click="_getCaptcha()"
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
                    @click="submit">提交回复
                  </button>
                </div>
              </validation-observer>
            </form>
          </div>
        </div>
      </div>
      <div class="layui-col-md4">
        <HotList></HotList>
        <Ads></Ads>
        <Links></Links>
      </div>
    </div>
  </div>
</template>

<script>
import {
  addComment,
  getComments,
  getPostDetail,
  setCommentBest,
  setLink
} from '@/api'
import HotList from '@/components/sidebar/HotList'
import Ads from '@/components/sidebar/Ads'
import Links from '@/components/sidebar/Links'
import Panel from '@/components/Panel'
import Editor from '../modules/editor'
import CodeMix from '@/mixin/code'
import { escapeHtml } from '@/utils/escapeHtml'
import { mapState } from 'vuex'
import { scrollToElem } from '@/utils'

export default {
  name: 'Detail',
  mixins: [CodeMix],
  props: ['tid'],
  components: {
    HotList,
    Ads,
    Links,
    Panel,
    Editor
  },
  data () {
    return {
      currentPage: 1,
      total: 0,
      size: 10,
      current: 0,
      page: 1,
      pageSize: 10,
      comments: [],
      editInfo: {
        content: '',
        code: '',
        sid: '',
        tid: this.$route.query.id
      }
    }
  },
  computed: {
    content () {
      if (typeof this.page.content === 'undefined') {
        return ''
      }
      if (this.page.content.trim() === '') {
        return ''
      }
      return escapeHtml(this.page.content)
    },
    ...mapState({
      sid: 'sid',
      userInfo: 'userInfo'
    })
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
    _setLink (item) {
      setLink({ cid: item._id }).then((res) => {
        if (res.code === 0) {
          this.$pop('', '点赞成功')
          this._getComments()
        } else {
          this.$pop('shake', res.msg)
        }
      })
    },
    editComment (item) {
      this.editInfo.content = item.content
      scrollToElem('.layui-input-block', 500, -65)
      document.getElementById('edit').focus()
    },
    setBest (item) {
      this.$confirm('确定采纳为最佳答案吗?', () => {
        // 发送采纳最佳答案请求
        setCommentBest({
          cid: item._id,
          tid: this.$route.query.id
        }).then((res) => {
          if (res.code === 0) {
            this.$pop('', '设置最佳答案成功！')
            this._getPostDetail()
            this._getComments()
          }
        })
        // console.log(item._id)
      }, () => { })
    },
    escapeHtml,
    addContent (val) {
      this.editInfo.content = val
    },
    async _getPostDetail () {
      const res = await getPostDetail(this.$route.query.id)
      if (res.code === 0) {
        this.page = res.data
      }
    },
    async _getComments () {
      const res = await getComments({
        id: this.$route.query.id,
        page: this.currentPage,
        pageSize: this.pageSize
      })
      if (res.code === 0) {
        this.total = res.data.total
        this.comments = res.data.rows
      }
    },
    async submit () {
      const isLogin = this.$store.state.isLogin
      if (!isLogin) {
        this.$pop('shake', '请先登录')
        return
      }
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }
      this.editInfo.code = this.code
      this.editInfo.sid = this.sid
      const res = await addComment(this.editInfo)
      if (res.code === 0) {
        this.editInfo = {
          content: '',
          code: '',
          sid: '',
          tid: this.$route.query.id
        }
        this.code = ''
        this._getCaptcha()
        this._getComments()
        this._getPostDetail()
      } else {
        this.$pop('shake', res.msg ? res.msg : '错误, 请联系管理员')
      }
    },
    changeCurrent (current) {
      this.current = current
    },
    handleSizeChange (val) {
      this.pageSize = val
      this._getComments()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this._getComments()
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
}

.fly-detail-info {
  span {
    margin-right: 5px;
  }
}

.jieda-body {
  margin: 25px 0 20px !important;
}
</style>
