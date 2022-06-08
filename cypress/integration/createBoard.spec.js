///<reference types="Cypress" />

import user from './../fixtures/data.json'
import {loginPage} from '../pageObjects/loginPage';
import {createBoard} from '../pageObjects/createBoard';

const faker = require('faker');

describe('create board tests', ()=> {
    beforeEach('log into the app', () => {
        cy.visit("/login");
        loginPage.login(user.email, user.password);

        cy.intercept(
            "POST",
            "https://cypress-api.vivifyscrum-stage.com/api/v2/boards",
            ()=>{}
        ).as("createBoard");
    });
    
    let randomBoardTitle=faker.name.title();

    
    it("user able to see create board option, next button disabled when board title empty",()=>{
        cy.url().should('contain', '/my-organizations');
        createBoard.createNewBoardButton.eq(0).click({force:true});
        createBoard.newBoardCreate.should('have.text', ' \n            New Board\n          ');
        createBoard.getButton('Next').should('be.disabled');
    });


    it("create board without logo", ()=>{
        createBoard.createNewBoard(randomBoardTitle);
        cy.wait('@createBoard').then((interception)=> {
            expect(interception.response.statusCode).eq(201);
        })
        cy.url().should('contain', '/boards');
        createBoard.boardName.should('contain', randomBoardTitle);
    });
});