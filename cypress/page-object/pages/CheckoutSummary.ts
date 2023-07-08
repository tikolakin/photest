import { BasePage } from '@pages/BasePage'
import CheckoutPayment from '@pages/CheckoutPayment'
import GiftCardPage from '@pages/GiftCardPage'

class CheckoutSummary extends BasePage {
  constructor() {
    super()
    this.path = '#confirm'
  }

  get editButton() {
    return cy.get('[data-action="click->confirm#editAction"]')
  }

  get voucherValue() {
    return cy.get('#confirm-voucher-value')
  }

  get paymentAmount() {
    return cy.get('#confirm-payment-amount')
  }

  get purchaserEmail() {
    return cy.get('#confirm-purchaser-email')
  }

  get recipientEmail() {
    return cy.get('#confirm-recipient-email')
  }

  get confirmButton() {
    return cy.get('[data-action="confirm#confirmAction"]')
  }

  confirmDetails() {
    this.confirmButton.click()
    return CheckoutPayment
  }

  edit() {
    this.editButton.click()
    return GiftCardPage
  }
}

export default new CheckoutSummary()
export { CheckoutSummary }
