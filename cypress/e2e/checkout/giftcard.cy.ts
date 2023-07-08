describe('template spec', function () {
  it('passes', function () {
    cy.visit('')
    //cy.contains('a', 'Buy a Gift Card').click()
    cy.get('[data-voucher-value="50.00"]').should('be.visible')
  })
})
