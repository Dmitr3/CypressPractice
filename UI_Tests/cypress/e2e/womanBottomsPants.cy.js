const filterOptions = require("../fixtures/filterOptions.json");
describe("Women > Bottoms > Pants page", () => {
  it("Filter: Style, Size, Climate, Color, Eco collection, add in box", () => {
    const { NoPerfFabric } = filterOptions.PerformanceFabric;
    const { FortyFifty } = filterOptions.Price;
    const { NoSale } = filterOptions.Sale;
    const { Women } = filterOptions.Menu;
    cy.visit("/");
    cy.navMainMenu(`${Women}`, "Women", "Bottoms", "Pants");
    cy.filterShoppingOptionsText("Pattern", "Solid");
    cy.filterShoppingOptionsText("Performance Fabric", `${NoPerfFabric}`);
    cy.filterShoppingOptionsText("Price", `${FortyFifty}`);
    cy.filterShoppingOptionsText("Sale", `${NoSale}`);
    cy.get(".product-item").first().click();
    cy.get("span[data-ui-id='page-title-wrapper']")
      .invoke("text")
      .then((titleText) => {
        cy.get("#description .product.attribute.description p")
          .first()
          .invoke("text")
          .should("contains", titleText);
      });
    cy.get("#tab-label-additional").click();
    cy.get("[data-th='Pattern']").invoke("text").should("eq", "Solid");
  });
  it("Sort by: product name, add reviews", () => {
    const { Women } = filterOptions.Menu;
    cy.visit("/");
    cy.navMainMenu(`${Women}`, "Women", "Bottoms", "Pants");
    cy.get("#sorter").select("Product Name");
    cy.get(".product-item").first().click();
    cy.get("#tab-label-reviews-title").click();
    cy.get("#Rating_3").check({force:true});
    cy.get("#nickname_field").clear().type("TestTestTestTestTest");
    cy.get("#summary_field").clear().type("Summary");
    cy.get("#review_field").clear().type("Review 123 QWE");
    cy.get("button.action.submit.primary").click();
    cy.get("[data-ui-id='message-success'] div")
      .invoke("text")
      .should("eq", "You submitted your review for moderation.");
  });
});
