<template>
  <v-bottom-sheet :value="!!userAction" persistent inset>
    <v-sheet class="text-center py-8">
      <p v-if="userAction" class="text-h6">{{ userAction.text }}</p>
      <v-btn width="120px"  @click="handlerClickConfirm(true)" class="mx-2" color="secondary">да</v-btn>
      <v-btn width="120px" @click="handlerClickConfirm(false)" class="mx-2" outlined color="error">нет</v-btn>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'NaneBottomSheet',
  data: () => ({
  }),
  computed: {
    ...mapState('notifications', ['userAction'])
  },
  methods: {
    ...mapActions('notifications', ['resolveConfirmUserAction']),
    handlerClickConfirm(isConfirm) {
      this.resolveConfirmUserAction(isConfirm)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
