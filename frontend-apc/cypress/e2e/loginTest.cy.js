describe('The Log in Page', () => {
    it("succesfully loads", () => {
      cy.visit("http://localhost:5000/sign-in");
    });


    it("show componenets successfully", () => {
        cy.visit("/sign-in");

        cy.get("[id=login-banner]").should("exist");
        cy.get("[id=outlined-user-email-input]").should("exist");
        cy.get("[id=password]").should("exist");
        cy.get("[id=login-button]").should("exist");
    });


    it("user login with incorrect email", () => {
        cy.visit("/sign-in");

        var email = "userNotFound@mail.com";
        var password = "Credential.";

        cy.get("[id=outlined-user-email-input]").type(email);
        cy.get("[id=password]").type(password);

        cy.get("[id=login-button]").click();

        cy.location("pathname").should("match", /\/sign-in$/);
        cy.get("[id=login-error]").should("exist").should("have.text", "El correo ingresado no existe");
    });


    it("user login with incorrect password", () => {
        cy.visit("/sign-in");

        var email = "userBuyer1@mail.com";
        var password = "badpass";

        cy.get("[id=outlined-user-email-input]").type(email);
        cy.get("[id=password]").type(password);

        cy.get("[id=login-button]").click();

        cy.location("pathname").should("match", /\/sign-in$/);
        cy.get("[id=login-error]").should("exist").should("have.text", "La contraseña ingresada no es correcta");
    });


    it("login user succesfully", () => {
        cy.visit("/sign-in");

        var email = "userBuyer1@mail.com";
        var password = "Credential.";

        cy.get("[id=outlined-user-email-input]").type(email);
        cy.get("[id=password]").type(password);

        cy.get("[id=login-button]").click();

        cy.location("pathname").should("match", /\/home$/);
    });

  });
  
  
  