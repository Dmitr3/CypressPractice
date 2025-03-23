const filterOptions = require("../fixtures/filterOptions.json");
import {
  selectSizeIfExistInFirstProduct,
  selectColorIfExistInFirstProduct,
} from "../support/utils";
describe("Add two items of goods in shopping cart from Men> Tops> Tanks", () => {
  it("User can add products successfully", () => {
    const { Men } = filterOptions.Menu;
    cy.visit("/");
    cy.navMainMenu(`${Men}`, "Men", "Tops", "Tanks");
    //Checking that redirect for 'Tanks' page is successfull
    cy.contains("#page-title-heading", "Tanks").should("be.visible");
    //Sorting by position
    cy.get("#sorter").select("Position");
    //Opening first item on the page
    cy.get("ol.products").find("li.product-item").first().click();
    selectSizeIfExistInFirstProduct();
    selectColorIfExistInFirstProduct();
    cy.get("#product-addtocart-button").click();
    //Verify that 1 item is added to Cart
    cy.get(".showcart > .counter").should("contain", 1);
    cy.go("back");
    //Opening second item on the page
    cy.get("ol.products").find("li.product-item").eq(1).click();
    selectSizeIfExistInFirstProduct();
    selectColorIfExistInFirstProduct();
    cy.get("#product-addtocart-button").click();
    // Verify that 2 items are added to Cart
    cy.get(".showcart > .counter").should("contain", 2);
    cy.get(".showcart").click();
    //Click Proceed to Checkout button
    cy.get("#top-cart-btn-checkout").click();
    cy.waitPageLoad();
    //Verify both products are added to Cart
    cy.get(".opc-block-summary")
      .should("be.visible")
      .within(() => {
        cy.get(".title strong span")
          .should("contain.text", "2")
          .and("contain.text", "Items in Cart");
      });
  });
});
