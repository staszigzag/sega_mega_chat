<template>
    <nane-modal
            :value="isShowCreateRoom"
            @cancel="TOGGLE_SHOW_CREATE_ROOM(false)"
    >
            <v-toolbar
              color="primary"
              dark
              flat
            >
              <v-toolbar-title>Имя нового чата</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text class="pt-5">
              <v-form ref="form" v-model="valid">
                <v-text-field
                  :counter="settings.maxRoomTitleLength"
                  :rules="[...rules]"
                  v-model.trim="nameRoom"
                  clearable
                  @keydown.prevent.enter="handlerClickCreate"
                  autocomplete="off"
                  prepend-icon="mdi-comment-processing-outline"
                  type="text"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn width="120px" @click="handlerClickCreate" color="secondary">Создать</v-btn>
              <v-btn width="120px" @click="handlerClickClose" outlined color="error">Закрыть</v-btn>
            </v-card-actions>
    </nane-modal>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { required, creatorMaxLength, onlyString, creatorExistRoomName } from '../../utility/validRules'
import NaneModal from '../NaneModal'

export default {
  name: 'MainModalCreateRoom',
  data() {
    return {
      nameRoom: '',
      valid: false,
      rules: []
    }
  },
  components: {
    NaneModal
  },
  computed: {
    ...mapState('settings', ['settings']),
    ...mapState('rooms', ['rooms']),
    ...mapState('modals', ['isShowCreateRoom'])
  },
  created() {
    this.initRules()
  },
  methods: {
    ...mapMutations('modals', ['TOGGLE_SHOW_CREATE_ROOM']),
    ...mapActions('rooms', ['createRoom']),
    async handlerClickCreate() {
      this.$refs.form.validate()
      if (!this.valid) return
      try {
        await this.createRoom(this.nameRoom)
      } finally {
        this.handlerClickClose()
      }
    },
    handlerClickClose() {
      this.$refs.form.reset()
      this.TOGGLE_SHOW_CREATE_ROOM(false)
    },
    initRules() {
      this.rules.push(
        required,
        onlyString,
        creatorMaxLength(this.settings.maxRoomTitleLength),
        creatorExistRoomName(this.rooms)
      )
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
