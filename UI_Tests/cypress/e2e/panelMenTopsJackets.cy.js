const filterOptions = require("../fixtures/filterOptions.json");

describe("Panel Tests: Men-Tops-Jackets", () => {
  // test includes
  // 1. Navigate to Men> Tops> Jackets
  // 2. Filter by 'Options' (Style, Size, Climate, Color, Eco collection)
  // 3. Opening item
  // 4. Check that item cannot be added to cart if size and color are not selected
  // 5. Log out

  it("Panel Men> Tops> Jackets Filtering by 'Style', 'Size', 'Climate', 'Color', 'Eco collection'. Adding to cart'", () => {
    const { Men } = filterOptions.Menu;
    const { L } = filterOptions.Size;
    const { Green } = filterOptions.Color;
    const { NoEco } = filterOptions.EcoCollection;

    cy.loginToApplication("Ladziata"); //Log in
    cy.navMainMenu(`${Men}`, "Men", "Tops", "Jackets"); //Navigate to Men> Tops> Jackets
    cy.filterShoppingOptionsText("Style", "Insulated");
    cy.filterShoppingOptionsText("Size", `${L}`);
    cy.filterShoppingOptionsText("Color", `${Green}`);
    cy.filterShoppingOptionsText("Eco Collection", `${NoEco}`);
    cy.filterShoppingOptionsText("Climate", "Spring");

    cy.get("div.filter-current ol.items") //check that 5 filters are selected
      .find("li.item")
      .should("have.length", 5);
    cy.get("ol.product-items li.product-item").first().click(); //open first item
    cy.get("#product-addtocart-button").click(); //click on 'Add to cart' button
    cy.get("[attribute-id='143'] div.mage-error") //check that error message appears when size is not selected
      .should("be.visible")
      .and("contain", "This is a required field."); 
    cy.get("[attribute-id='93'] div.mage-error")//check that error message appears when color is not selected
      .should("be.visible")
      .and("contain", "This is a required field."); 
    cy.logout(); //Logout
  });
});
