import { getList } from '@/api'

export default {
  data () {
    return {
      status: '',
      tag: '',
      sort: 'created',
      page: 0,
      limit: 20,
      isTop: 0,
      catalog: '',
      isEnd: false,
      isRepeat: false,
      current: ''
    }
  },
  mounted () {
    const catalog = this.$route.params.catalog
    if (typeof catalog !== 'undefined' && catalog !== '') {
      this.catalog = catalog
    }
    // this._getLists()
  },
  methods: {
  }
}
