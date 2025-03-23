describe("PUT Updates a current booking", () => {
  it("Update totalprice and depositpaid properties", () => {
    const bookingEndpoint = Cypress.env("paths").booking;
    cy.PostBooking("ValidJsonForPostRequest", bookingEndpoint).then(
      (postResponse) => {
        cy.log("POST Response: ", JSON.stringify(postResponse.body));
        const BookingId = postResponse.body.bookingid;
        cy.log("Booking ID from POST: ", BookingId);
        cy.AuthCreateToken().then((token) => {
          const url = `${Cypress.config("baseUrl")}${Cypress.env(
            "paths"
          ).updateBooking.replace("{id}", BookingId)}`;

          cy.request({
            method: "PUT",
            url: url,
            headers: {
              "Content-Type": "application/json",
              Cookie: `token=${token}`,
            },
            body: {
              firstname: "Dzmitry",
              lastname: "APICypressTest",
              totalprice: 456,
              depositpaid: false,
              bookingdates: {
                checkin: "2025-01-01",
                checkout: "2025-01-10",
              },
              additionalneeds: "Breakfast",
            },
          }).then((putResponse) => {
            cy.log("PUT Response: ", JSON.stringify(putResponse.body));
            expect(putResponse.status).to.eq(200);
            expect(putResponse.body.totalprice).to.eq(456);
            expect(putResponse.body.depositpaid).to.eq(false);
          });
        });
      }
    );
  });
});
