const filterOptions = require("../fixtures/filterOptions.json");
import {
  selectFilterOption,
  generateRandomString,
  generateRandomNickname,
} from "../support/utils";

describe("Panel Tests: Men-Bottoms-Shorts", () => {
  // test includes
  // 1. Navigating to Men>Bottoms> Shorts
  // 2. Filtering by 'Options' (Pattern, Performance Fabric, Price, Sale)
  // 3. Opening item and checking "Details" section
  // 4. Checking "More Information" section
  // 5. Check that "Reviews"section is not empty
  // 6. Logging out

  it("Panel Men: Filtering by 'Options', checking 'Details', Checking 'More Information'", () => {
    const { Men } = filterOptions.Menu;
    const { NoPerfFabric } = filterOptions.PerformanceFabric;
    const { ThirtyForty } = filterOptions.Price;
    const { YesSale } = filterOptions.Sale;

    cy.loginToApplication("Ladziata"); //Log in
    cy.navMainMenu(`${Men}`, "Men", "Bottoms", "Shorts");
    cy.filterShoppingOptionsText("Pattern", "Solid");
    cy.filterShoppingOptionsText("Performance Fabric", `${NoPerfFabric}`);
    cy.filterShoppingOptionsText("Price", `${ThirtyForty}`);
    cy.filterShoppingOptionsText("Sale", `${YesSale}`);

    cy.get("div.filter-current ol.items") //check that 4 filters are selected
      .find("li.item")
      .should("have.length", 4);
    cy.get("ol.product-items li.product-item").first().click();

    cy.get("#tab-label-description") // Check that "Details" section is not empty
      .find(".product.description")
      .should("not.be.empty");
    cy.get("#tab-label-additional-title") // Check that "More Information"section is not empty
      .click()
      .find(".table-wrapper")
      .should("not.be.empty");
    cy.get("#tab-label-reviews-title") // Open "Reviews"section
      .click()
    cy.get("#reviews") // Check that "Reviews"section is not empty
      .find("ol.review-items li.review-item")
      .its("length")
      .should("be.gt", 0);
    cy.logout(); //Logout
  });

  it("Panel Men: Sorting by 'Price', rate the product and a leave review as a non-authorized user", () => {
    const { Men } = filterOptions.Menu;
    cy.visit("/")
    //Navigate to the Men > Bottoms > Shorts page
    cy.navMainMenu(`${Men}`, "Men", "Bottoms", "Shorts");
    //Sort by 'Price'
    cy.get("#sorter").select("Price");
    //Select a product
    cy.get(".product-item").first().click();
    //Open "Reviews"section
    cy.get("#tab-label-reviews-title") 
      .click()
    //Rate the selected product
    cy.get("#Rating_3").check({ force: true });
    //Fill in "Nickname", "Summary" and "Review" fields
    const nickname = generateRandomNickname();
    cy.get("#nickname_field")
      .should("be.visible")
      .type(nickname);
    const summary = generateRandomString(20);
    cy.get("#summary_field").type(summary);
    const review = generateRandomString(40);
    cy.get("#review_field").type(review);
    cy.get("button.action.submit.primary").click();
    //Verify review is successfully submitted
    cy.get("[data-ui-id='message-success'] div")
      .invoke("text")
      .should("eq", "You submitted your review for moderation.");
  });
});
