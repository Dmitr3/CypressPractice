const credentials = require("../fixtures/credentials.json");
describe("Log in user", () => {
  it("Successful Log in", () => {
    const {email,password,userFirstName,userLastName} = credentials.Ladziata;
    //Open site
    cy.visit("https://magento.softwaretestingboard.com/");
    //Click on 'Sign in' button to go to Sign in page
    cy.get("div.panel.header li.authorization-link").click();
    //Fill in Email and Password fields
    cy.get("#login-form input[title='Email']").type(
      `${email}`
    );
    cy.get("#login-form input[title='Password']").type(
      `${password}`
    );
    //Click 'Sign in' button to Log in
    cy.get("button.action.login.primary").click();
    //'Welcome' word verification
    cy.get("header .logged-in").should(
      "have.text",
      `Welcome, ${userFirstName} ${userLastName}!`
    );
  });
});
// Using 'loginToApplication' function
describe("Log in user using 'loginToApplication' function", () => {
  it("Successful Log in with 'loginToApplication' function", () => {
    const { userFirstName, userLastName } =
      credentials.Ladziata;
    //Log in
    cy.loginToApplication("Ladziata");
    //'Welcome' word verification
    cy.get("header .logged-in").should(
      "have.text",
      `Welcome, ${userFirstName} ${userLastName}!`
    );
  });
});