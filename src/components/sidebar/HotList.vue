<template>
  <div>
    <dl class="fly-panel fly-list-one">
      <dt class="fly-panel-title">本周热议</dt>
      <dd v-for="(item,index) in topWeekList" :key="index">
        <a href="jie/detail.html">{{item.title}}</a>
        <span>
          <i class="iconfont icon-pinglun1"></i> {{item.answer}}
        </span>
      </dd>

      <!-- 无数据时 -->
      <!--
        <div class="fly-none">没有相关数据</div>
      -->
    </dl>
  </div>
</template>

<script>
import { getTopWeek } from '@/api'
export default {
  name: 'hotList',
  data () {
    return {
      topWeekList: []
    }
  },
  mounted () {
    this._getTopWeek()
  },
  methods: {
    async _getTopWeek () {
      const res = await getTopWeek()
      this.topWeekList = res.data
    }
  }

}
</script>

<style lang="scss"
       scoped>
</style>
