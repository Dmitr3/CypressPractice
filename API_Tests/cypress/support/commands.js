// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//-- This command uses json file with request payload from cypress/fixtures and request url from cypress.config.js to create booking via POST request--
Cypress.Commands.add("PostBooking", (fixtureName, endpoint) => {
  const postUrl = `${Cypress.config("baseUrl")}${endpoint}`
  cy.fixture(fixtureName).then((requestBody) => {
    cy.request({
      method: "POST",
      url: postUrl,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: requestBody,
    }).then((response) => {
      expect(response.status).to.eq(200);
      return response;
    });
  });
});
Cypress.Commands.add("AuthCreateToken",()=>{
    cy.request({
      method: "POST",
      url: "https://restful-booker.herokuapp.com/auth",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        username: "admin",
        password: "password123",
      },
    }).then((authResponse) => {
      cy.log("Auth Response: ", JSON.stringify(authResponse.body));
      expect(authResponse.status).to.eq(200);
      return cy.wrap(authResponse.body.token);
    });
})