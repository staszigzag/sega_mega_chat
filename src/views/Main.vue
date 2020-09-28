<template>
  <v-app>
    <main-header/>
    <main-sidebar/>
    <main-drawer/>
    <main-chat/>
    <main-modal-creat-room />
  </v-app>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import MainModalCreatRoom from '../components/pageMain/MainModalCreateRoom'
import MainHeader from '../components/pageMain/MainHeader'
import MainDrawer from '../components/pageMain/MainDrawer'
import MainSidebar from '../components/pageMain/MainSidebar'
import MainChat from '../components/pageMain/MainChat'

export default {
  name: 'Main',
  data: () => ({
  }),
  components: {
    MainModalCreatRoom,
    MainHeader,
    MainDrawer,
    MainSidebar,
    MainChat
  },
  computed: {
    ...mapState('auth', ['userName'])
  },
  created() {
    this.init()
  },
  methods: {
    ...mapMutations('modals', ['TOGGLE_SHOW_CREATE_ROOM']),
    ...mapActions('socket', ['connectSocket', 'sendSocket']),
    async init() {
      if (this.userName) {
        // поднимаем сокет только для зологининых юзеров
        this.connectSocket(this.userName)
      } else {
        this.$router.push({ name: 'login' })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
