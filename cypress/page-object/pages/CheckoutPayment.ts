import { CheckoutSummary } from '@components'
import { BasePage, CheckoutSuccess } from '@pages'

export default class CheckoutPayment extends BasePage {
  path = '#payment'
  summary: CheckoutSummary

  constructor() {
    super()
    this.summary = new CheckoutSummary()
  }

  get paymentIframe() {
    return cy.iframe('[id^="hostedform-"]')
  }

  get cardName() {
    return this.paymentIframe.find('#card-name')
  }

  get cardZip() {
    return this.paymentIframe.find('#card-zip')
  }

  get cardNumber() {
    return this.paymentIframe.find('#card-number')
  }

  get cardExpiry() {
    return this.paymentIframe.find('#card-expiry')
  }

  get cardCvv() {
    return this.paymentIframe.find('#card-security')
  }

  get submitButton() {
    return this.paymentIframe.find('#submitButton')
  }

  fillName(value) {
    this.cardName.type(value)
    return this
  }

  fillZipCode(value) {
    this.cardZip.type(value)
    return this
  }

  fillNumber(value) {
    this.cardNumber.type(value)
    return this
  }

  fillExpiryDate(value) {
    this.cardExpiry.type(value)
    return this
  }

  fillCvv(value) {
    this.cardCvv.type(value)
    return this
  }

  submitOrder(failure?: true) {
    this.submitButton.click()

    this.loadingSpinner.as('loader')
    cy.get('@loader').should('be.visible')

    if (failure) return

    cy.get('@loader', {
      timeout: Cypress.config('defaultCommandTimeout') * 4, // occasionally it takes long time to process order payment
    }).should('not.exist')

    return new CheckoutSuccess()
  }
}
