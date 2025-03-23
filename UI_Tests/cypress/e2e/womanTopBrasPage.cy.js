const filterOptions = require("../fixtures/filterOptions.json");
import {
    selectSizeIfExistInFirstProduct,
    selectColorIfExistInFirstProduct,
} from "../support/utils";

describe("Panel Tests: Woman-Tops-Bras & Tanks", () => {
    it("Panel Women: Filtering by shopping options, switch to the list view, adding a product into the cart", () => {
        const { Women } = filterOptions.Menu;
        cy.visit("/")
        //Navigate to the Woman-Tops-Bras & Tanks page
        cy.navMainMenu(`${Women}`, "Women", "Tops", "Bras & Tanks");
        //Apply few shopping options
        const obj = { "Material": "Cotton", "Pattern": "Solid" };
        Object.entries(obj).forEach(([option, value]) => {
            cy.get(".swatch-attribute.color").should("be.visible")
            cy.filterShoppingOptionsText(option, value);
        });
        //Switch to the "List" view
        //cy.wait(500)
        cy.get("a[href$='sale=1']").should("not.be.visible")
        cy.get("a[title = 'List']").first().click()
        cy.get(".modes").find(".modes-mode.active.mode-list")
        //Add a product into the shopping cart
        cy.get(".product-item-photo")
            .first()
            .should("be.visible")
            .click();
        cy.get(".fotorama__thumb-border").should("be.visible")
        selectSizeIfExistInFirstProduct();
        selectColorIfExistInFirstProduct();
        cy.get("#product-addtocart-button").click()
        //Navigate to the shopping cart by clicking 'shopping cart' link in the alert message
        cy.get("div[role = 'alert']")
            .within(() => {
                cy.get("a[href$='checkout/cart/']")
                    .click()
            });
        //Verifying the cart contains correct number of products
        cy.get(".cart.item").should('have.length', 1)
    });
});
