<template>
        <v-main>
          <v-container
            class="fill-height"
            fluid
          >
            <v-row
              align="center"
              justify="center"
            >
              <v-col
                cols="12"
                md="4"
                sm="8"
              >
                <v-card class="elevation-12">
                  <v-toolbar
                    color="primary"
                    dark
                    flat
                  >
                    <v-toolbar-title>Ваше имя</v-toolbar-title>
                    <v-spacer></v-spacer>
                  </v-toolbar>
                  <v-card-text>
                    <v-form ref="form" v-model="valid">
                      <v-text-field
                        :rules="[rules.required, rules.onlyString, rules.maxLength]"
                        :counter="settings.maxUserNameLength"
                        clearable
                        autocomplete="off"
                        prepend-icon="mdi-account"
                        type="text"
                        v-model.trim="name"
                      ></v-text-field>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn block @click="handlerClickLogin" color="secondary">Войти</v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-main>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { required, creatorMaxLength, onlyString } from '../utility/validRules'

export default {
  name: 'Login',
  data: () => ({
    name: '',
    valid: false,
    rules: {}
  }),
  computed: {
    ...mapState('auth', ['userName']),
    ...mapState('settings', ['settings'])
  },
  created() {
    if (this.userName) this.$router.push({ name: 'main' })
    this.initRules()
  },
  methods: {
    ...mapActions('auth', ['login']),
    handlerClickLogin() {
      this.$refs.form.validate()
      if (!this.valid) return
      this.login(this.name)
      this.$router.push({ name: 'main' })
    },
    initRules() {
      this.rules.required = required
      this.rules.onlyString = onlyString
      this.rules.maxLength = creatorMaxLength(this.settings.maxUserNameLength)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
