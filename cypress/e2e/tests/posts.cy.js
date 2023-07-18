/// <reference types="cypress" />

describe('post page', () => {
  beforeEach(() => {
    cy.visit('/posts/ssg-ssr')
  })

  describe('header', () => {
    it('clicking on header image should navigate to home page', () => {
      cy.get('header img')
        .should('have.attr', 'height', '108')
        .should('have.attr', 'width', '108')
        .click()
      cy.url().should('not.contain', '/posts')
    })

    it('clicking on header link should navigate to home page', () => {
      cy.get('header h2')
        .should('contain', 'Fred Cui')
        .invoke('outerHeight')
        .should('be.greaterThan', 0)
        .should('be.lessThan', 43)
      cy.get('header h2').contains('Fred Cui').click()
      cy.url().should('not.contain', '/posts')
    })
  })

  describe('main', () => {
    it('should contain a section with blog title and date', () => {
      cy.get('main').get('h1[data-cy="blog-title"]').should('exist')
    })

    it('should contain a back button in footer', () => {
      cy.get('footer[data-cy="back-to-home"] a')
        .should('contain', 'back')
        .click()

      cy.url().should('not.contain', '/posts')
    })

    it('should contain a comment section', () => {
      cy
        .get('main')
        .get('section[data-cy="comments-section"]')
        .should('exist')

    })

  })

})
