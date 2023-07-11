import { GiftCardPage } from '@pages'
import { User, EmailClient } from '@utils'
import { demoUS } from '@fixtures/salons.json'
import { validVisa } from '@fixtures/test-cards.json'

describe('Purchase a Gift Card', function () {
  it('send to me @severity:critical', function () {
    const testData: { [key: string]: any } = {}
    testData.salon = demoUS
    const giftCardPage = new GiftCardPage()
    const emailClient = new EmailClient()
    const testUser = new User()
    testUser.billingAddress.email = emailClient.getEmailAddress()

    testData.expectedVoucherValue = 50
    testData.currency = '$'
    testData.displayPrice = `${
      testData.currency + testData.expectedVoucherValue
    }.00`

    giftCardPage.visit()
    giftCardPage.title.should('have.text', 'Buy a Gift Card')
    giftCardPage.checkoutButton
      .invoke('css', 'cursor')
      .should('eq', 'not-allowed')

    giftCardPage
      .selectCardValue(testData.expectedVoucherValue)
      .checkoutPrice.should('include.text', testData.displayPrice)

    testData.expectedVoucherValue = 777
    testData.displayPrice = `${
      testData.currency + testData.expectedVoucherValue
    }.00`
    giftCardPage
      .selectCardValue('other', testData.expectedVoucherValue)
      .checkoutPrice.should('include.text', testData.displayPrice)

    giftCardPage
      .fillEmail(testUser.billingAddress.email)
      .fillFirstName(testUser.billingAddress.firstName)
      .fillLastName(testUser.billingAddress.lastName)
      .checkoutButton.invoke('css', 'cursor')
      .should('eq', 'pointer')

    const summaryPage = giftCardPage.continueToCheckout()
    summaryPage.title.should('have.text', 'Summary')
    summaryPage.summary.editButton.should('be.visible')
    summaryPage.summary.voucherValue.should(
      'include.text',
      testData.displayPrice,
    )
    summaryPage.summary.paymentAmount.should(
      'include.text',
      testData.displayPrice,
    )
    summaryPage.summary.purchaserEmail.should(
      'include.text',
      testUser.billingAddress.email,
    )
    summaryPage.summary.recipientEmail.should(
      'include.text',
      testUser.billingAddress.email,
    )

    const paymentPage = summaryPage.confirmDetails()
    paymentPage.title.should('have.text', 'Checkout')
    // TODO verify correct info is shown again?
    const successPage = paymentPage
      .fillName(testUser.billingAddress.firstName)
      .fillZipCode(validVisa.zipCode)
      .fillNumber(validVisa.number)
      .fillExpiryDate(validVisa.expiry)
      .fillCvv(validVisa.cvv)
      .submitOrder()

    successPage.title.should('have.text', 'Purchase Complete')
    cy.location('hash').should('eq', successPage.path)

    successPage.successContainer.should(function (element) {
      const innerText = element.text()
      const matchCode = innerText.match(/(\d+)/)
      debugger
      const matchValue = innerText.match(
        new RegExp(`\\${testData.displayPrice}`),
      )

      expect(matchCode.length).to.be.gt(0, 'Failed to find voucher code')
      const actualVoucherCode = matchCode[1]
      expect(actualVoucherCode.length).to.be.gte(8)
      testData.actualVoucherCode = actualVoucherCode

      expect(matchValue.length).to.be.gt(0, 'Failed to find voucher value')
    })

    successPage.clickDone()

    cy.location('hash').should('eq', giftCardPage.path)
    giftCardPage.title.should('have.text', 'Buy a Gift Card')
    giftCardPage.checkoutButton
      .invoke('css', 'cursor')
      .should('eq', 'not-allowed')

    // Checking a fresh checkout is ready
    giftCardPage.checkoutPrice.should(
      'include.text',
      `${testData.currency}0.00`,
    )

    // Verify order confirmation email
    cy.then(function () {
      return emailClient.fetchEmail({
        subject: new RegExp(
          `You've been sent a \\${testData.displayPrice} gift card for ${testData.salon.brandName}!`,
        ),
      })
    }).then(function () {
      expect(emailClient.getEmailSender()).to.eq(testData.salon.managerEmail)
      cy.intercept(
        'giftcard',
        { hostname: 'giftcard-stub' },
        {
          statusCode: 201,
          body: emailClient.getEmailHTML(),
        },
      )
    })

    cy.visit('http://giftcard-stub/giftcard')
      .get('body')
      .then(function (body) {
        const text = body.text()
        expect(text).to.match(
          new RegExp(`.*Card number: ${testData.actualVoucherCode}.*`),
        )
      })

    // Verify invoice email
    cy.then(function () {
      return emailClient.fetchEmail({
        subject: new RegExp(`Your Receipt for ${testData.salon.managerName}`),
      })
    }).then(function () {
      //expect(emailClient.getEmailSender()).to.eq(testData.salon.salonEmail)
      cy.intercept(
        'invoice',
        { hostname: 'invoice-stub' },
        {
          statusCode: 201,
          body: emailClient.getEmailHTML(),
        },
      )
    })

    cy.visit('http://invoice-stub/invoice')
      .get('body')
      .then((body) => {
        const text = body.text()
        expect(text).to.match(/.*TRANSACTION DETAILS.*/)
      })

    cy.get('table')
      .last()
      .table()
      .then((table) => {
        return table.filter((arr) => arr.length > 0 && arr[0] !== '')
      })
      .then((table) => {
        expect(table).to.deep.eq([
          ['Items Sold', '', ''],
          [
            `Gift Card ${testData.actualVoucherCode}`,
            '1',
            testData.displayPrice,
          ],
          ['Subtotal', '', testData.displayPrice],
          ['Voucher Tax', '0%', '$0.00'],
          ['Grand Total', '', testData.displayPrice],
          ['Credit', '', testData.displayPrice],
          ['Change', '', '$0.00'],
        ])
      })
  })

  it.skip('send to someone else', function () {
    // TODO
  })

  it.skip('failed payment', function () {
    // TODO
  })

  it.skip('3DS payment', function () {
    // TODO
  })

  it.skip('card by brands', function () {
    // TODO
  })

  it.skip('card by country', function () {
    // TODO
  })

  it.skip('user friendly message is shown on declined payment', function () {
    // TODO
  })
})
