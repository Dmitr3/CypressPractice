/// <reference types="cypress" />

describe("POST request. Create booking", () => {
  it("Send POST request using valid JSON payload and that booking is created via GET request", () => {
    cy.fixture("ValidJsonForPostRequest").then((ValidJsonForPostRequest) => {
      //downloading fixture to test and saving it
      const bookingEndpoint = "/booking";

      cy.PostBooking("ValidJsonForPostRequest", bookingEndpoint) //Sending POST for creating booking using fixture file
        .then((response) => {
          const bookingId = response.body.bookingid; // saving booking id for futher verification of created record

          cy.request({
            // sending GET request using booking id to verify that recird was created
            url: `${Cypress.config("baseUrl")}${bookingEndpoint}/${bookingId}`,
            headers: {
              Accept: "application/json",
            },
            method: "GET",
          })
            .its("body")
            .then((body) => {
              expect(body).to.deep.equal(ValidJsonForPostRequest); // verifying that responce for GET request coincides with data which was sent in POST request
            });
        });
    });
  });
});
