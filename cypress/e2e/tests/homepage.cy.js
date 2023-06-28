/// <reference types="cypress" />

describe('homepage', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  describe('header', () => {
    it('should contain the header with name', () => {
      cy.get('header').should('contain', 'Fred Cui')
    })

    it('should contain 144x144 image element', () => {
      cy.get('header').get('img').should('have.attr', 'height', '144')
      cy.get('header').get('img').should('have.attr', 'width', '144')
    })
  })

  describe('main', () => {
    it('should contain a section with blog title', () => {
      cy.get('main section[data-cy="blogs"]').contains('Blogs')
    })

    it('clicking on blog title should navigate to blog page', () => {
      cy.get('main section[data-cy="blogs"] ul > li a').first().click()
      cy.url().should('include', '/posts')
    })
  })
})