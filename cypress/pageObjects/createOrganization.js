class CreateOrganization {

    get pageTitle(){

        return cy.get('div[class="vs-l-sprint__name vs-u-cursor--default"]');
    }

    get addOrganizationButton(){

        return cy.get('div[class="vs-c-my-organization__content"]').last({ force: true });
    }

    get dialogTitle(){

        return cy.get('h2[class="vs-c-modal__title"]');
    }

    get logoTitle(){

        return cy.get('h4');
    }

    get errorMessage(){

        return cy.get('div[class="el-message"]');
    }

    get boardsTitle(){

        return cy.get('p[class="vs-c-boards-item__title"]');
    }

    getOrganizationName(name){

        return cy.get('h2').contains(name);
    }

    getInputField(name){

        return cy.get(`input[type=${name}]`);
    }

    getButton(name){

        return cy.get('button').contains(name);

    }
        
    createOrganizationNoLogo(name){

        this.addOrganizationButton.click();
        this.getInputField("text").type(name);
        this.getButton('Next').click();
        this.getButton('Create').click();

    }

}

export const createOrganization = new CreateOrganization();