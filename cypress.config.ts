import { defineConfig } from 'cypress'

// TODO: resolve base url based on env
export default defineConfig({
  fixturesFolder: 'cypress/fixtures',
  modifyObstructiveCode: false,
  supportFolder: 'cypress/support',
  videosFolder: 'cypress/videos',
  screenshotsFolder: 'cypress/screenshots',
  numTestsKeptInMemory: 0, // Disabling snapshotting as this feature causing rerendering of the giftcard checkout page, see https://github.com/cypress-io/cypress/issues/7187
  e2e: {
    baseUrl: '',
    experimentalStudio: true,
  },
})
