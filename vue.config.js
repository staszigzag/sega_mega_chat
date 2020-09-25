module.exports = {
  configureWebpack: {
  },
  transpileDependencies: [
    'vuetify'
  ],
  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @import "@/scss/_variables.scss";
        `
      }
    }
  }
}
