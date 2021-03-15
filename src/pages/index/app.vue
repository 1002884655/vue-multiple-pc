<template>
  <div id="app">
    <a href="./demo.html">to demo.html</a>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapUserState, mapActions: mapUserActions } = createNamespacedHelpers('user')
export default {
  components: {
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapUserState({
      UserInfo: x => x.UserInfo // 用户信息
    })
  },
  created () {
    this.Init()
  },
  mounted () {
    this.$nextTick(() => {
    })
  },
  methods: {
    ...mapUserActions([
      'GetUserInfoByToken'
    ]),
    Init () {
      this.GetUserInfoByToken({ params: { token: `6040529af14c2e325cd57cfd` } }).then(() => { })
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'page.scss';
</style>
