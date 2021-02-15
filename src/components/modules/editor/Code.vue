<template>
  <transition name="fade">
    <div
      v-show="isShow"
      class="layui-layer-page layui-layer-prompt edit-content">
      <div class="layui-layer-title">请贴入代码或任意文本</div>
      <div class="layui-layer-content">
        <textarea
          id="inputItem"
          v-model="code"
          :style="{'width': this.width + 'px', 'height': this.height + 'px'}"
          class="layui-layer-input"
          v-on:keydown.enter="$event.stopPropagation()"
        ></textarea>
      </div>
      <span
        class="layui-layer-setwin"
        @click="cancel()">
        <a
          class="layui-layer-ico layui-layer-close layui-layer-close1"
          href="javascript:;"></a>
      </span>
      <div class="layui-layer-btn layui-layer-btn-">
        <a
          class="layui-layer-btn0"
          @click.prevent="submit()">确定
        </a>
        <a
          class="layui-layer-btn1"
          @click.prevent="cancel()">取消
        </a>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Code',
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      code: ''
    }
  },
  methods: {
    submit () {
      if (this.code === '') {
        document.getElementById('inputItem').focus()
        this.$pop('shake', '请输入引用内容')
        return
      }
      this.$emit('addEvent', this.code)
      setTimeout(() => {
        this.code = ''
        this.$emit('closeEvent')
      }, 0)
    },
    cancel () {
      this.code = ''
      this.$emit('closeEvent')
    }
  }
}
</script>

<style scoped>
</style>
