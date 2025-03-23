const filterOptions = require("../fixtures/filterOptions.json");
import {
    selectSizeIfExistInFirstProduct,
    selectColorIfExistInFirstProduct,
} from "../support/utils";

describe("Panel Tests: Woman-Tops-Tees", () => {
    it("Panel Women: Sorting by 'Position', adding few products into the cart", () => {
        const { Women } = filterOptions.Menu;
        cy.visit("/")
        //Navigate to the Woman-Tops-Tees page
        cy.navMainMenu(`${Women}`, "Women", "Tops", "Tees");
        //Sort by 'Position'
        cy.get("#sorter").select("Position");
        //Select few products
        const product_number = 2
        for (let i = 0; i < product_number; i++) {
            cy.visit("women/tops-women/tees-women.html")
            cy.get(".product-item").eq(i).click();
            cy.get(".fotorama__thumb-border").should("be.visible")
            selectSizeIfExistInFirstProduct();
            selectColorIfExistInFirstProduct();
            cy.get("#product-addtocart-button").click()
        }
        cy.get(".showcart > .counter").should("contain", product_number);
        //Navigate to the shopping cart by clicking 'shopping cart' link in the alert message
        cy.get("div[role = 'alert']")
        .within(() => {
            cy.get("a[href$='checkout/cart/']")
              .click()
          });
        //Verifying the cart contains correct number of products
        cy.get(".cart.item").should('have.length', product_number)        
    });
});
