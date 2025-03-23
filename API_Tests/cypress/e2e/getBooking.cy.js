describe("API test to get the booking list", () => {
  it("Should return the full list of bookings", () => {
    const url = `${Cypress.config("baseUrl")}${
      Cypress.env("paths").getBookingIds
    }`;
    cy.request(url).then((response) => {
      expect(response.status).to.eq(200);

      // Check that the response body is an array
      expect(response.body).to.be.an("array");

      // Check the list is not empty
      expect(response.body.length).to.be.greaterThan(0);
    });
  });
});
