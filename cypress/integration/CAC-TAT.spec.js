/// <reference types="Cypress" />

describe('Central de atendimento ao Cliente TAT', function () {

    beforeEach(function () {
        cy.visit('./src/index.html')

    })
    it('verificar o titulo da aplicação', function () {

        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')

    })
    it('preencher os campos obrigatórios eenvia o formulario', function () {
        const longText = ' Udemy, Teste UdeTestemyUdemy, Teste UdeTestemyUdemy, Teste UdeTestemyUdemy, Teste UdeTestemyUdemy, Teste UdeTestemyUdemy, Teste UdeTestemy'

        cy.get('#firstName').type('Kleber')
        cy.get('#lastName').type('Silva')
        cy.get('#email').type('klebinhosilva@yahoo.com')
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')

    })

    it('exibir mensagem de erro ao submeter um email inválido', function () {
        cy.get('#firstName').type('Kleber')
        cy.get('#lastName').type('Silva')
        cy.get('#email').type('klebinhosilva@yahoo,com')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

    })

    it('Campo telefone continua vazio quando preenchido com valor não- numerico', function () {
        cy.get('#phone')
            .type('abcdfgh').should('have.value', '')
    })

    it('exibe mensagem de erro quando o campo telefone se torna obrigatorio mas não é preenchido', function () {
        cy.get('#firstName').type('Kleber')
        cy.get('#lastName').type('Silva')
        cy.get('#email').type('klebinhosilva@yahoo.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('#firstName').type('Kleber')
            .should('have.value', 'Kleber').clear()
            .should('have.value', '')
        cy.get('#lastName').type('Silva')
            .should('have.value', 'Silva').clear()
            .should('have.value', '')
        cy.get('#email').type('Klebinhosilva@yahoo.com')
            .should('have.value', 'Klebinhosilva@yahoo.com').clear()
            .should('have.value', '')
        cy.get('#phone').type('1234567890')
            .should('have.value', '1234567890').clear()
            .should('have.value', '')

    })

    it('exibe mensagem de erro ao não preencher os campos obrigatorios', function () {
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('envia o formulario com sucesso usando um comando customizado', function () {
        cy.fillMandatoryFildesAndSubmit()

        cy.get('.success').should('be.visible')

    })

    it('seleciona um produto (YouTube) por seu texto', function () {
        cy.get('#product').select('YouTube')
            .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function () {
        cy.get('#product').select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu indice', function () {
        cy.get('#product').select(1)
            .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function () {
        cy.get('input[type="radio"][value="feedback"]').check()
            .should('have.value', 'feedback')

    })

    it('marca cada tipo de atendimento', function () {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function ($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')

            })
    })

    it('marca ambos checkboxes, depois desmarca o ultimo', function () {
        cy.get('input[type="checkbox"]').check().should('be.checked')
            .last().uncheck().should('not.be.checked')

    })

    it('selecione um arquivo da pasta fixtures', function () {
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')

            })

    })

    it('seleciona um arquivo simulando um drag-and-drop', function () {
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')

            })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')

            })
    })
    it('verifica que a politica de privacidade abre em outra aba sem a necessidade de um clique', function () {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a pagina da politica de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()

        cy.contains('Talking About Testing').should('be.visible')
    })

  
})