import {
  generateRandomEmail,
  generateRandomNickname
} from "../support/utils";
 describe("The purchase of non-authorised user", () => {
  it("A non-authorized user makes an successfull purchase", () => {
    //Navigating to the product page
    cy.visit("/wayfarer-messenger-bag.html");
    cy.contains("Add to Cart").should("be.visible");
    //Adding the product to the cart
    cy.get("#product-addtocart-button").click();
    cy.get(".showcart > .counter").should("contain", 1);
    cy.get(".showcart").click();
    cy.get('a[class="action viewcart"]').click();
    cy.contains("Order Total").should("be.visible")
    //Proceeding to the checkout
    cy.get('button[data-role="proceed-to-checkout"]').click()
    cy.contains("Shipping Address").should("be.visible");
    //Filling the form with email, customer info and shipping address
    const email = generateRandomEmail()
    cy.get("#customer-email").type(email)
    const first_name = generateRandomNickname()
    cy.get('input[name="firstname"]').type(first_name)
    const last_name = generateRandomNickname()
    cy.get('input[name="lastname"]').type(last_name)
    const street = generateRandomNickname()
    cy.get('input[name="street[0]"]').type(street)
    const city = generateRandomNickname()
    cy.get('input[name="city"]').type(city)
    cy.get('select[name = "region_id"]').select("Alabama")
    cy.get('input[name = "postcode"]').type("12345")
    cy.get('input[name = "telephone"]').type("123456789")
    cy.get('input[value="flatrate_flatrate"]').click()
    cy.get('button[data-role="opc-continue"]').click()
    //Finilizing of the purchase
    cy.get('button[class="action primary checkout"]').click()
    //Verifying that the purchase is successful
    cy.contains("Thank you for your purchase!").should("be.visible");
  });
});