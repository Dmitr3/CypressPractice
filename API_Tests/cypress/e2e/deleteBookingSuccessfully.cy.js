describe("API test for deleting a booking", () => {
  let bookingId;

  // Create a booking before the test
  before(() => {
    cy.fixture("ValidJsonForPostRequest").then((ValidJsonForPostRequest) => {
      const bookingEndpoint = Cypress.env("paths").booking;

      cy.PostBooking("ValidJsonForPostRequest", bookingEndpoint).then(
        (response) => {
          bookingId = response.body.bookingid; // Save bookingId from the response
        }
      );
    });
  });

  it("should delete a booking by ID", () => {
    // Ensure bookingId exists before making the request
    expect(bookingId).to.exist;

    // Get the token
    cy.AuthCreateToken().then((token) => {
      const deleteUrl = `${Cypress.config("baseUrl")}${Cypress.env(
        "paths"
      ).deleteBooking.replace("{id}", bookingId)}`;

      // Make the DELETE request
      cy.request({
        method: "DELETE",
        url: deleteUrl,
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`, // Include the token in the Cookie header
        },
        failOnStatusCode: false,
      }).then((response) => {
        // Check that the delete request was successful
        expect(response.status).to.eq(201);
        expect(response.body).to.include("Created");
      });
    });
  });
  it("should return 404 when retrieving the deleted booking", () => {
    const getUrl = `${Cypress.config("baseUrl")}${Cypress.env(
      "paths"
    ).bookingById.replace("{id}", bookingId)}`;

    cy.request({
      method: "GET",
      url: getUrl,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404); // Expect a 404 status since the booking should be deleted
    });
  });
});
