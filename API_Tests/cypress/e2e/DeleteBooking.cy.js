describe("DELETE existing booking", () => {
  it("DELETE booking with invalid id", () => {
    cy.AuthCreateToken().then((token) => {
      cy.request({
        method: "DELETE",
        url: `${Cypress.config("baseUrl")}${Cypress.env(
          "paths"
        ).deleteBooking.replace("{id}", "999999")}`,
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        failOnStatusCode: false,
      }).then((deleteResponse) => {
        cy.log("Delete Response: ", JSON.stringify(deleteResponse.body));
        expect(deleteResponse.status).to.eq(405);
      });
    });
  });
});
