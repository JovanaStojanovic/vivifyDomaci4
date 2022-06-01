///<reference types="Cypress" />

import {loginPage} from './../page_objects/loginPage';
import {createOrganization} from './../page_objects/createOrganization';
import {createBoard} from './../page_objects/createBoard';

const faker = require('faker');

describe('create board tests', ()=> {
    beforeEach('log into the app', () => {
        
        cy.visit("/login");
        loginPage.login("rachel.green@mailinator.com", "kisobran.22");

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
        cy.url().should('contain', '/boards');
        createBoard.boardName.should('contain', randomBoardTitle);
    });
});