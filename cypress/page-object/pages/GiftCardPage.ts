import { BasePage, CheckoutConfirm } from '@pages'

export default class GiftCardPage extends BasePage {
  path = '#'

  constructor() {
    super()
  }

  get yourEmailField() {
    return cy.get('[data-target="email.purchaserEmailInput"]')
  }

  get purchaseEmailError() {
    return cy.get('[data-target="email.purchaserEmailError"]')
  }

  get firstNameField() {
    return cy.get('[data-target="name.purchaserFirstNameInput"]')
  }

  get lastNameField() {
    return cy.get('[data-target="name.purchaserLastNameInput"]')
  }

  get checkoutButton() {
    return cy.get('[data-target="checkout.checkoutButton"]').filter(':visible')
  }

  get otherOption() {
    return cy.get('[data-target="amount.otherOptionButton"]')
  }

  get otherOptionInput() {
    return cy.get('[data-target="amount.otherInput"]')
  }

  get otherOptionError() {
    return cy.get('[data-target="amount.otherSectionError"]')
  }

  get totalCost() {
    return cy.get('[data-target="checkout.price"]')
  }

  selectCardValue(option: number | 'other', value?) {
    if (value) {
      this.otherOption.check()
      this.otherOptionInput.type(value)
      return this
    }
    cy.get(`[data-voucher-value^="${option}"]`).check()
    return this
  }

  fillEmail(value) {
    this.yourEmailField.type(value)
    return this
  }

  fillFirstName(value) {
    this.firstNameField.type(value)
    return this
  }

  fillLastName(value) {
    this.lastNameField.type(value)
    return this
  }

  continueToCheckout() {
    this.checkoutButton.click()
    this.loadingSpinner.should('be.visible')
    return new CheckoutConfirm()
  }
}
