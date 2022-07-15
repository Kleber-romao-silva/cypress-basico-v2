
it('testa a pagina da politica de privacidade deforma independente', function() {
        cy.visit('./src/privacy.html')

        cy.contains('Talking About Testing').should('be.visible')
})