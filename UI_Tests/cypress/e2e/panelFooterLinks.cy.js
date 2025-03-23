import {
  checkFootervisibility,
  clickOnFooterLink,
} from "../support/utils";
describe("Panel Tests: Footer links on Home page", () => {
  // test includes
  // 1. Navigate to Home page
  // 2. Check visibility of all necessary Footer links
  // 3. Check that 'Search Terms', 'Advanced Search', "Privacy and Cookie Policy", "Orders and Returns" are clickable
  // 4. Check that user is redirected to necessary page after clicking on footer links 'Search Terms', 'Advanced Search', "Privacy and Cookie Policy", "Orders and Returns"
  // 5. Log out

  it("Panel Footer links on Home page", () => {
    cy.loginToApplication("Ladziata");
    checkFootervisibility("Notes");
    checkFootervisibility("Practice API Testing using Magento 2");
    checkFootervisibility("Write for us");
    checkFootervisibility("Subscribe");
    checkFootervisibility("Search Terms");
    clickOnFooterLink("Search Terms");
    cy.contains("h1.page-title", "Popular Search Terms").should("be.visible");
    cy.get("a.logo").click();
    checkFootervisibility("Privacy and Cookie Policy");
    clickOnFooterLink("Privacy and Cookie Policy");
    cy.contains("h1.page-title", "Privacy Policy").should("be.visible");
    cy.get('[title="Go to Home Page"]').click();
    checkFootervisibility("Advanced Search");
    clickOnFooterLink("Advanced Search");
    cy.contains("h1.page-title", "Advanced Search").should("be.visible");
    cy.get('[title="Go to Home Page"]').click();
    cy.logout();
  });
});
