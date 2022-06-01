///<reference types="Cypress" />

import {loginPage} from './../page_objects/loginPage';
const faker = require('faker');

describe('login tests', ()=> {
    let userData = {
        randomEmail:faker.internet.email(),
        randomPassword:faker.internet.password()
    }
    let correctEmail = "rachel.green@mailinator.com";
    let correctPassword= "kisobran.22";

    beforeEach('visit login page', ()=>{
        cy.visit("/login");
        loginPage.getInputField('email').should('be.visible');
        loginPage.title.should('have.text', 'Log in with your existing account');
    });

    it("just click login button, all fields empty", ()=>{
        loginPage.loginButton.click();
        cy.url().should('contains', '/login');
        loginPage.errorMessage.eq(0).should('be.visible').and('have.text', 'The email field must be a valid email');
        loginPage.errorMessage.eq(1).should('be.visible').and('have.text', 'The password field is required');
    });

    it("login with correct email, no password", ()=>{
        loginPage.loginNoPassword(correctEmail);
        cy.url().should('contains', '/login');
        loginPage.errorMessage.should('be.visible').and('have.text', 'The password field is required');
    });

    it("login with correct email, but wrong password", ()=>{
        loginPage.login(correctEmail, userData.randomPassword);
        cy.url().should('contains', '/login');
        loginPage.errorCredentialsMessage.should('be.visible').and('have.text', 'Oops! Your email/password combination is incorrect');
    });

    it("login with not registered email", ()=>{
        loginPage.login(userData.randomEmail, userData.randomPassword);
        cy.url().should('contains', '/login');
        loginPage.errorCredentialsMessage.should('be.visible').and('have.text', 'Oops! Your email/password combination is incorrect');
    });

    it("login with correct credentials", ()=>{
        loginPage.login(correctEmail, correctPassword);
        cy.wait(3000);
        cy.url().should('contain', '/my-organizations');
    });

    it("logout", ()=>{
        loginPage.login(correctEmail, correctPassword);
        loginPage.logout({force:true});
        cy.url().should('contains', '/login');
        loginPage.title.should('have.text', 'Log in with your existing account');
    });
});
