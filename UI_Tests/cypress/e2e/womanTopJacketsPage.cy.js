const filterOptions = require("../fixtures/filterOptions.json");
describe("Add an item of goods in shopping cart from women > tops > jackets", () => {
  it("An item of goods successfully added", () => {
    const { XS } = filterOptions.Size;
    const { Blue } = filterOptions.Color;
    const { NoEco } = filterOptions.EcoCollection;
    const { Women } = filterOptions.Menu;
    cy.visit("/");
    cy.navMainMenu(`${Women}`, "Women", "Tops", "Jackets");
    cy.filterShoppingOptionsText("Style", "Jacket");
    cy.filterShoppingOptionsText("Size", `${XS}`);
    cy.filterShoppingOptionsText("Climate", "Cold");
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
