<template>
  <div class="layui-container fly-marginTop">
    <div
      class="fly-panel"
      pad20
      style="padding-top: 5px;">
      <!--<div class="fly-none">没有权限</div>-->
      <div class="layui-form layui-form-pane">
        <div
          class="layui-tab layui-tab-brief">
          <ul class="layui-tab-title">
            <li class="layui-this">发表新帖</li>
          </ul>
          <div
            id="LAY_ucm"
            class="layui-form layui-tab-content"
            style="padding: 20px 0;">
            <div class="layui-tab-item layui-show">
              <validation-observer
                ref="observer"
                v-slot="{ validate }">
                <form>
                  <div class="layui-row layui-col-space15 layui-form-item">
                    <div class="layui-col-md3">
                      <validation-provider
                        v-slot="{errors}"
                        name="catalog"
                        rules="is_not:请选择">
                        <div class="layui-row">
                          <label class="layui-form-label">所在专栏</label>
                          <div
                            class="layui-input-block"
                            @click="isSelect = !isSelect">
                            <div
                              :class="{'layui-form-selected': isSelect}"
                              class="layui-unselect layui-form-select">
                              <div class="layui-select-title">
                                <input
                                  v-model="catalogs[catalogIndex].text"
                                  class="layui-input layui-unselect"
                                  placeholder="请选择"
                                  readonly
                                  type="text"/>
                                <i class="layui-edge"></i>
                              </div>
                              <dl class="layui-anim layui-anim-upbit">
                                <dd
                                  v-for="(item,index) in catalogs"
                                  :key="'catalog' + index"
                                  :class="{'layui-this': index === catalogIndex}"
                                  @click="chooseCatalog(item, index)">
                                  {{ item.text }}
                                </dd>
                              </dl>
                            </div>
                          </div>
                        </div>
                        <div class="layui-row">
                          <span style="color: #c00;">{{ errors[0] }}</span>
                        </div>
                      </validation-provider>
                    </div>
                    <div class="layui-col-md9">
                      <validation-provider
                        v-slot="{errors}"
                        name="title"
                        rules="required">
                        <div class="layui-row">
                          <label
                            class="layui-form-label"
                            for="L_title">标题
                          </label>
                          <div class="layui-input-block">
                            <input
                              id="L_title"
                              v-model="title"
                              autocomplete="off"
                              class="layui-input"
                              name="title"
                              type="text"
                            />
                            <!-- <input type="hidden" name="id" value="{{d.edit.id}}"> -->
                          </div>
                        </div>
                        <div class="layui-row">
                          <span style="color: #c00;">{{ errors[0] }}</span>
                        </div>
                      </validation-provider>
                    </div>
                  </div>
                  <Editor
                    :initContent="content"
                    @changeContent="add"></Editor>
                  <div class="layui-form-item">
                    <div class="layui-inline">
                      <label class="layui-form-label">悬赏飞吻</label>
                      <div
                        class="layui-input-inline"
                        style="width: 190px;">
                        <div
                          :class="{'layui-form-selected': isSelect_fav}"
                          class="layui-unselect layui-form-select"
                          @click="isSelect_fav = !isSelect_fav">
                          <div class="layui-select-title">
                            <input
                              v-model="favList[favIndex]"
                              class="layui-input layui-unselect"
                              placeholder="请选择"
                              readonly
                              type="text"
                            />
                            <i class="layui-edge"></i>
                          </div>
                          <dl class="layui-anim layui-anim-upbit">
                            <dd
                              v-for="(item,index) in favList"
                              :key="'catalog' + index"
                              :class="{'layui-this': index === favIndex}"
                              @click="chooseFav(item, index)"
                            >{{ item }}
                            </dd>
                          </dl>
                        </div>
                      </div>
                      <div class="layui-form-mid layui-word-aux">发表后无法更改飞吻</div>
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <validation-provider
                      ref="codefield"
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
                      @click="validate().then(submit)">立即发布
                    </button>
                  </div>
                </form>
              </validation-observer>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CodeMix from '@/mixin/code'
import Editor from '@/components/modules/editor'
import { addPost } from '@/api'

export default {
  name: 'Add',
  mixins: [CodeMix],
  components: {
    Editor
  },
  data () {
    return {
      isSelect: false,
      isSelect_fav: false,
      catalogIndex: 1,
      favIndex: 0,
      catalogs: [
        {
          text: '请选择',
          value: ''
        },
        {
          text: '提问',
          value: 'ask'
        },
        {
          text: '分享',
          value: 'share'
        },
        {
          text: '讨论',
          value: 'discuss'
        },
        {
          text: '建议',
          value: 'advise'
        }
      ],
      favList: [20, 30, 50, 60, 80],
      title: '测试标题',
      content: ''
    }
  },
  mounted () {
  },
  methods: {
    chooseCatalog (item, index) {
      this.catalogIndex = index
    },
    chooseFav (item, index) {
      this.favIndex = index
    },
    add (val) {
      this.content = val
      // const saveData = {
      //   title: this.title,
      //   cataIndex: this.cataIndex,
      //   content: this.content,
      //   favIndex: this.favIndex
      // }
      // if (this.title.trim() !== '' && this.content.trim() !== '') {
      //   localStorage.setItem('addData', JSON.stringify(saveData))
      // }
    },
    async submit () {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }
      // 文章内容是否为空的判断
      if (this.content.trim() === '') {
        this.$alert('文章内容不得为空！')
        return
      }
      addPost({
        title: this.title,
        catalog: this.catalogs[this.catalogIndex].value,
        content: this.content,
        integral: this.favList[this.favIndex],
        code: this.code,
        sid: this.$store.state.sid
      }).then((res) => {
        if (res.code === 0) {
          // 清空已经发布的内容
          // localStorage.setItem('addData', '')
          this.$alert('发贴成功~~2s后跳转！')
          setTimeout(() => {
            this.$router.push('/')
          }, 2000)
        } else {
          this.$alert(res.msg)
        }
      })
    }
  }
}
</script>

<style
  lang="scss"
  scoped>
</style>
