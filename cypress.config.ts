import { defineConfig } from 'cypress'
import * as dotenv from 'dotenv'
dotenv.config()

const BASE_URL: string = process.env.BASE_URL || ''
const TESTMAIL_NAME_SPACE: string = process.env.TESTMAIL_NAME_SPACE || ''
const TESTMAIL_API_KEY: string = process.env.TESTMAIL_API_KEY || ''

export default defineConfig({
  fixturesFolder: 'cypress/fixtures',
  modifyObstructiveCode: false,
  supportFolder: 'cypress/support',
  videosFolder: 'cypress/videos',
  screenshotsFolder: 'cypress/screenshots',
  numTestsKeptInMemory: 0, // Disabling snapshotting as this feature causing rerendering of the giftcard checkout page, see https://github.com/cypress-io/cypress/issues/7187
  e2e: {
    baseUrl: BASE_URL,
  },
  viewportWidth: 1280,
  viewportHeight: 800,
  chromeWebSecurity: false, // ¯\_(ツ)_/¯ https://github.com/cypress-io/cypress/issues/136
  watchForFileChanges: false,
  env: {
    TESTMAIL_NAME_SPACE,
    TESTMAIL_API_KEY,
  },
})
