<template>
  <v-app>
    <nane-top-system-bar />
    <transition appear mode="out-in" name="opacity-fade">
      <v-progress-circular
        v-if="loading"
        class="ma-auto"
        size="280"
        color="primary"
        width="12"
        indeterminate
      ></v-progress-circular>
      <router-view v-else/>
    </transition>

    <nane-notifications/>
    <nane-bottom-sheet/>
  </v-app>
</template>

<script>

import { mapActions } from 'vuex'
import NaneNotifications from './components/NaneNotifications'
import NaneBottomSheet from './components/NaneBottomSheet'
import NaneTopSystemBar from './components/NaneTopSystemBar'

export default {
  name: 'App',
  data() {
    return {
      loading: true
    }
  },
  components: {
    NaneNotifications,
    NaneBottomSheet,
    NaneTopSystemBar
  },
  methods: {
    ...mapActions('rooms', ['getRooms']),
    ...mapActions('settings', ['getSettings']),
    ...mapActions('auth', ['checkAuth', 'login']),
    ...mapActions('notifications', ['initWatchIsOnline'])
  },
  async created() {
    try {
      // TODO повторная синхронизация при появлении сети
      this.initWatchIsOnline()
      await this.getSettings()
      await this.getRooms()
      const userName = await this.checkAuth()

      if (userName) {
        this.login(userName)
      } else {
        const name = 'login'
        if (this.$route.name !== name) this.$router.push({ name })
      }
    } finally {
      this.loading = false
    }
  }
}
</script>
<style lang="scss" scoped>
  @import './scss/slideFadeAnimation.scss';
</style>
