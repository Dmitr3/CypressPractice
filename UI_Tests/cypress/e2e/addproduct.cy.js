import {
  selectSizeIfExistInFirstProduct,
  selectColorIfExistInFirstProduct,
} from "../support/utils";
describe("Add Product without login", () => {
  it("User can add product successfully", () => {
    cy.visit("/");
    cy.contains("Create an Account").should("be.visible");
    //Click 'What's new' button
    cy.get("#ui-id-3 > span").click();
    //Hover over first product and select it
    cy.get(".product-item").first().click();
    selectSizeIfExistInFirstProduct();
    selectColorIfExistInFirstProduct();
    cy.get("#product-addtocart-button").click();
    //Verify that 1 item is added to Cart
    cy.get(".showcart > .counter").should("contain", 1);
    cy.get(".showcart").click();
    //Click View and Edit Cart
    cy.get('a[class="action viewcart"]').click();
    cy.contains("Shopping Cart").should("be.visible");
    cy.get("#form-validate").should("have.length", 1);
  });
});
