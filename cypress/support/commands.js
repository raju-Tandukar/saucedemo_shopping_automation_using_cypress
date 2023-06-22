// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

Cypress.Commands.add("login",(userName, password, successLogin=true, loginError="") => {
    cy.get(".login_logo", {timeout: 9000}).should("have.text","Swag Labs")
    cy.get("#user-name").type(userName);
    cy.get("#password").type(password);
    cy.wait(100);
    cy.get("#login-button").click();
    if(successLogin)
      cy.get("#shopping_cart_container", { timeout: 10000 }).should("be.visible");
    else
      cy.get('[data-test="error"]').should("have.text", loginError)
  }
);
