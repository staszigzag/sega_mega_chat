<template>
  <div ref="chat" class="chat">
    <v-row no-gutters >
      <v-col cols="12" >
        <infinite-loading
          direction="top"
          :distance="300"
          spinner="waveDots"
          class="align-self-center"
          :identifier="scrollId"
          @infinite="handlerInfiniteScroll">
          <p slot="no-more" class="text-center body-1 grey--text text--lighten-1">Начало истории сообщений</p>
        </infinite-loading>
      </v-col>
<!--      важно что бы id был уникален-->
      <v-col cols="12" :key="msg.created" v-for="msg in messagesForView">
        <main-chat-message :msg="msg" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import MainChatMessage from './MainChatMessage'
import InfiniteLoading from 'vue-infinite-loading'
import { Room } from '../../../models/Room'

export default {
  name: 'MainChatArea',
  data() {
    return {
      messagesForView: [],
      currentCountChunkMessages: 1,
      isNextMessages: true,
      scrollId: Date.now()
    }
  },
  components: {
    InfiniteLoading,
    MainChatMessage
  },
  props: {
    room: {
      type: Room,
      required: true
    }
  },
  computed: {
    ...mapState('settings', ['settings'])
  },
  watch: {
    'room.lastMessage'(msg) {
      // if (!this.room.isGetHistory) return
      // отслеживаем новые сообщения
      this.messagesForView.push(msg)
      this.scrollToBottom()
    },
    // ждем когда появится история
    'room.isGetHistory'(val) {
      if (!val) return
      this.isNextMessages = true
      this.pushNewChunkMessages()
      // сброс InfiniteLoading
      this.scrollId = Date.now()
      this.scrollToBottom()
    }
  },
  methods: {
    pushNewChunkMessages() {
      if (!this.room.history.length) {
        this.isNextMessages = false
        return
      }
      let start = this.room.history.length - (this.settings.sizeChunkMessages * this.currentCountChunkMessages)
      const end = this.room.history.length - (this.settings.sizeChunkMessages * (this.currentCountChunkMessages - 1))
      if (start < 0) {
        start = 0
        this.isNextMessages = false
      }
      const chunk = this.room.history.slice(start, end)
      console.warn({ start, end })
      this.messagesForView.unshift(...chunk)
      this.currentCountChunkMessages++
    },
    handlerInfiniteScroll($state) {
      if (this.isNextMessages) {
        this.pushNewChunkMessages()
        $state.loaded()
      } else {
        $state.loaded()
        $state.complete()
      }
    },
    scrollToBottom() {
      // прокрутка к последнему сообщению, не работает в v-show="false"
      this.$nextTick(() => {
        const chat = this.$refs.chat
        chat.scrollTop = chat.scrollHeight
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .chat{
    height:100%;
    overflow-y: scroll;
    overflow-x: hidden;
    border: 1px solid aqua;
  }
</style>
