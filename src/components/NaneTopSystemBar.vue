<template>
  <v-system-bar
    app
    color="grey lighten-1"
    v-if="isShowTopSystemBar"
  >
    <v-spacer></v-spacer>
    <span >Нет подключения к интернету</span>
    <v-icon class="ml-2">mdi-wifi-off</v-icon>
    <v-spacer></v-spacer>
  </v-system-bar>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'NaneTopSystemBar',
  data: () => ({
  }),
  computed: {
    ...mapState('notifications', ['isShowTopSystemBar'])
  }
}
</script>
<style lang="scss" scoped>
</style>
