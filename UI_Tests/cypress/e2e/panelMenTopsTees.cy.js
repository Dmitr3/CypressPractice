const filterOptions = require("../fixtures/filterOptions.json");

describe("Panel Tests: Men-Tops-Tees", () => {
  // test includes
  // 1. Navigate to Men> Tops> Tees
  // 2. Filter by 'Options' (Erin Recommends, Material, new)
  // 3. Change view from grid to list
  // 4. Add last Item from the list to cart
  // 5. Remove test data (remove item from cart)

  it("Panel Men> Tops> Tees Filtering by 'Erin Recommends', 'Material', 'New'. Adding to cart'/Removing from cart", () => {
    const { Men } = filterOptions.Menu;
    const { NotRecommended } = filterOptions.ErinRecommends;
    const { YesNew } = filterOptions.New;

    cy.loginToApplication("Ladziata"); //Log in
    cy.navMainMenu(`${Men}`, "Men", "Tops", "Tees"); //Navigate to Men> Tops> Jackets
    cy.filterShoppingOptionsText("Erin Recommends", `${NotRecommended}`);
    cy.filterShoppingOptionsText("Material", "Polyester");
    cy.filterShoppingOptionsText("New", `${YesNew}`);

    cy.get("div.filter-current ol.items") //check that 3 filters are selected
      .find("li.item")
      .should("have.length", 3);

    cy.get("#mode-list").click(); //Change view from grid to list

    cy.get("ol.product-items li.product-item").last().click(); //open last item in the list
    cy.get("#option-label-size-143-item-168").click(); //select size
    cy.get("#option-label-color-93-item-56").click(); //select color
    cy.get("#product-addtocart-button").click(); //click on 'Add to cart' button

    cy.get(".showcart > .counter").should("contain", 1); //Verify that 1 item is added to Cart
    cy.RemoveTestDataFromCart();
  });
});
