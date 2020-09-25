import Vue from 'vue'
// import Vuetify from 'vuetify/lib'
import Vuetify from 'vuetify/lib/framework'
import ru from 'vuetify/src/locale/ru.ts'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)
export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: process.env.VUE_APP_PRIMARY_COLOR || colors.teal,
        secondary: process.env.VUE_APP_SECONDARY_COLOR || colors.teal.lighten2,
        accent: colors.indigo.base
      }
    }
  },
  lang: {
    locales: { ru },
    current: 'ru'
  }
})
