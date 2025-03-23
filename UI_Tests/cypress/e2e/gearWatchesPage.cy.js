const filterOptions = require("../fixtures/filterOptions.json");

describe("Gear > Watches page", () => {
  it("User could successfully arrive Gear > Watches page", () => {
    const { Gear } = filterOptions.Menu;
    cy.visit("/");
    //Navigate to the Gear > Watches page
    cy.navMainMenu(`${Gear}`, "Gear", "Watches");
    //Verify the list of shopping options contains appropriate number of options
    cy.get("#narrow-by-list > .filter-options-item").should('have.length', 7)
    //Select  'Outdoor' filter option of the 'Activity' shopping option
    cy.filterShoppingOptionsText("Activity", "Outdoor")
    //Verify the number of displayed on the page products is equal to number displayed in the 'toolbar-number'
    let toolbarNumber;
    cy.get('.toolbar-number').first().invoke('text').then((text) => {
        toolbarNumber = text;
        cy.get(".product-item").should('have.length', toolbarNumber)
    });
  });
});