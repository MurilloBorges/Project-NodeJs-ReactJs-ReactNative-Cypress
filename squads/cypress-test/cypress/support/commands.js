/// <reference path="./index.d.ts" />

Cypress.Commands.add('dataCy', (value) => {
    return cy.get(`[data-cy=${value}]`);
});

Cypress.Commands.add('login', (userName, password) => {
    cy.dataCy('username').type(userName);
    cy.dataCy('password').type(password);
    cy.dataCy('entrar').click();
});

Cypress.Commands.add('postProduto', (name, description, value) => {           
    cy.dataCy('btn-cadastrar').click();    
    cy.dataCy('input-nome').type(name);
    cy.dataCy('input-descricao').type(description);
    cy.dataCy('input-valor').type(value);
    cy.dataCy('btn-salvar').click();
    cy.dataCy('btn-voltar').click();
    cy.dataCy('btn-pesquisar').click();
});

Cypress.Commands.add('patchProduto', (name, description, value) => {    
    cy.dataCy('btn-editar').click();        
    cy.dataCy('input-nome').type(name);
    cy.dataCy('input-descricao').type(description);
    cy.dataCy('input-valor').type(value);
    cy.dataCy('btn-salvar').click();
    cy.dataCy('btn-voltar').click();
    cy.dataCy('btn-pesquisar').click();
});