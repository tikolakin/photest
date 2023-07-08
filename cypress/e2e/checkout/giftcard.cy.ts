//import CheckoutPayment from '@pages/CheckoutPayment'
//import CheckoutSummary from '@pages/CheckoutSummary'
import GiftCardPage from '@pages/GiftCardPage'

describe('Purchase a Gift Card', function () {
  it('send to me @severity:critical', function () {
    GiftCardPage.visit()
    GiftCardPage.title.should('have.text', 'Buy a Gift Card')
    GiftCardPage.selectCardValue(50)
      .fillEmail('phorest@tikoqa.com')
      .fillFirstName('Tiko')
      .fillLastName('Lakin')

    const CheckoutSummary = GiftCardPage.continueToCheckout()
    CheckoutSummary.title.should('have.text', 'Summary')
    // TODO verify correct info is shown

    const CheckoutPayment = CheckoutSummary.confirmDetails()
    CheckoutPayment.title.should('have.text', 'Checkout')
    // TODO verify correct info is shown

    const CheckoutSuccess = CheckoutPayment.fillName('Tiko')
      .fillZipCode('12345')
      .fillNumber('4111111111111111')
      .fillExpiryDate('10/23')
      .fillCvv('999')
      .submitOrder()

    CheckoutSuccess.title.should('have.text', 'Purchase Complete')
    cy.location().should((loc) => {
      expect(loc.hash).to.eq('#success')
    })

    cy.get('[data-controller="success"]').should('be.visible')
    cy.get('[data-controller="success"]', { timeout: 20000 }).should(
      ($htmlElement) => {
        const innerText = $htmlElement.text()
        console.log(innerText)
        const regexCode = /(\d+)/
        const match = innerText.match(regexCode)
        console.log(match)
        if (match) {
          console.log(match[1]) // This will print 11264997
        }
        expect(match[1].length).to.be.gte(8)
        // TODO check card value
      },
    )

    cy.get('[data-action="application#doneAction"]').click()
    cy.location().should((loc) => {
      expect(loc.hash).to.eq('#')
    })
    cy.get('[data-target="page.headerText"]').should(
      'have.text',
      'Buy a Gift Card',
    )

    // TODO: verify email
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
