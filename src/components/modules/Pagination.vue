<template>
  <div
    :class="{
      'flex-center': align==='center',
      'flex-start': align === 'left',
      'flex-end': align === 'right'
    }"
    class="d-flex">
    <div class="layui-box layui-laypage layui-laypage-default">
      <a
        v-show="showEnd"
        :class="{'layui-disabled': current === 0}"
        class="layui-laypage-prev"
        data-page="0"
        @click.prevent="home">
        <i
          v-if="showType === 'icon'"
          class="layui-icon layui-icon-prev"></i>
        <template v-else>首页</template>
      </a>
      <a
        :class="{'layui-disabled': current === 0}"
        @click.prevent="prev">
        <i
          v-if="showType === 'icon'"
          class="layui-icon layui-icon-left"></i>
        <template v-else>上一页</template>
      </a>
      <!--<a-->
      <!--  :class="[true ? theme: '', true ? 'active': '']"-->
      <!--  href="javascript:">1-->
      <!--</a>-->
      <!--
        current + 2 < page.length 显示...
        current - 2 > 1 显示...
      -->
      <!--
        1. 遵守vue风格指南, v-for不与v-if写在一起
        2. :key必须放在一个dom里面, 不可放在template里面
        3. template不形成dom元素
      -->
      <a
        v-if="pages.length > 5 && (current + 1 - 2) > 1"
        href="javascript:">
        ...
      </a>
      <template v-for="(item,index) in pages">
        <a
          v-if="(item>=(current + 1 - 2) && item <=(current + 1 + 2))"
          :key="item"
          :class="[current === index ? theme: '', current === index ? 'active': '']"
          href="javascript:">
          {{ item }}
        </a>
      </template>
      <a
        v-if="pages.length > 5 && (current + 1 + 2) < pages.length"
        href="javascript:">
        ...
      </a>
      <a
        :class="{'layui-disabled': current === pages.length - 1}"
        @click.prevent="next">
        <i
          v-if="showType === 'icon'"
          class="layui-icon layui-icon-right"></i>
        <template v-else>下一页</template>
      </a>
      <a
        v-show="showEnd"
        :class="{'layui-disabled': current === pages.length - 1}"
        class="layui-laypage-next"
        data-page="2"
        @click.prevent="end">
        <i
          v-if="showType === 'icon'"
          class="layui-icon layui-icon-next"></i>
        <template v-else>尾页</template>
      </a>
    </div>
    <!-- v-if="hasTotal"-->
    <div
      v-if="hasTotal"
      class="total">
      到第
      <input
        class="imooc-input"
        type="text"/>
      页 共 {{ total }} 条
    </div>
    <!--v-if="hasSelect"-->
    <div v-if="hasSelect">
      <div
        :class="{'layui-form-selected': isSelect}"
        class="layui-unselect layui-form-select"
        @click="changeFav">
        <div class="layui-select-title">
          <input
            v-model="options[optIndex]"
            class="layui-input layui-unselect"
            placeholder="请选择"
            readonly
            type="text"
          />
          <i class="layui-edge"></i>
        </div>
        <dl class="layui-anim layui-anim-upbit">
          <dd
            v-for="(item,index) in options"
            :key="'catalog' + index"
            :class="{'layui-this': index === optIndex}"
            @click="chooseFav(item, index)"
          >{{ item }}
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  props: {
    // left, center, right
    align: {
      type: String,
      default: 'right'
    },
    showType: {
      type: String,
      default: 'icon'
    },
    showEnd: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      default: 'layui-bg-green'
    },
    hasTotal: {
      type: Boolean,
      default: false
    },
    hasSelect: {
      type: Boolean,
      default: false
    },
    // options: {
    //   type: Array,
    //   default: () => [10, 20, 30, 50, 100]
    // },
    // 数据总数
    total: {
      type: Number,
      default: 0
    },
    // 当前页
    current: {
      type: Number,
      default: 0
    },
    // 每一页有几条
    size: {
      type: Number,
      default: 10
    }
  },
  data () {
    return {
      isSelect: false,
      optIndex: 0,
      pages: [],
      limit: 10,
      options: [10, 20, 30, 50, 100]
    }
  },
  mounted () {
    // 设置select的内容
    this.limit = this.size
    // 初始化分页
    this.initPages()
    // concat: 合并两个数组
    // sortBy: 排序
    // uniq: 数组去重, 返回去重后的数组
    this.options = _.uniq(_.sortBy(_.concat(this.options, this.size)))
    this.optIndex = this.options.indexOf(this.size)
  },
  methods: {
    prev () {
      if (this.current - 1 < 0) {
        this.current = 0
      }
      this.$emit('changeCurrent', this.current - 1)
    },
    next () {
      let cur = 0
      if (this.current + 1 > this.pages.length) {
        cur = this.pages.length - 1
      } else {
        cur = this.current + 1
      }
      this.$emit('changeCurrent', cur)
    },
    home () {
      this.$emit('changeCurrent', 0)
    },
    end () {
      this.$emit('changeCurrent', this.pages.length - 1)
    },
    // 计算一共要渲染多少个分页
    // range(1, 6) => [1,2,3,4,5]
    initPages () {
      const len = Math.ceil(this.total / this.limit)
      this.pages = _.range(1, len + 1)
    },
    chooseFav (item, index) {
      this.optIndex = index
    },
    changeFav () {
      this.isSelect = !this.isSelect
    }
  }
}
</script>

<style
  lang="scss"
  scoped>
.d-flex {
  display: flex;
  align-items: center;
}
.layui-laypage {
  a {
    margin-left: -1px !important;
    // &:first-child {
    //   border-right: 0;
    // }
    // &:last-child {
    //   border-left: 0;
    // }
    &.active {
      border-radius: 2px;
      position: relative;
      z-index: 100;
    }
  }
  .layui-bg-green {
    border-color: #009688;
  }
}
.total {
  color: rgba(51, 51, 51, 1);
  margin-left: 20px;
  position: relative;
  top: -2px;
}
.imooc-input {
  width: 30px;
  padding: 0 5px;
  height: 28px;
  line-height: 28px;
}

.layui-input {
  height: 28px;
  line-height: 28px;
}

.layui-input {
  height: 30px;
  line-height: 30px;
}

.layui-form-select {
  width: 80px;
  position: relative;
  top: -2.5px;
  margin-left: 10px;
}
</style>
