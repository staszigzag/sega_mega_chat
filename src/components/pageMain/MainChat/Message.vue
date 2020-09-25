<template>
  <v-card
    class="ma-2 "
    width="70%"
    :class="{
      'align-self-end': isSudo
    }"
    :color="isSudo ? 'grey lighten-1 ml-auto' : 'grey lighten-3'"
    :dark="isSudo"
  >
    <v-card-title class="body-2 pa-2">
      <v-icon class="mr-2" v-if="!isSudo">mdi-account</v-icon>
      {{msg.sender}}
    </v-card-title>
    <v-card-text class="body-2 pa-2">{{msg.text}}</v-card-text>
<!--    TODO время-->
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Message',
  data() {
    return {
    }
  },
  props: {
    msg: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState('auth', ['userName']),
    isSudo() {
      return this.msg.sender === this.userName
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
