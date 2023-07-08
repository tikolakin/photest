export abstract class BasePage {
  path: string

  constructor() {
    this.path = ''
  }

  get title() {
    return cy.get('[data-target="page.headerText"]')
  }

  visit() {
    return cy.visit(this.path)
  }
}
