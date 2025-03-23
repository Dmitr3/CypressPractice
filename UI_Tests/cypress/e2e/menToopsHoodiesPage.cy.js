const filterOptions = require("../fixtures/filterOptions.json");
describe("Men > Tops > Hoodies & Sweatshirts page", () => {
  it("Filter: Size, Climate, Color, Eco collection, add in box", () => {
    const { XS } = filterOptions.Size;
    const { Blue } = filterOptions.Color;
    const { NoEco } = filterOptions.EcoCollection;
    const { Men } = filterOptions.Menu;
    cy.visit("/");
    cy.navMainMenu(`${Men}`, "Men", "Tops", "Hoodies & Sweatshirts");
    cy.filterShoppingOptionsText("Size", `${XS}`);
    cy.filterShoppingOptionsText("Climate", "Cool");
    cy.filterShoppingOptionsText("Color", `${Blue}`);
    //Choose No option in Eco Collection
    cy.filterShoppingOptionsText("Eco Collection", `${NoEco}`);
    cy.addFirstProductToCart();
    cy.get("div.column.main a.product-item-link")
      .first()
      .invoke("text")
      .then((text) => {
        cy.get("div[data-ui-id='message-success'] div")
          .invoke("text")
          .should(
            "contains",
            `You added ${text.trim()} to your shopping cart.`
          );
      });
  });
});