const { defineConfig } = require("cypress")

module.exports = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 720,

  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: "http://localhost:8080",
    supportFile: false
  },

  component: {
    devServer: {
      framework: "vue-cli",
      bundler: "webpack"
    }
  }
})
