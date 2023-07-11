import { EmailClient } from '@utils'
import { allFakers, allLocales, Faker } from '@faker-js/faker'

type SupportedLocales = 'en_IE' | 'en_GB' | 'en_US' | 'en_AU' | 'de'

type defaultAttributes = {
  email
  firstName
  lastName
}

class User {
  billingAddress: defaultAttributes
  private faker: Faker
  constructor(locale: SupportedLocales = 'en_IE') {
    this.faker = allFakers[locale]
    this.billingAddress = this.createAddress()
  }

  private createAddress() {
    const defaultAttributes = {
      email: new EmailClient().getEmailAddress(),
      firstName: this.faker.person.firstName(),
      lastName: this.faker.person.lastName(),
    }
    return defaultAttributes
  }
}
export default User
