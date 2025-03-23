const filterOptions = require("../fixtures/filterOptions.json");
describe("Panel Tests: Woman-Bottoms-Shorts", () => {
  // test includes
  // 1.navigating to Women>Bottoms> Shorts
  // 2.Sorting list of items by 'Price'
  // 3.adding related product to wishlist, and checking that wishlist is not empty
  // 4.Opening item in wishlist and adding it to comparison list
  // 5.Logging out

  it("Panel Woman: Sorting by price, Add to Wishlist, Add to compare", () => {
    const { Women } = filterOptions.Menu;
    cy.loginToApplication("Ladziata");
    cy.navMainMenu(`${Women}`, "Women", "Bottoms", "Shorts");

    cy.get("#sorter").select("Price"); //sorting by price
    cy.get("ol.products").find("li.product-item").first().click(); //opening first item on the page

    cy.get(".products-related") //mowing to related products list and adding first product to wishlist
      .find("li.product-item")
      .first()
      .find("a.towishlist")
      .click();

    cy.contains(
      ".message-success",
      "Prima Compete Bra Top has been added to your Wish List"
    ).should("be.visible"); //verifying that redirect for 'My Wish list' page is successfull

    cy.get(".products-grid ol.product-items") // check that WishList grid is not empty
      .find("li.product-item")
      .its("length")
      .should("be.gt", 0);

    cy.get(".products-grid ol.product-items") //opening item added to 'My Wish list' page
      .find("li.product-item")
      .first()
      .click();
    cy.get("div.product-social-links").find("a.action.tocompare").click(); //click on 'Add to Compare'
    cy.contains(
      ".message-success",
      "You added product Prima Compete Bra Top to the"
    ).should("be.visible"); //check that user is redirected to 'Add to Compare' page and success message is shown
    cy.get('[title="Compare Products"]').click(); // navigate to "Compare Products"
    cy.get('[data-th="Product"]') //check that item is visible on "Compare Products" page
      .find(".product-item-photo")
      .should("be.visible");

    cy.goToWishList(); //removing test data from 'Add to My Wish List' page
    cy.contains(".block-wishlist", "My Wish List").should("be.visible");
    cy.get('div.actions-secondary [title="Remove This Item"]').first().click();

    cy.goToAddToCopmare(); //removing test data from 'Add to Compare' page
    cy.get("td.remove.product")
      .find('a[title="Remove Product"]')
      .first()
      .click();
    cy.get("button.action-accept").click();

    cy.logout(); //Logout
  });
});
