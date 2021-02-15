<template>
  <div class="edit-wrap">
    <div class="layui-form-item layui-form-text">
      <div class="layui-input-block">
        <div
          ref="icons"
          class="layui-unselect fly-edit">
          <span @click="choose(0)">
            <i class="iconfont icon-yxj-expression"></i>
          </span>
          <span @click="choose(1)">
            <i class="iconfont icon-tupian"></i>
          </span>
          <span @click="choose(2)">
            <i class="iconfont icon-lianjie"></i>
          </span>
          <span
            class="quote"
            @click="choose(3)">”</span>
          <span @click="choose(4)">
            <i class="iconfont icon-emwdaima"></i>
          </span>
          <span @click="addHr()">hr</span>
          <span @click="choose(6)">
            <i class="iconfont icon-yulan1"></i>
          </span>
        </div>
        <textarea
          id="edit"
          ref="textEdit"
          v-model="content"
          class="layui-textarea fly-editor"
          name="content"
          @blur="blurEvent()"
          @focus="focusEvent()"/>
      </div>
    </div>
    <div ref="modal">
      <Face
        :ctrl="ctrl"
        :isShow="isActive === 0"
        @addEvent="addFace"
        @closeEvent="closeEvent"/>
      <ImgUpload
        :isShow="isActive === 1"
        @addEvent="addImg"
        @closeEvent="closeEvent"/>
      <Link
        :isShow="isActive === 2"
        @addEvent="addLink"
        @closeEvent="closeEvent"/>
      <Quote
        :isShow="isActive === 3"
        @addEvent="addQuote"
        @closeEvent="closeEvent"/>
      <Code
        :height="codeHeight"
        :isShow="isActive === 4"
        :width="codeWidth"
        @addEvent="addCode"
        @closeEvent="closeEvent"/>
      <Preview
        :content="content"
        :isShow="isActive === 6"
        @closeEvent="closeEvent"/>
    </div>
  </div>
</template>

<script>
import Face from '@/components/modules/editor/Face'
import ImgUpload from '@/components/modules/editor/ImgUpload'
import Link from '@/components/modules/editor/Link'
import Quote from '@/components/modules/editor/Quote'
import Code from '@/components/modules/editor/Code'
import Preview from '@/components/modules/editor/Preview'

export default {
  name: 'Editor',
  props: ['initContent'],
  components: {
    Preview,
    Code,
    Quote,
    Link,
    ImgUpload,
    Face
  },
  data () {
    return {
      faceStatus: false,
      ctrl: undefined,
      isActive: undefined,
      codeWidth: 400,
      codeHeight: 200,
      content: ' face[怒] face[微笑]这是测试的内容',
      // 光标的位置
      pos: ''
    }
  },
  watch: {
    initContent (newVal, oldVal) {
      this.content = newVal
    }
  },
  updated () {
    this.$emit('changeContent', this.content)
    // console.log('content' + this.content)
  },
  mounted () {
    this.$nextTick(() => {
      document
        .querySelector('body')
        .addEventListener('click', this.handleBodyClick)
    })
  },
  methods: {
    // textarea获取焦点和失去焦点的时候, 需要调用
    // 获取textarea失去焦点的光标位置
    getPos () {
      let cursorPos = 0
      const element = document.getElementById('edit')
      // 兼容IE浏览器
      if (document.selection) {
        const selectRange = document.selection.createRange()
        selectRange.moveStart('character', -element.value.length)
        cursorPos = selectRange.text.length
      } else if (element.selectionStart || element.selectionStart === '0') {
        cursorPos = element.selectionStart
      }
      this.pos = cursorPos
    },
    focusEvent () {
      this.getPos()
    },
    blurEvent () {
      this.getPos()
    },
    insert (val) {
      if (typeof val === 'undefined') return
      const tmp = this.content.split('')
      tmp.splice(this.pos, 0, val)
      this.content = tmp.join('')
    },
    // 添加表情
    addFace (item) {
      const insertContent = ` face${item}`
      this.insert(insertContent)
      this.pos += insertContent.length
    },
    // 添加图片
    addImg (item) {
      const insertContent = ` img[${item}]`
      this.insert(insertContent)
      this.pos += insertContent.length
    },
    // 增加链接
    addLink (item) {
      const insertContent = ` a(${item})[${item}]`
      this.insert(insertContent)
      this.pos += insertContent.length
    },
    // 增加代码
    addCode (item) {
      const insertContent = ` \n[pre]\n${item}\n[/pre]`
      this.insert(insertContent)
      this.pos += insertContent.length
    },
    // 添加hr
    addHr () {
      this.insert('\n[hr]')
      this.pos += 5
    },
    // 增加引用
    addQuote (item) {
      const insertContent = ` \n[quote]\n${item}\n[/quote]`
      this.insert(insertContent)
      this.pos += insertContent.length
    },
    closeEvent () {
      this.isActive = undefined
    },
    choose (index) {
      if (index === this.isActive) {
        this.closeEvent()
      } else {
        this.isActive = index
      }
    },
    handleBodyClick (e) {
      e.stopPropagation()
      // 点击body以外, 并且点击的不是icon内的和本组件以外的
      if (!(this.$refs.icons.contains(e.target) || this.$refs.modal.contains(e.target))) {
        this.closeEvent()
      }
    }
  },
  beforeDestroy () {
    document
      .querySelector('body')
      .removeEventListener('click', this.handleBodyClick)
  }
}
</script>

<style lang="scss">
@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes bounceOut {
  0% {
    transform: scale(1);
  }
  30% {
    transform: scale(1.05);
  }
  100% {
    opacity: 0;
    transform: scale(0.7);
  }
}

.fade-leave-active {
  animation: bounceOut 0.3s;
}

.fade-enter-active,
.fade-enter-to {
  animation: bounceIn 0.3s;
}

.fly-editor {
  height: 260px;
}
.quote {
  font-size: 22px;
  vertical-align: middle;
  position: relative;
  top: 4px;
}
.edit-wrap {
  position: relative;
}
.edit-content {
  position: absolute;
  top: 45px;
  left: 0;
  z-index: 100;
  background: #fff;
}
.icon-emwdaima {
  position: relative;
  top: 2px;
}
.layui-layer-prompt {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}
</style>
