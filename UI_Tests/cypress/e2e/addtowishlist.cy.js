const credentials = require("../fixtures/credentials.json");
describe("Add Goods to Wish List", () => {
  it("User can add and remove from wish list successfully", () => {
    const { userFirstName, userLastName } = credentials.Ladziata;
    //Log in
    cy.loginToApplication("Ladziata");
    cy.get("#ui-id-8 > span").click();
    //Hover over first banner and select it
    cy.get("a.block-promo").first().click();
    //Hover over first product and select it
    cy.get(".product-item").first().click();
    //Add to Wish List
    cy.get(".product-addto-links > .towishlist").click();
    // Verify navigation to "My Wish List"
    cy.contains("h1.page-title", "My Wish List").should("be.visible");
    // Hover over the item to reveal the "Remove" button
    cy.get(".block-wishlist").trigger("mouseover");
    cy.get(".actions-secondary > .btn-remove").should("be.visible").click();
    cy.contains("You have no items in your wish list.").should("be.visible");
    //Logout
    cy.logout();
  });
});
