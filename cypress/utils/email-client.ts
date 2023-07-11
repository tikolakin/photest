import { Chance } from 'chance'

const chance = new Chance()

// Docs https://testmail.app/docs/#get-started
export default class EmailClient {
  private readonly ENDPOINT = 'https://api.testmail.app/api/json'
  private NAME_SPACE: string
  private API_KEY: string
  private emailData: { [key: string]: any } = {}
  private emailTag: string
  private emailAddress: string

  constructor(apiKey?: string, namespace?: string) {
    this.NAME_SPACE = Cypress.env('TESTMAIL_NAME_SPACE') || namespace
    this.API_KEY = Cypress.env('TESTMAIL_API_KEY') || apiKey
    const emailTag = this.generateEmailTag()
    const emailAddress = this.generateEmailAddress(emailTag)
    this.emailTag = emailTag
    this.emailAddress = emailAddress
  }

  private generateEmailTag() {
    return chance.string({
      length: 12,
      pool: 'abcdefghijklmnopqrstuvwxyz0123456789',
    })
  }

  private generateEmailAddress(emailTag) {
    return `${this.NAME_SPACE}.${emailTag}@inbox.testmail.app`
  }

  async fetchEmail(filter?: { timestamp_from?: string; subject?: RegExp }) {
    const params = {
      namespace: this.NAME_SPACE,
      apikey: this.API_KEY,
      // this helps searching target email https://testmail.app/docs/#amp-tag-string
      tag: this.emailTag,
      //limit: 1,
      livequery: true,
    }

    if (filter?.timestamp_from) {
      params['timestamp_from'] = filter.timestamp_from
    }

    cy.request({
      method: 'GET',
      url: this.ENDPOINT,
      qs: params,
      timeout: Cypress.config('responseTimeout') * 3, // Testmail could be slow
    }).then((res) => {
      if (filter?.subject) {
        const filteredEmail = res.body.emails.filter((email) => {
          return filter.subject.test(email.subject)
        })
        if (filteredEmail.length !== 0) {
          return (this.emailData = filteredEmail.pop())
        }
        return {}
      }
      if (res.body.emails.length !== 0) {
        return (this.emailData = res.body.emails.pop())
      }
      return {}
    })
  }

  getEmailAddress() {
    return this.emailAddress
  }

  getEmailHTML() {
    return this.emailData?.html
  }

  getEmailSubject() {
    return this.emailData?.subject
  }

  getEmailSender() {
    return this.emailData?.from_parsed[0].address
  }
}
