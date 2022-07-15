 Cypress.Commands.add('fillMandatoryFildesAndSubmit', function() {
    cy.get('#firstName').type('Kleber')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('klebinhosilva@yahoo.com')
    cy.get('#open-text-area').type('teste')
    cy.contains('button','Enviar').click()

 })