import { BasePage, GiftCardPage } from '@pages'

export default class CheckoutSuccess extends BasePage {
  path = '#success'

  constructor() {
    super()
  }

  get successContainer() {
    return cy.get('[data-controller="success"]', {
      timeout: Cypress.config('defaultCommandTimeout') * 2, // Order processing might be longer
    })
  }

  get doneButton() {
    return cy.get('[data-action="application#doneAction"]')
  }

  clickDone() {
    this.doneButton.click()
    this.loadingSpinner.should('be.visible')
    return new GiftCardPage()
  }
}
