class CreateBoard {

    get createNewBoardButton(){
        return cy.get('li[title="Add new Board"]');
    }
    get inputBoardNameField(){
        return cy.get('input[name="name"]');
    }
    get boardTypeChoice(){
        return cy.get('span[name="type_scrum"]');
    }
    get title(){
        return cy.get('svg[class="vs-c-icon vs-c-modal--type-icon"]');
    }
    get newBoardCreate(){
        return cy.get('div[class="vs-c-modal__header"]');
    }
    get boardName(){
        return cy.get('h1');
    }
    getButton(name){
        return cy.get('button').contains(name);
    }
    createNewBoard(name){
        this.createNewBoardButton.eq(0).click();
        this.inputBoardNameField.type(name);
        this.getButton('Next').click();
        this.boardTypeChoice.click();
        this.getButton('Next').click();
        this.getButton('Next').click();
        cy.wait(3000);
        this.getButton('Next').click();
        this.getButton('Finish').click();
    }
}
export const createBoard = new CreateBoard();