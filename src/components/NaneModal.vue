<template>
  <v-dialog
    :value="value"
    @click:outside="handlerClickCancel"
    @keydown.esc="handlerClickCancel"
    :max-width="800"
  >
    <v-card class="elevation-12">
<!--      <v-btn-->
<!--        fab-->
<!--        small-->
<!--        class="d-block ml-auto mr-lg-n8"-->
<!--        text-->
<!--        @click="handlerClickCancel"-->
<!--      >-->
<!--        <v-icon x-large>close</v-icon>-->
<!--      </v-btn>-->
      <slot />
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  name: 'NaneModal',
  data() {
    return {
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handlerClickCancel() {
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
