Cypress.Commands.add('login', (user) => {
    cy.get('input[type="email"]').type(user.email);
    cy.get('input[type="password"]').type(user.password);
    cy.get('button[type="submit"]').click();
})


Cypress.Commands.add('createOrganization', (name) => {
    cy.get('div[class="vs-c-my-organization__content"]').last().click();
    cy.get('input[type="text"]').type(name);
    cy.get('button[type="button"]').last().click();
    cy.get('button[type="button"]').last().click();
})

Cypress.Commands.add('createBoard', (name) => {
    cy.get('li[title="Add new Board"]').eq(0).click();
    cy.get('input[name="name"]').type(name);
    cy.get('button[type="button"]').last().click();
    cy.get('span[name="type_scrum"]').click();
    cy.get('button[type="button"]').last().click();
    cy.get('button[type="button"]').last().click();
    cy.get('button[type="button"]').last().click();
    cy.get('button[type="button"]').last().click();
})

