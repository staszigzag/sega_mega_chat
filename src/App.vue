<template>
  <v-app>
    <transition appear mode="out-in" name="opacity-fade">
      <v-progress-linear
        v-if="loading"
        indeterminate
        height="12"
        color="primary"
      ></v-progress-linear>
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

export default {
  name: 'App',
  data() {
    return {
      loading: true
    }
  },
  components: {
    NaneNotifications,
    NaneBottomSheet
  },
  methods: {
    ...mapActions('rooms', ['getRooms']),
    ...mapActions('settings', ['getSettings']),
    ...mapActions('auth', ['checkAuth', 'login'])
  },
  async created() {
    try {
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
