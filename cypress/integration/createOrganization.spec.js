///<reference types="Cypress" />

import {loginPage} from './../page_objects/loginPage';
import {createOrganization} from './../page_objects/createOrganization';
const faker = require('faker');

describe('create organization tests', ()=> {
    beforeEach('log into the app', () => {
        
        cy.visit("/login");
        loginPage.login("rachel.green@mailinator.com", "kisobran.22");
        
    });
    
    let randomOrganizationTitle=faker.name.title();
    

    it("user able to see create organization option, next button disabled when title empty",()=>{
        cy.url().should('contain', '/my-organizations');
        createOrganization.pageTitle.should('have.text', 'My Organizations');
        createOrganization.addOrganizationButton.click();
        createOrganization.dialogTitle.should('have.text', ' New Organization');
        createOrganization.getButton('Next').should('be.disabled');
    });

    it("create organization without logo", ()=>{
        createOrganization.createOrganizationNoLogo(randomOrganizationTitle);
        cy.url().should('contain','/boards');
    });
});
