/// <reference types="cypress" />

describe('homepage', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
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
      cy.get('main').should('contain', 'Blogs')
    })
  })
})