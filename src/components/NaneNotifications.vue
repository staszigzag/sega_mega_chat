<template>
  <div>
    <transition-group appear mode="out-in" name="slide-fade">
      <v-snackbar
        v-for="(n, idx) in notifications"
        :key="n.id"
        :style="{top: `${widthSnackbar * idx}px`}"
        top
        right
        :color="n.color"
        :timeout="60000"
        :value="n"
      >
        {{ n.text }}
        <template v-slot:action >
          <v-btn
            text
            @click="DELETE_NOTIFICATION(n)"
          >
            Закрыть
          </v-btn>
        </template>
      </v-snackbar>
    </transition-group>

  </div>

</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'NaneNotifications',
  data: () => ({
    widthSnackbar: 55
  }),
  computed: {
    ...mapState('notifications', ['notifications'])
  },
  methods: {
    ...mapMutations('notifications', ['DELETE_NOTIFICATION'])
  }
}
</script>
<style lang="scss" scoped>
  @import '../scss/slideFadeAnimation.scss';
</style>
