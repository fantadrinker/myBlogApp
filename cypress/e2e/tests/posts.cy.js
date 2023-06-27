/// <reference types="cypress" />

describe('post page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/posts/ssg-ssr')
  })

  describe('header', () => {
    it('clicking on header image should navigate to home page', () => {
      cy.get('header img')
        .should('have.attr', 'height', '108')
        .should('have.attr', 'width', '108')
        .click()
      cy.url().should('eq', 'http://localhost:3000/?animateHeader=1')
    })

    it('clicking on header link should navigate to home page', () => {
      cy.get('header h2')
        .should('contain', 'Fred Cui')
        .invoke('outerHeight')
        .should('be.greaterThan', 0)
        .should('be.lessThan', 43)
      cy.get('header h2').contains('Fred Cui').click()
      cy.url().should('eq', 'http://localhost:3000/?animateHeader=1')
    })
  })

  describe('main', () => {
    it('should contain a section with blog title and date', () => {
      cy.get('main').get('h1[data-cy="blog-title"]').should('exist')
    })

    it('should contain a back button', () => {
      cy.get('main [data-cy="back-to-home"] a').should('contain', 'back')
      cy.get('main [data-cy="back-to-home"] a').click()

      cy.url().should('eq', 'http://localhost:3000/')
    })

  })

})