describe("Search Tests", () => {
  it("PerformSearchOfTheItem", () => {
    cy.loginToApplication("Ladziata");
    cy.get("#search").type("jacket for men");
    cy.get('button[title="Search"]').click();
    cy.get('ol.products')
      .find('li.product-item')
      .its("length")
      .should("be.gt", 0);
  });
});
