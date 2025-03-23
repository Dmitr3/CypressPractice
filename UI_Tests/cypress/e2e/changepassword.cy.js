const credentials = require("../fixtures/credentials.json");
import { generateRandomEmail } from "../support/utils";
describe("Change Password", () => {
  it("User can change password successfully", () => {
    const { userFirstName, userLastName, password, password2 } =
      credentials.ChangePassword;
    cy.visit("/");
    //Click on 'Create an Account' button
    cy.get("div.panel.header ul.header.links li a")
      .contains("Create an Account")
      .click();
    cy.get("h1.page-title").should(
      "include.text",
      "Create New Customer Account"
    );
    //Fill in Personal Information
    cy.get("#firstname").type(`${userFirstName}`);
    cy.get("#lastname").type(`${userLastName}`);
    //Fill in Sign-IN Information
    const randomEmail = generateRandomEmail();
    cy.get("#email_address").type(randomEmail);
    cy.get("#password").type(`${password}`);
    cy.get("#password-confirmation").type(`${password}`);
    cy.get("button.primary").click();
    cy.get(".message-success").should(
      "include.text",
      "Thank you for registering with Main Website Store."
    );
    cy.get(".change-password").first().click();
    cy.get("#current-password").type(`${password}`);
    cy.get("#password").type("Password2");
    cy.get("#password-confirmation").type(`${password2}`);
    cy.get("button.action.save.primary").click();
    cy.contains("You saved the account information.").should("be.visible");
  });
});
