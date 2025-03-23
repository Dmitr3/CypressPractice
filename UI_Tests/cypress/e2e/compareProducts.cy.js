describe("The comparing of the products", () => {
  it("A non-authorized user is comparing 2 products", () => {
    for (let i = 0; i < 2; i++) {
      cy.visit("/what-is-new.html")
      cy.get(".product-item").eq(i).click();
      cy.wait(1000)
      cy.get("a.action.tocompare[data-role='add-to-links']")
        .should("be.visible")
        .click();
    }
    cy.goToAddToCopmare()
    cy.get("[data-th='Product']").should('have.length', 2)
  });
});