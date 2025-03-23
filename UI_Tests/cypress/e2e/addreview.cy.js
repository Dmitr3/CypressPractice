const filterOptions = require("../fixtures/filterOptions.json");
import { generateRandomNickname } from "../support/utils";

describe("Add Review", () => {
  it("User can add review successfully", () => {
    const { Gear } = filterOptions.Menu;
    cy.visit("/");
    //Trigger 'Gear' dropdown
    cy.navMainMenu(`${Gear}`, "Gear", "Fitness Equipment");
    //Hover over first product and select it
    cy.get(".product-item").first().click();
    cy.get('a[class="action add"]')
      .contains("Be the first to review this product")
      .click();
    cy.contains("Reviews").should("be.visible");
    //Give 3 stars to the good
    cy.get('label[for="Rating_3"]').click({ force: true });
    cy.get("#Rating_3").should("be.checked");
    //Fill in Review Information
    const randomNickName = generateRandomNickname();
    cy.get("#nickname_field").type(randomNickName);
    cy.get("#summary_field").type("poor quality");
    cy.get("#review_field").type("The material has an unpleasant odor.");
    cy.get("button.submit").click();
    cy.contains("You submitted your review for moderation.").should(
      "be.visible"
    );
  });
});
