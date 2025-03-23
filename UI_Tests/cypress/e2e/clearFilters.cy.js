const filterOptions = require("../fixtures/filterOptions.json");

describe("Clear All Filters", () => {
  it("Filter is cleared", () => {
    const { M } = filterOptions.Size;
    const { Blue } = filterOptions.Color;
    const { No } = filterOptions.EcoCollection;

    cy.visit("/");
    cy.navMainMenu("Women", "Tops", "Hoodies & Sweatshirts");
    cy.filterShoppingOptionsText("Style", "Pullover");
    cy.filterShoppingOptionsText("Size", `${M}`);
    cy.filterShoppingOptionsText("Climate", "Cool");
    cy.filterShoppingOptionsText("Color", `${Blue}`);
    cy.filterShoppingOptionsText("Eco Collection", `${No}`);
    // Verify all filter options are selected correctly
    cy.get("div.filter-current")
      .should("be.visible")
      .within(() => {
        cy.get("li.item").should("have.length", 5);
      });
    //Click on 'Clear All' to remove all applied filters
    cy.get('a[class="action clear filter-clear"]')
      .contains("Clear All")
      .click();
    // Verify that the filters are cleared
    cy.get("div.filter-current").should("not.exist");
  });
});
