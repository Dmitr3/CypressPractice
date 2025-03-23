describe("PUT request. Update booking record", () => {
  it("Update booking record to add 'additionalneeds' value when it was empty", () => {
    cy.fixture("IncompleteJsonForPutRequest").then(
      (IncompleteJsonForPutRequest) => {
        const bookingEndpoint = "/booking";

        // Get the token
        cy.AuthCreateToken().then((token) => {
          // Create a new booking record
          cy.PostBooking("IncompleteJsonForPutRequest", bookingEndpoint).then(
            (response) => {
              const bookingId = response.body.bookingid; // Save booking id

              // Prepare new data for updating
              const updatedBooking = {
                ...IncompleteJsonForPutRequest,
                additionalneeds: "Sea View",
              };

              // Update the record
              cy.request({
                url: `${Cypress.config(
                  "baseUrl"
                )}${bookingEndpoint}/${bookingId}`,
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  Cookie: `token=${token}`,
                },
                body: updatedBooking,
              }).then((putResponse) => {
                // Verify that the update was successful
                expect(putResponse.status).to.eq(200);
                expect(putResponse.body).to.deep.equal(updatedBooking);

                // Perform GET request to ensure the record is updated
                cy.request({
                  url: `${Cypress.config(
                    "baseUrl"
                  )}${bookingEndpoint}/${bookingId}`,
                  method: "GET",
                  headers: {
                    Accept: "application/json",
                  },
                })
                  .its("body")
                  .then((body) => {
                    // Verify that the data is updated
                    expect(body).to.deep.equal(updatedBooking);
                  });
              });
            }
          );
        });
      }
    );
  });
});
