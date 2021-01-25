<template>
  <!-- 上传头像 -->
  <div class="layui-form layui-form-pane layui-tab-item layui-show">
    <div class="layui-form-item">
      <div class="avatar-add">
        <p>建议尺寸168*168，支持jpg、png、gif，最大不能超过50KB</p>
        <label
          class="layui-btn upload-img"
          for="uploadImg"
          type="button">
          <i class="layui-icon">&#xe67c;</i>
          <!--          -->
          <input
            v-show="false"
            id="uploadImg"
            accept="image/png, image/gif, image/jpg"
            type="file"
            @change="_uploadImgChange">
          上传头像
        </label>
        <img src="https://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg"/>
        <span class="loading"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { uploadImg } from '@/api'

export default {
  name: 'pic-upload',
  data () {
    return {}
  },
  mounted () {},
  methods: {
    async _uploadImgChange (e) {
      const file = e.target.files
      const formData = new FormData()
      formData.append('file', file[0])
      const res = await uploadImg(formData)
      console.log(res)
    }
  }

}
</script>

<style
  lang="scss"
  scoped>
</style>
