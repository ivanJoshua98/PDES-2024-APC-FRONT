describe('Interact with a shopping cart', () => {

    beforeEach(() => {
        //Login user successfuly
        cy.visit("/sign-in");

        cy.get("[id=outlined-user-email-input]").type("userBuyer1@mail.com");
        cy.get("[id=password]").type("Credential.");

        cy.get("[id=login-button]").click();
    });

    it("Succesfully loads Home Page", () => {
        cy.location("pathname").should("match", /\/home$/);
    });


    it("Show empty shopping cart", () => {

        cy.get("[id=open-shopping-cart]").click();

        cy.get('#shopping-cart-banner').should("exist").should("have.text", "CARRITO DE COMPRAS");

        cy.get('#empty-shopping-cart').should("exist")
        cy.get('#empty-shpcar-alert-1').should("have.text", "Tu carrito está vacío")
        cy.get('#empty-shpcar-alert-2').should("have.text", "¡Agrega productos!")
    });



})