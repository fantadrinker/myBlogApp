/// <reference types="cypress" />

describe('image post page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/posts/images-post')
  })

  describe('images', () => {
    it('should contain the image gallery', () => {
      cy.get('main article [data-cy="image-gallery"]').should('exist')

      cy.get('main article [data-cy="image-gallery"] img').first().should('be.visible')
    })
  })

  describe('chevrons', () => {
    it('should contain the previous chevron disabled, and next chevron clickable', () => {
      cy.get('main article [data-cy="image-gallery"] span[data-cy="chvron-left"]')
        .should('exist')
        .should('not.have.css', 'cursor', 'pointer')

      cy.get('main article [data-cy="image-gallery"] span[data-cy="chvron-right"]')
        .should('exist')
        .should('have.css', 'cursor', 'pointer')
      
    })

    it('should let user navigate to next image by clicking the next chevron', () => {
      cy.get('main article [data-cy="image-gallery"] span[data-cy="chvron-right"]').click()
      cy.get('main article [data-cy="image-gallery"] img').first().should('not.be.visible')
      cy.get('main article [data-cy="image-gallery"] img').eq(1).should('be.visible')
      cy.get('main article [data-cy="image-gallery"] span[data-cy="chvron-right"]').click()
      cy.get('main article [data-cy="image-gallery"] img').eq(2).should('be.visible')
      cy.get('main article [data-cy="image-gallery"] span[data-cy="chvron-right"]')
        .should('exist')
        .should('not.have.css', 'cursor', 'pointer')
    })
  })
})