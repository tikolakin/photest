import { GiftCardPage } from '@pages'
import { EmailClient } from '@utils'

describe('Purchase a Gift Card', function () {
  it('send to me @severity:critical', function () {
    const testData: { [key: string]: any } = {}
    const giftCardPage = new GiftCardPage()
    const emailClient = new EmailClient()

    testData.userEmail = emailClient.getEmailAddress()
    testData.firstName = 'Tiko'
    testData.lastName = 'Lakin'
    testData.expectedVoucherValue = 50
    testData.salon = {
      managerEmail: 'arden-courts@phorest.com',
      managerName: 'Arden Courts',
      brandName: 'Demo US',
      salonEmail: 'new-york-salon@phorest.com',
    }

    giftCardPage.visit()
    giftCardPage.title.should('have.text', 'Buy a Gift Card')
    giftCardPage
      .selectCardValue(testData.expectedVoucherValue)
      .fillEmail(testData.userEmail)
      .fillFirstName(testData.firstName)
      .fillLastName(testData.lastName)

    const summaryPage = giftCardPage.continueToCheckout()
    summaryPage.title.should('have.text', 'Summary')
    // TODO verify correct info is shown

    const paymentPage = summaryPage.confirmDetails()
    paymentPage.title.should('have.text', 'Checkout')
    // TODO verify correct info is shown
    const successPage = paymentPage
      .fillName('Tiko')
      .fillZipCode('12345')
      .fillNumber('4111111111111111')
      .fillExpiryDate('10/23')
      .fillCvv('999')
      .submitOrder()

    successPage.title.should('have.text', 'Purchase Complete')
    cy.location('hash').should('eq', successPage.path)

    successPage.successContainer.should(function (element) {
      const innerText = element.text()
      const matchCode = innerText.match(/(\d+)/)
      const matchValue = innerText.match(/([$£€])(\d+)\.(\d+)/)

      expect(matchCode.length).to.be.gt(0, 'Failed to find voucher code')
      const actualVoucherCode = matchCode[1]
      expect(actualVoucherCode.length).to.be.gte(8)
      testData.actualVoucherCode = actualVoucherCode

      expect(matchValue.length).to.be.gt(0, 'Failed to find voucher value')
      const actualVoucherValue = matchValue[0]
      // TODO verify voucher value with currency
      //expect(actualVoucherValue).to.match(/testData.expectedVoucherValue)
      testData.voucherValue = actualVoucherValue
    })

    successPage.clickDone()

    cy.location('hash').should('eq', giftCardPage.path)
    giftCardPage.title.should('have.text', 'Buy a Gift Card')

    // Verify order confirmation email
    cy.then(function () {
      return emailClient.fetchEmail({
        subject: new RegExp(
          `You've been sent a \\${testData.voucherValue} gift card for ${testData.salon.brandName}!`,
        ),
      })
    }).then(function () {
      //expect(emailClient.getEmailSender()).to.eq(testData.salon.managerEmail)
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
        console.log('tiko testData', testData)
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
          [`Gift Card ${testData.actualVoucherCode}`, '1', '$50.00'],
          ['Subtotal', '', '$50.00'],
          ['Voucher Tax', '0%', '$0.00'],
          ['Grand Total', '', '$50.00'],
          ['Credit', '', '$50.00'],
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
