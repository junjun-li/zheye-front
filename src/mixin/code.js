import { getCaptcha } from '@/api'
import { v4 as uuid } from 'uuid'
import {
  ValidationProvider,
  ValidationObserver
} from 'vee-validate'

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      code: '',
      svg: ''
    }
  },
  mounted () {
    let sid = ''
    if (localStorage.getItem('sid')) {
      sid = localStorage.getItem('sid')
    } else {
      sid = uuid()
      localStorage.setItem('sid', sid)
    }
    this.$store.commit('setSid', sid)
    this._getCaptcha()
  },
  methods: {
    _getCaptcha () {
      const sid = this.$store.state.sid
      getCaptcha(sid).then((res) => {
        if (res.code === 0) {
          this.svg = res.data.data
        }
      })
    }
  }
}
