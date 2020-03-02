/// <reference types="Cypress" />
/// <reference types="../../support" />

describe('Action Produto', () => {

  beforeEach(() => {      
    cy.visit('/login');      
    cy.login('squads', 'squads');    
  });
    
  it('Cadastrando Produto', () => {
    cy.postProduto('Chave', 'Chave teste 1', '14.99');
  });            
})