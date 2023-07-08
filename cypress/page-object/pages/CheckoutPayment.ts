import { CheckoutSummary } from '@pages/CheckoutSummary'
import CheckoutSuccess from '@pages/CheckoutSuccess'

class CheckoutPayment extends CheckoutSummary {
  constructor() {
    super()
    this.path = '#payment'
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

  submitOrder() {
    this.submitButton.click()
    return CheckoutSuccess
  }
}

export default new CheckoutPayment()
