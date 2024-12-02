describe('Interact with products', () => {

    beforeEach(() => {
        //Login user successfuly
        cy.visit("/sign-in");

        cy.get("[id=outlined-user-email-input]").type("userBuyer1@mail.com");
        cy.get("[id=password]").type("Credential.");

        cy.get("[id=login-button]").click();
    });

    
    it("Search any product and show results successfully", () => {
        cy.get('#filled-basic-sercher').type("notebook");
        cy.get('#ejecute-search').click();

        cy.get('.MuiImageList-root').should("exist");
        cy.get(':nth-child(1) > .MuiButtonBase-root > .MuiImageListItem-root > .MuiImageListItem-img').should("exist");
        cy.get(':nth-child(1) > .MuiButtonBase-root > .MuiImageListItem-root > .MuiBox-root > .MuiGrid2-container > .MuiGrid2-grid-xs-12 > .MuiPaper-root').contains('Notebook');

    });


    it("Search a product and show details successfully", () => {
        cy.get('#filled-basic-sercher').type("notebook");
        cy.get('#ejecute-search').click();

        cy.get(':nth-child(1) > .MuiButtonBase-root > .MuiImageListItem-root > .MuiImageListItem-img').click();
        
        cy.get('#images-carrousel').should("exist");
        cy.get('#product-price').contains('$')
    });


    it("Search for a product and add as a favorite successfully", () => {
        cy.get('#filled-basic-sercher').type("notebook");
        cy.get('#ejecute-search').click();
        cy.get(':nth-child(1) > .MuiButtonBase-root > .MuiImageListItem-root > .MuiImageListItem-img').click();

        //Button to add to favorites
        cy.get('#add-to-favorites').should("exist");

        cy.get('#add-to-favorites').click();

        //Button to remove to favorites
        cy.get('#remove-to-favorites').should("exist");cy.get('#remove-to-favorites').should("exist");

    });


    it("Search for a product and remove to favorites successfully", () => {
        cy.get('#navigate-to-favorites').click();

        cy.get(':nth-child(1) > .MuiButtonBase-root > .MuiImageListItem-root > .MuiImageListItem-img').click();

        //Button to remove to favorites
        cy.get('#remove-to-favorites').should("exist");
        
        cy.get('#remove-to-favorites').click();

        //Button to add to favorites
        cy.get('#add-to-favorites').should("exist");
    });
});