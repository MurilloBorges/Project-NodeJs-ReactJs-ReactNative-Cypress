//cria intellisense da função criada no command.js
/// <reference types="Cypress" />
declare namespace Cypress {

    interface Chainable<Subject> {
        
        /**
         * Custom command to select DOM element by data-cy attribute.
         * @example cy.dataCy('greeting')
         */
        dataCy(value: string): Chainable<Element>

        /**
         * Use to login in Acesso Application
         * @example
         * cy.login('user name', 'user password')
         */
        login(userName: string, password: string): Chainable<any>

        /**
         * Use to product in register
         * @example
         * cy.postProduto('product name', 'product description', 'product value')
         */
        postProduto(name: string, description: string, value: string): Chainable<any>

        /**
         * Use to product in change
         * @example
         * cy.patchProduto('product name', 'product description', 'product value')
         */
        patchProduto(name: string, description: string, value: string): Chainable<any>
    }
}