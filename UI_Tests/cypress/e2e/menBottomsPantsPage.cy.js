const filterOptions = require("../fixtures/filterOptions.json");
describe("Men > Bottoms > Pants page", () => {
  it("Sort goods by price, add an item to compare, add an item to wishlist", () => {
    cy.loginToApplication("Ladziata");
    const { Men } = filterOptions.Menu;
    cy.visit("/");
    cy.navMainMenu(`${Men}`, "Men", "Bottoms", "Pants");
    cy.get("#sorter").select("Price");
    cy.get(".product-item").first().click();
    cy.get(".product-social-links .action.tocompare").click();
    cy.get("[data-ui-id='page-title-wrapper']").invoke("text").then((productText) => {cy.wrap(productText).as("productText")});
    cy.get("@productText").then((productText) =>{
        cy.get("div[data-ui-id='message-success'] div")
          .invoke("text")
          .should(
            "contains",
            `You added product ${productText.trim()} to the comparison list.`
          );});
    cy.get(".product-social-links a[data-action='add-to-wishlist']").click();
    cy.get("@productText").then((productText) =>
      cy
        .get("div[data-ui-id='message-success'] div")
        .invoke("text")
        .should(
          "contains",
          `${productText} has been added to your Wish List. Click here to continue shopping.`
        )
    );
  });
});
