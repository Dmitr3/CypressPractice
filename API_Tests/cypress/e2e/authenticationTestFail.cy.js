describe("Authentication Test - Fail", () => {
  it("Should fail to authenticate with wrong credentials", () => {
    cy.request({
      method: "POST",
      url: "https://restful-booker.herokuapp.com/auth",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        username: "wronguser", // Incorrect username
        password: "wrongpassword", // Incorrect password
      },
      failOnStatusCode: false,
    }).then((authResponse) => {
      // Expect status code 200 even if the credentials are incorrect
      expect(authResponse.status).to.eq(200);
      // Check if the body has the 'reason' property with the expected error message
      expect(authResponse.body).to.have.property("reason", "Bad credentials");
    });
  });
});
