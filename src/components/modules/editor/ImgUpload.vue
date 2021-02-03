<template>
  <transition name="fade">
    <div
      v-show="isShow"
      class="layui-layer layui-layer-page layui-layer-border edit-content">
      <div class="layui-layer-title">插入图片</div>
      <div class="layui-layer-content">
        <ul class="layui-form layui-form-pane">
          <li class="layui-form-item">
            <label class="layui-form-label">URL</label>
            <div class="layui-input-inline">
              <input
                id="fileInput"
                v-model="pic"
                class="layui-input"
                placeholder="粘贴图片地址或者点击上传"
                type="text"
              />
            </div>
            <button
              class="layui-btn layui-btn-primary"
              type="button">
              <label for="uploadImg">
                <i class="layui-icon layui-icon-upload"></i>
                上传图片
              </label>
            </button>
            <input
              id="uploadImg"
              class="layui-upload-file"
              name="file"
              type="file"
              @change="_uploadImgChange"
            />
          </li>
          <li class="layui-form-item">
            <button
              class="layui-btn"
              type="button"
              @click="submit">
              确认
            </button>
          </li>
        </ul>
      </div>
      <span
        class="layui-layer-setwin">
        <a
          class="layui-layer-ico layui-layer-close layui-layer-close1"
          href="javascript:void(0)"></a>
      </span>
    </div>
  </transition>
</template>

<script>
import config from '@/config'
import {
  uploadImg
} from '@/api'
const baseUrl = process.env.NODE_ENV === 'development'
  ? config.baseUrl.dev
  : config.baseUrl.pro

export default {
  name: 'ImgUpload',
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      pic: ''
    }
  },
  computed: {
  },
  methods: {
    submit () {
      if (this.pic === '') {
        document.getElementById('fileInput').focus()
        this.$pop('shake', '请上传图片或者复制图片链接')
        return
      }
      this.$emit('addEvent', this.pic)
      setTimeout(() => {
        this.pic = ''
        this.$emit('closeEvent')
      }, 0)
    },
    async _uploadImgChange (e) {
      const file = e.target.files
      if (file.length > 0) {
        const formData = new FormData()
        formData.append('file', file[0])
        const res = await uploadImg(formData)
        if (res.code === 0) {
          this.pic = baseUrl + res.data
          document.getElementById('uploadImg').value = ''
        }
      }
    }
  }
}
</script>

<style
  lang="scss"
  scoped>
.layui-form-item {
  text-align: center;
}
.layui-form-pane {
  margin: 20px;
}
</style>
