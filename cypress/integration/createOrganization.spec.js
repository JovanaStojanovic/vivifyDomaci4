///<reference types="Cypress" />

import {loginPage} from './../pageObjects/loginPage';
import {createOrganization} from './../pageObjects/createOrganization';
import user from './../fixtures/data.json'

describe('create organization tests', ()=> {

    beforeEach('log into the app', () => {

        cy.visit("/login");
        cy.login({email: user.email, password: user.password});

        cy.intercept(
            "POST",
            "https://cypress-api.vivifyscrum-stage.com/api/v2/organizations",
            ()=>{}
        ).as("createOrganization");

    });
        
    it("user able to see create organization option, next button disabled when title empty",()=>{

        cy.url().should('contain', '/my-organizations');
        createOrganization.pageTitle.should('have.text', 'My Organizations');
        createOrganization.addOrganizationButton.click();
        createOrganization.dialogTitle.should('have.text', ' New Organization');
        createOrganization.getButton('Next').should('be.disabled');

    });

    it("create organization without logo", ()=>{

        cy.createOrganization("New Organization Title");
        cy.wait('@createOrganization').then((interception)=> {
            expect(interception.response.statusCode).eq(201);
        })
        cy.url().should('contain','/boards');

    });

});
