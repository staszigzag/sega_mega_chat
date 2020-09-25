<template>
  <v-app-bar
    app
    fixed
    clipped-left
    color="primary"
    dark
  >
    <v-toolbar-title>Сега Мега Ай-нане чат !!</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-icon class="mr-2">mdi-comment-account-outline</v-icon>
    <v-toolbar-title class="font-weight-bold text-h5 text-uppercase ">
      {{userName}}
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn outlined dark class="ma-2" @click="handlerClickLogout">
      выход
      <v-icon right>mdi-exit-to-app</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'MainHeader',
  data() {
    return {
    }
  },
  computed: {
    ...mapState('auth', ['userName'])
  },
  methods: {
    ...mapActions('auth', ['logout']),
    ...mapActions('socket', ['disconnectSocket']),
    ...mapMutations('rooms', ['RESET_ROOMS']),
    ...mapActions('notifications', ['confirmUserAction']),
    async handlerClickLogout() {
      const success = await this.confirmUserAction()
      if (!success) return
      try {
        await this.logout()
        // глушим сокет
        await this.disconnectSocket()
        this.RESET_ROOMS()
      } finally {
        this.$router.push({ name: 'login' })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
