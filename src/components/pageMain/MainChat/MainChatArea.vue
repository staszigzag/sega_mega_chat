<template>
  <div ref="chat" class="chat">
    <v-row no-gutters >
      <v-col cols="12" >
        <infinite-loading
          direction="top"
          :distance="300"
          spinner="waveDots"
          class="align-self-center"
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
      lengthHistoryMessages: 0,
      isNextMessages: true
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
    'room.history'() {
      // отслеживаем новые сообщения
      const newMsg = this.room.history[this.room.history.length - 1]
      this.messagesForView.push(newMsg)
      this.scrollToBottom()
    }
  },
  created() {
    // запоминаем длину истории,что бы при получении новых сооющений, они не влияли на InfiniteScroll
    this.lengthHistoryMessages = this.room.history.length
    this.pushNewChunkMessages()
    this.scrollToBottom()
  },
  methods: {
    pushNewChunkMessages() {
      let start = this.lengthHistoryMessages - (this.settings.sizeChunkMessages * this.currentCountChunkMessages)
      const end = this.lengthHistoryMessages - (this.settings.sizeChunkMessages * (this.currentCountChunkMessages - 1))
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
      // прокрутка к последнему сообщению
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
