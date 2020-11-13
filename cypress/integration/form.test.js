describe('form app', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/pizza')
    })

    const nameText = () => cy.get('input[name="name"]')
    const instructions = () => cy.get('input[name="instructions"]')

    it('adding text to boxes', () => {
        nameText()
        .should('have.value', '')
        .type('john chamberlin')
        instructions()
        .should('have.value', '')
        .type('no goose')
    })

    it('selecting multiple toppings', () => {
        cy.get('input[name="pepperoni"]').check()
        cy.get('input[name="bellPeppers"]').check()
        cy.get('input[name="olives"]').check()
        cy.get('input[name="pineapple"]').check()
    })

    it('submitting form', () => {
        cy.get('form').submit()
    })


})