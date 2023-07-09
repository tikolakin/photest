import { GiftCardPage } from '@pages'
import { BaseComponent } from '@components'

export default class CheckoutSummary extends BaseComponent {
  get container() {
    return cy.get('[data-controller="confirm"]')
  }

  get editButton() {
    return this.container.find('[data-action="click->confirm#editAction"]')
  }

  get voucherValue() {
    return this.container.find('#confirm-voucher-value')
  }

  get paymentAmount() {
    return this.container.find('#confirm-payment-amount')
  }

  get purchaserEmail() {
    return this.container.find('#confirm-purchaser-email')
  }

  get recipientEmail() {
    return this.container.find('#confirm-recipient-email')
  }

  edit() {
    this.editButton.click()
    return new GiftCardPage()
  }
}
