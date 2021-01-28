<template>
  <!-- 上传头像 -->
  <div class="layui-form layui-form-pane layui-tab-item layui-show">
    <div class="layui-form-item">
      <div class="avatar-add">
        <p>建议尺寸168*168，支持jpg、png、gif，最大不能超过50KB</p>
        <label
          class="layui-btn upload-img"
          for="uploadImg">
          <i class="layui-icon">&#xe67c;</i>
          <input
            v-show="false"
            id="uploadImg"
            accept="image/png, image/gif, image/jpg"
            type="file"
            @change="_uploadImgChange">
          上传头像
        </label>
        <img :src="pic"/>
        <span class="loading"></span>
      </div>
    </div>
  </div>
</template>

<script>
import {
  uploadImg,
  updateUserInfo
} from '@/api'
import { mapGetters } from 'vuex'

export default {
  name: 'pic-upload',
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['pic'])
  },
  mounted () {},
  methods: {
    async _uploadImgChange (e) {
      const file = e.target.files
      if (file.length > 0) {
        const formData = new FormData()
        formData.append('file', file[0])
        const resUploadImg = await uploadImg(formData)
        if (resUploadImg.code === 0) {
          // this.pic = baseUrl + res.data
          // 更新用户资料
          updateUserInfo({ pic: resUploadImg.data }).then(res => {
            if (res.code === 0) {
              // 修改全局的 store 内的用户基础信息
              // const user = {
              //   ...this.$store.state.userInfo
              // }
              // user.pic = this.pic
              // this.$store.commit('setUserInfo', user)
              this.$store.commit('setUserPic', resUploadImg.data)

              this.$alert('图片上传成功')
            }
          })
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
</style>
