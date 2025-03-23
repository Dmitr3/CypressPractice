import { checkFootervisibility } from "../support/utils";
const filterOptions = require("../fixtures/filterOptions.json");
describe("Panel Tests: Training page", () => {
  // test includes
  // 1. Navigating to Training> Video Download
  // 2. Check that  "We can't find products matching the selection." is shown
  // 3. Check that footer options are available on the bottom of the page
  // 4. Check that after clicking on 'Search Terms' footer user is redirected to 'Popular Search Terms'
  // 5. Logging out

  it("Panel Training: no matching products, footer options on the bottom of hte page'", () => {
    cy.loginToApplication("Ladziata"); //Log in
    cy.navMainMenu(filterOptions.Menu.Training, "Video Download"); //Navigating to Training> Video Download
    cy.contains(
      ".message.empty",
      "We can't find products matching the selection."
    ).should("be.visible"); //Check that  "We can't find products matching the selection." is shown
    checkFootervisibility("Notes"); //Check that footer options are available on the bottom of the page
    checkFootervisibility("Practice API Testing using Magento 2");
    checkFootervisibility("Write for us");
    checkFootervisibility("Subscribe");
    checkFootervisibility("Search Terms");
    checkFootervisibility("Privacy and Cookie Policy");
    checkFootervisibility("Advanced Search");
    cy.contains("footer ul li a", "Privacy and Cookie Policy").click(); //after clicking on 'Privacy and Cookie Policy' footer user is redirected to 'Privacy Policy'
    cy.contains("h1.page-title", "Privacy Policy").should("be.visible");
    cy.get('[title="Go to Home Page"]').click();
    cy.logout(); //Logout
  });
});
