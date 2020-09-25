<template>
  <v-main>
    <v-container
      class="fill-height pa-0"
      fluid
    >
      <p class="hint text-center body-1 grey--text text--lighten-1" v-if="!currentRoom">Нет выбранного чата...</p>
      <div v-else class="wrapper">
        <div ref="chat" class="chat">
          <v-row no-gutters >
            <v-col cols="12" :key="idx" v-for="(msg, idx) in currentRoom.history">
              <message :msg="msg" />
            </v-col>
          </v-row>
        </div>
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
                  :rules="[rules.required, rules.onlyString, rules.maxLength]"
                  v-model="msgText"
                  placeholder="Ваше сообщение"
                  outlined
                ></v-text-field>
              </v-form>
            </v-col>
            <v-col cols="auto" >
              <v-btn @click="handleClickSend()" class=""  x-large color="primary">
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
import { mapState, mapMutations, mapActions } from 'vuex'
import { required, creatorMaxLength, creatorMinLength, onlyString } from '../../utility/validRules'
import Message from './MainChat/Message'

export default {
  name: 'MainChat',
  data() {
    return {
      msgText: '',
      valid: false,
      rules: {}
    }
  },
  components: {
    Message
  },
  computed: {
    ...mapState('rooms', ['currentRoom']),
    ...mapState('settings', ['settings'])
  },
  watch: {
    'currentRoom.history'() {
      this.scrollToBottom()
    }
  },
  created() {
    this.initRules()
  },
  methods: {
    ...mapActions('socket', ['sendSocket']),
    scrollToBottom() {
      // прокрутка к последнему сообщению
      this.$nextTick(() => {
        const chat = this.$refs.chat
        chat.scrollTop = chat.scrollHeight
      })
    },
    handleClickSend() {
      this.$refs.form.validate()
      if (!this.valid) return
      this.sendSocket({
        room: this.currentRoom.name,
        text: this.msgText
      })
      this.$refs.form.reset()
    },
    initRules() {
      this.rules.required = required
      this.rules.onlyString = onlyString
      this.rules.maxLength = creatorMaxLength(this.settings.maxMessageLength)
      // this.rules.minLength = creatorMinLength(this.settings.minLength)
    }
  }
}
</script>

<style lang="scss" scoped>
  .wrapper{
    height: 95vh;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .chat{
    height:100%;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .hint{
    width: 100%;
  }
</style>
