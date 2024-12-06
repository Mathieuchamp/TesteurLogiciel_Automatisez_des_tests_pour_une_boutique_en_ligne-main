const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'h77ei4',
  env: {
    apiUrl: "http://localhost:8081",
  },
  e2e: {
    setupNodeEvents(on, config) {
      const mochawesome = require('cypress-mochawesome-reporter/plugin');
      mochawesome(on);
    },
    baseUrl: "http://localhost:8080/",
    reporter: "cypress-mochawesome-reporter",
    reporterOptions: {
      reportDir: "cypress/reports",
      overwrite: false,
      html: true,
      json: true,
    },
  },
});
