export default abstract class BasePage {
  path = '#'

  get title() {
    return cy.get('[data-target="page.headerText"]')
  }

  get loadingSpinner() {
    return cy.get('[data-icon="spinner"')
  }

  visit() {
    return cy.visit(this.path)
  }
}
