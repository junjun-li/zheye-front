<template>
  <div>
    <ul class="fly-list">
      <li
        v-for="(item,index) in items"
        :key="'listitem' + index">
        <a
          class="fly-avatar"
          href="user/home.html">
          <img
            alt="贤心"
            src="https://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg"
          />
        </a>
        <h2>
          <a class="layui-badge">{{ item.catalog }}</a>
          <a href="jie/detail.html">{{ item.title }}</a>
        </h2>
        <div class="fly-list-info">
          <a
            href="user/home.html"
            link>
            <cite>{{ item.uid.name }}</cite>
            <!--<i class="iconfont icon-renzheng" title="认证信息：XXX"></i>-->
            <i
              v-if="item.uid.isVip !== '0'"
              class="layui-badge fly-badge-vip"
            >{{ 'VIP' + item.uid.isVip }}
            </i>
          </a>
          <span>{{ item.created | moment }}</span>

          <span
            class="fly-list-kiss layui-hide-xs"
            title="悬赏飞吻">
            <i class="iconfont icon-kiss"></i>
            {{ item.fav }}
          </span>
          <span
            v-show="item.status === '1'"
            class="layui-badge fly-badge-accept layui-hide-xs">
            已结
          </span>
          <span class="fly-list-nums">
            <i
              class="iconfont icon-pinglun1"
              title="回答"></i>
            {{ item.answer }}
          </span>
        </div>
        <div
          v-show="item.tags.length > 0"
          class="fly-list-badge">
          <span
            v-for="(tag, index) in item.tags"
            :key="'tag' + index"
            :class="tag.class"
            class="layui-badge"
          >{{ tag.name }}</span>
        </div>
      </li>
    </ul>
    <div
      v-show="isShow"
      style="text-align: center">
      <div
        v-if="!isEnd"
        class="laypage-main">
        <a
          class="laypage-next"
          @click.prevent="more()">更多求解
        </a>
      </div>
      <div
        v-else
        class="no-more gray">没有更多了
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import 'moment/locale/zh-cn'

import _ from 'lodash'

export default {
  name: 'ListItem',
  props: {
    lists: {
      default: () => [],
      type: Array
    },
    isShow: {
      default: true,
      type: Boolean
    },
    isEnd: {
      default: false,
      type: Boolean
    }
  },
  computed: {
    items () {
      _.map(this.lists, (item) => {
        switch (item.catalog) {
          case 'ask':
            item.catalog = '提问'
            break
          case 'share':
            item.catalog = '分享'
            break
          case 'logs':
            item.catalog = '动态'
            break
          case 'notice':
            item.catalog = '公告'
            break
          case 'advise':
            item.catalog = '建议'
            break
          case 'discuss':
            item.catalog = '交流'
            break
        }
      })
      return this.lists
    }
  },
  methods: {
    more () {
      this.$emit('nextPage')
    }
  },
  filters: {
    moment (date) {
      // 超过7天，显示日期
      if (moment(date).isBefore(moment().subtract(7, 'days'))) {
        return moment(date).format('YYYY-MM-DD')
      } else {
        // 1小前，xx小时前，X天前
        return moment(date).from(moment())
      }
    }
  }
}
</script>

<style
  lang="scss"
  scoped>
.no-more {
  font-size: 16px;
  padding: 30px 0;
}
</style>
