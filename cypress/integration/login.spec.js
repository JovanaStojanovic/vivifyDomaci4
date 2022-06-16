///<reference types="Cypress" />

import {loginPage} from './../pageObjects/loginPage';
import user from './../fixtures/data.json'

describe('login tests', ()=> {

    beforeEach('visit login page', () => {

        cy.visit("/login");
        loginPage.getInputField('email').should('be.visible');
        loginPage.title.should('have.text', 'Log in with your existing account');

        cy.intercept(
            "POST",
            "https://cypress-api.vivifyscrum-stage.com/api/v2/login",
            ()=>{}
        ).as("loginUser");

    });

    it("just click login button, all fields empty", ()=>{

        loginPage.loginButton.click();
        cy.url().should('contains', '/login');
        loginPage.errorMessage.eq(0).should('be.visible').and('have.text', 'The email field must be a valid email');
        loginPage.errorMessage.eq(1).should('be.visible').and('have.text', 'The password field is required');

    });

    it("login with correct email, no password", ()=>{

        cy.login({email:'rachel.green@mailinator.com', password: ' '});
        cy.url().should('contains', '/login');
        loginPage.errorMessage.should('be.visible').and('have.text', 'The password field is required');

    });

    it("login with correct email, but wrong password", ()=>{

        cy.login({email: 'rachel.green@mailinator.com' , password: 'password'});
        cy.wait('@loginUser').then((interception)=> {
            expect(interception.response.statusCode).eq(401);
        })
        cy.url().should('contains', '/login');
        loginPage.errorCredentialsMessage.should('be.visible').and('have.text', 'Oops! Your email/password combination is incorrect');
    
    });

    it("login with not registered email", ()=>{

        cy.login({email: 'randomemail@email.com' , password: 'password'});
        cy.wait('@loginUser').then((interception)=> {
            expect(interception.response.statusCode).eq(401);
        })
        cy.url().should('contains', '/login');
        loginPage.errorCredentialsMessage.should('be.visible').and('have.text', 'Oops! Your email/password combination is incorrect');
    
    });

    it("login with correct credentials", ()=>{

        cy.login({email: user.email , password: user.password});
        cy.wait('@loginUser').then((interception)=> {
            expect(interception.response.statusCode).eq(200);
        })
        cy.url().should('contain', '/my-organizations');
    
    });

    it("logout", () => {

        cy.login({email: user.email , password: user.password});
        cy.wait('@loginUser').then((interception)=> {
            expect(interception.response.statusCode).eq(200);
        })
        loginPage.logout({force:true});
        cy.url().should('contains', '/login');
        loginPage.title.should('have.text', 'Log in with your existing account');
    
    });

});