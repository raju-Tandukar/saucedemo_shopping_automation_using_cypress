const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: '4o8ifj',
  chromeWebSecurity: false,
  pageLoadTimeout: 90000,
  defaultCommandTimeout: 20000,
  viewportWidth: 1280,
  viewportHeight: 800,
  video: false,
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    env: {
      "baseURL": "https://www.saucedemo.com/"
    },
    setupNodeEvents(on, config) {
    require('cypress-mochawesome-reporter/plugin')(on);
    return config;
  }
  },
})