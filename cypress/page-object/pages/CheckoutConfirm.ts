import { CheckoutSummary } from '@components'
import { BasePage, CheckoutPayment } from '@pages'

export default class CheckoutConfirm extends BasePage {
  path = '#confirm'
  summary: CheckoutSummary

  constructor() {
    super()
    this.summary = new CheckoutSummary()
  }

  get confirmButton() {
    return cy.get('[data-action="confirm#confirmAction"]')
  }

  confirmDetails() {
    this.confirmButton.click()
    this.loadingSpinner.should('be.visible')
    return new CheckoutPayment()
  }
}
