describe("GET all bookings that exist", () => {
  it("Empty response", () => {
    cy.request(
      `${Cypress.config("baseUrl")}${
        Cypress.env("paths").getBookingIds
      }?firstname=777`
    ).then((response) => {
      cy.log("Response: ", JSON.stringify(response.body));
      expect(response.status).to.eq(200);
      expect(response.body).to.be.empty;
    });
  });
});
