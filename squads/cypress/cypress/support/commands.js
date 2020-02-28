/// <reference path="./index.d.js" />

Cypress.Commands.add('dataCy', (value) => {
    return cy.get(`[data-cy=${value}]`)
});

Cypress.Commands.add('login', (userName, password) => {
    cy.dataCy('username').type(userName);
    cy.dataCy('password').type(password);
    cy.dataCy('entrar').click();
});