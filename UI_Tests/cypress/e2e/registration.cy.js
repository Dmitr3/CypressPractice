const credentials = require("../fixtures/credentials.json");
import { generateRandomEmail } from "../support/utils";
describe("Registration", () => {
  it("User can register successfully", () => {
    const { userFirstName, userLastName, password } = credentials.Ladziata;
    cy.visit("/");
    //Click on 'Create an Account' button
    cy.get("div.panel.header ul.header.links li a")
      .contains("Create an Account")
      .click();
    cy.contains("Create New Customer Account").should("be.visible");
    //Fill in Personal Information
    cy.get("#firstname").type(`${userFirstName}`);
    cy.get("#lastname").type(`${userLastName}`);
    //Fill in Sign-IN Information
    const randomEmail = generateRandomEmail();
    cy.get("#email_address").type(randomEmail);
    cy.get("#password").type(`${password}`);
    cy.get("#password-confirmation").type(`${password}`);
    cy.get("button.primary").click();
    cy.contains("Thank you for registering with Main Website Store.").should(
      "be.visible"
    );
  });
});
