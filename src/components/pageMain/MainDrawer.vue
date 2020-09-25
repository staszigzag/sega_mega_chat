<template>
  <v-navigation-drawer
    width="400px"
    :value="isShowDrawer"
    @input="TOGGLE_SHOW_DRAWER($event)"
    fixed
    temporary
  >
    <template v-slot:prepend>
      <v-list-item class="text-center mt-2">
        <v-list-item-content>
          <v-list-item-title class="text-uppercase font-weight-medium">Список чатов</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider />
    </template>

    <v-list
      inlist
      subheader
      three-line
    >
      <template v-for="(room, idx) in rooms">
        <v-list-item
          :key="idx"
          @click.stop="handlerClickRoom(room)"
          :class="{'grey lighten-2': room.isActive}"
        >
          <v-list-item-content class="">
            <v-list-item-title>
              {{ room.name }}
            </v-list-item-title>
            <v-list-item-subtitle class="caption" v-if="room.lastMessage">
<!--              последние сообщение реактивно меняется в чатах которые активны-->
              «{{ room.lastMessage.text }}»
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-icon class="pt-4">
            <v-icon v-if="room.isActive" color="primary ">star</v-icon>
          </v-list-item-icon>
        </v-list-item>
        <v-divider  :key="idx +'x'"/>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'MainDrawer',
  data() {
    return {
    }
  },
  computed: {
    ...mapState('modals', ['isShowDrawer']),
    ...mapState('rooms', ['rooms'])
  },
  methods: {
    ...mapMutations('modals', ['TOGGLE_SHOW_DRAWER']),
    ...mapActions('rooms', ['initActiveRoom']),
    handlerClickRoom(room) {
      this.TOGGLE_SHOW_DRAWER(false)
      if (room.isActive) return
      this.initActiveRoom(room)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
