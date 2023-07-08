import { BasePage } from '@pages/BasePage'

class CheckoutSuccess extends BasePage {
  constructor() {
    super()
    this.path = '#success'
  }
}

export default new CheckoutSuccess()
