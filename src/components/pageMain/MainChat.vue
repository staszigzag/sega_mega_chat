<template>
  <v-main>
    <v-container
      class="fill-height pa-0"
      fluid
    >
      <p class="hint text-center body-1 grey--text text--lighten-1" v-if="!currentRoom">Нет выбранного чата...</p>
      <div v-else class="wrapper">
<!--        все активные комнаты держим живыми, и переключаемся к нужной-->
        <main-chat-area
          v-for="(r, idx) in activeRooms"
          v-show="r.name === currentRoom.name"
          :room="r"
          :key="idx"
        />
        <div class="input-send">
          <v-row
            dense
            align="start"
            class="pa-3 pt-5"
          >
            <v-col cols>
              <v-form ref="form" v-model="valid">
                <v-text-field
                  clearable
                  autocomplete="off"
                  type="text"
                  :counter="settings.maxMessageLength"
                  :rules="[...rules]"
                  v-model.trim="msgText"
                  @keydown.prevent.enter="handleClickSend"
                  placeholder="Ваше сообщение"
                  outlined
                ></v-text-field>
              </v-form>
            </v-col>
            <v-col cols="auto">
              <v-btn @click="handleClickSend" x-large color="primary">
                <v-icon large>mdi-send</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </div>
    </v-container>
  </v-main>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { required, creatorMaxLength, onlyString } from '../../utility/validRules'
import MainChatArea from './MainChat/MainChatArea'

export default {
  name: 'MainChat',
  data() {
    return {
      msgText: '',
      valid: false,
      rules: []
    }
  },
  components: {
    MainChatArea
  },
  computed: {
    ...mapState('rooms', ['currentRoom']),
    ...mapState('rooms', ['activeRooms']),
    ...mapState('settings', ['settings'])
  },
  watch: {
    currentRoom() {
      if (this.$refs.form) this.$refs.form.resetValidation()
    }
  },
  created() {
    this.initRules()
  },
  methods: {
    ...mapActions('socket', ['sendSocket']),
    async handleClickSend() {
      this.$refs.form.validate()
      if (!this.valid) return
      try {
        await this.sendSocket({
          room: this.currentRoom.name,
          text: this.msgText
        })
        this.$refs.form.reset()
      } catch (e) {
        console.dir(e)
      }
    },
    initRules() {
      this.rules.push(
        required,
        onlyString,
        creatorMaxLength(this.settings.maxMessageLength)
        // creatorMinLength(this.settings.minLength)
      )
    }
  }
}
</script>

<style lang="scss" scoped>
  .wrapper{
    height: calc(100vh - 60px);
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .hint{
    width: 100%;
  }
</style>
