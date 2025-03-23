/// <reference types="cypress" />

describe("GET request", () => {
  it("Use GET request with missing id ", () => {
    cy.request({
      url: `${Cypress.config("baseUrl")}${Cypress.env("paths").booking}`,
      headers: {
        Accept: "application/json",
      },
      method: "GET",
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.length.greaterThan(0)
      if (response.body.length > 0) {
        response.body.forEach((booking) => {
          cy.log(`${JSON.stringify(booking)}`);
        });
      } else {
        cy.log("There are no bookings");
      }
    });
  });
});
