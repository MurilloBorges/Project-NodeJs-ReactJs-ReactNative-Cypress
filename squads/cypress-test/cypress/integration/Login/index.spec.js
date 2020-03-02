/// <reference types="Cypress" />
/// <reference types="../../support" />

describe('Action login', () => {

    beforeEach(() => {      
      cy.visit('/login');      
    });
      
    it('Logando', () => {
      cy.login('squads', 'squads');
    });    
})