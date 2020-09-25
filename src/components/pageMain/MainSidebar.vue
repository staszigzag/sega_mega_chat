<template>
  <v-navigation-drawer
    :width="$vuetify.breakpoint.xs ? 150 : 270"
    clipped
    permanent
    disable-resize-watcher
    app
  >
    <template v-slot:prepend>
      <v-list-item @click.stop="TOGGLE_SHOW_DRAWER(true)">
        <v-list-item-content>
          <v-list-item-title>Выбрать чат</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon>mdi-comment-multiple-outline</v-icon>
        </v-list-item-action>
      </v-list-item>
      <v-list-item @click.stop="TOGGLE_SHOW_CREATE_ROOM(true)">
        <v-list-item-content>
          <v-list-item-title>Создать чат</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon>mdi-comment-plus-outline</v-icon>
        </v-list-item-action>
      </v-list-item>
      <v-divider
      />
    </template>
    <v-list dense>
      <v-list-item
        @click.stop="handlerClickRoom(room)"
        v-for="(room, idx) in activeRooms"
        :key="idx"
        :class="{secondary: room.isCurrent}"
      >
        <v-list-item-content>
          <v-list-item-title>{{room.name}}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon v-if="room.isCurrent">mdi-comment-check-outline</v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'MainSidebar',
  data() {
    return {
    }
  },
  computed: {
    ...mapState('rooms', ['activeRooms'])
  },
  methods: {
    ...mapMutations('modals', ['TOGGLE_SHOW_DRAWER']),
    ...mapMutations('modals', ['TOGGLE_SHOW_CREATE_ROOM']),
    ...mapMutations('rooms', ['SET_CURRENT_ROOM']),
    handlerClickRoom(room) {
      this.SET_CURRENT_ROOM(room)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
