/// <reference types="Cypress" />
/// <reference path="../../support/index.js" />

describe('Action login', () => {

    beforeEach(() => {      
      cy.visit('/login')
      cy.login('squads', 'squads')
      cy.visit('/produtos')
    })
      
})