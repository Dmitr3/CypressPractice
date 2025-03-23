/// <reference types="cypress" />
const booking = Cypress.env("paths").booking

describe("GET request", () => {
  it("Get bookings filtered by firstname and lastname", () => {
    cy.fixture("ValidJsonForPostRequest").then((ValidJsonForPostRequest) => {
      const firstname = ValidJsonForPostRequest.firstname
      const lastname = ValidJsonForPostRequest.lastname
    
      cy.PostBooking("ValidJsonForPostRequest", booking); //Create test data
      cy.request({
        // sending GET request using firstname&lastname filters
        url: `${Cypress.config("baseUrl")}${booking}/?firstname=${firstname}&lastname=${lastname}`,
        headers: {
          Accept: "application/json",
        },
        method: "GET",
      }).then((response) => {
        expect(response.status).to.eq(200); // verifying that responce was sent successfull
        expect(response.isOkStatusCode) // verifying that responce was sent successfull
        expect(response.body).to.have.length.greaterThan(0) // verifying that responce is not empty
      });
    });
  });
 });
