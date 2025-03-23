const filterOptions = require("../fixtures/filterOptions.json");

describe("Gear > Bags page", () => {
    it("User could successfully arrive Gear > Bags page and filter using  different shopping options", () => {
        const { Gear } = filterOptions.Menu;
        const { ThirtyForty } = filterOptions.Price;
        const { YesSale } = filterOptions.Sale;
        cy.visit("/");
        //Navigate to the Gear > Bags page
        cy.navMainMenu(`${Gear}`, "Gear", "Bags");
        //Select  each available filter option from the 'Shopping Options'
        const obj = { "Style": "Backpack", "Activity": "School", "Features": "Lightweight", 
            "Material": "Polyester", "Strap/Handle": "Padded", "Price": `${ThirtyForty}`,  
            "Erin Recommends": "Yes", "Sale": `${YesSale}`};
        Object.entries(obj).forEach(([option, value]) => {
            cy.filterShoppingOptionsText(option, value);
        });
        //Verify the number of displayed on the page products is equal to number displayed in the 'toolbar-number'
        let toolbarNumber;
        cy.get('.toolbar-number').first().invoke('text').then((text) => {
            toolbarNumber = text;
            cy.get(".product-item").should('have.length', toolbarNumber)
        });
    });
});