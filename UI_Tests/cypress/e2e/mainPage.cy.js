describe("Banners section", () => {
  it("Yoga collection banner successfully opened", () => {
    cy.visit("/");
    cy.get("a.block-promo.home-main").click();
    cy.get("span[data-ui-id='page-title-wrapper']").should(
      "have.text",
      "New Luma Yoga Collection"
    );
  });
   it("Pants collection banner successfully opened", () => {
     cy.visit("/");
     cy.get("a.block-promo.home-pants").click();
     cy.get("span[data-ui-id='page-title-wrapper']").should(
       "have.text",
       "Pants"
     );
   });
   it("Tees collection banner successfully opened", () => {
     cy.visit("/");
     cy.get("a.block-promo.home-t-shirts").click();
     cy.get("span[data-ui-id='page-title-wrapper']").should(
       "have.text",
       "Tees"
     );
   });
   it("Erin recommends banner successfully opened", () => {
     cy.visit("/");
     cy.get("a.block-promo.home-erin").click();
     cy.get("span[data-ui-id='page-title-wrapper']").should(
       "have.text",
       "Erin Recommends"
     );
   });
   it("Performance fabrics banner successfully opened", () => {
     cy.visit("/");
     cy.get("a.block-promo.home-performance").click();
     cy.get("span[data-ui-id='page-title-wrapper']").should(
       "have.text",
       "Performance Fabrics"
     );
   });
   it("Eco friendly page banner successfully opened", () => {
     cy.visit("/");
     cy.get("a.block-promo.home-eco").click();
     cy.get("span[data-ui-id='page-title-wrapper']").should(
       "have.text",
       "Eco Friendly"
     );
   });
});
describe("Hot sellers section", () => {
  it("Goods page successfully opened", () => {
    cy.visit("/");
    cy.get("div.products-grid.grid li:first-of-type img")
      .invoke("attr", "alt")
      .then((alt) => cy.wrap(alt).as("altText"));
    cy.get("div.products-grid.grid li:first-of-type").click();
    cy.get("span[data-ui-id='page-title-wrapper']")
      .invoke("text")
      .then((text) =>
        cy
          .get("@altText")
          .then((altText) => cy.wrap(text).should("eq", altText))
      );
  });
  it("An item of goods successfully added to shopping cart", () => {
    cy.visit("/");
    cy.get("div.products-grid.grid li:first-of-type img")
      .invoke("attr", "alt")
      .then((alt) => cy.wrap(alt).as("altText"));
    //Choose XS size
    cy.get("div.swatch-opt-1556 div[option-id='166']")
      .invoke("text")
      .then((size) => cy.wrap(size).as("size"));
    cy.get("div.swatch-opt-1556 div[option-id='166']").click();
    //Choose Blue colour
    cy.get("div[option-id='50']")
      .invoke("attr", "aria-label")
      .then((colour) => cy.wrap(colour).as("colour"));
    cy.get("div[option-id='50']").click();
    cy.get("form[data-product-sku='WS12'] button[title='Add to Cart']").click({
      force: true,
    });
    cy.get("@altText").then((altText) =>
      cy
        .get("div[data-ui-id='message-success'] div")
        .invoke("text")
        .should("contains", altText)
    );
    cy.get("a.action.showcart span.counter.qty", { timeout: 10000 }).should(
      "be.visible"
    );
    cy.get("a.action.showcart").click();
    cy.get("div.product.options").click();
    cy.get("dl.product.options.list dd.values span").then((elements) => {
      cy.get("@size").then((size) =>
        cy.wrap(elements[0]).invoke("text").should("eq", size)
      );

      cy.get("@colour").then((colour) =>
        cy.wrap(elements[1]).invoke("text").should("eq", colour)
      );
    });
  });
  it("Goods page with reviews successfully opened", () => {
    cy.visit("/");
    cy.get("div.products-grid.grid li:first-of-type img")
      .invoke("attr", "alt")
      .then((alt) => cy.wrap(alt).as("altText"));
    cy.get("a.action.view").first().click();
    cy.get("@altText").then((altText) =>
      cy
        .get("span[data-ui-id='page-title-wrapper']")
        .invoke("text")
        .should("eq", altText)
    );
    cy.get("div#product-review-container div.block-title").should("be.visible");
  });
  it("An item of goods successfully added to wishlist", () => {
    cy.visit("/");
    cy.loginToApplication("Ladziata");
    cy.get("div.products-grid.grid li:first-of-type img")
      .invoke("attr", "alt")
      .then((alt) => cy.wrap(alt).as("altText"));
    cy.get("a[data-action='add-to-wishlist']").first().click({ force: true });
    cy.get("@altText").then((altText) =>
      cy
        .get("div[data-ui-id='message-success'] div")
        .invoke("text")
        .should(
          "contains",
          `${altText} has been added to your Wish List. Click here to continue shopping.`
        )
    );
  });
});