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
const credentials = require("../fixtures/credentials.json");

Cypress.Commands.add("loginToApplication", (surname) => {
  const { email, password, userFirstName, userLastName } = credentials[surname];
  cy.visit("/");
  cy.contains("Sign In").click();
  cy.get("#email").type(email);
  cy.get("#pass").type(password);
  cy.get("#send2").click();

  function checkLogin(attempts) {
    if (attempts > 0) {
      cy.get("body").then((body) => {
        const welcomeElement = body.find(
          "div.page-title-wrapper h1.page-title span"
        );
        if (
          welcomeElement.length > 0 &&
          welcomeElement.text().includes(`Home Page`)
        ) {
          cy.get('header li[class="greet welcome"]').contains(
            `Welcome, ${userFirstName} ${userLastName}!`
          );
          cy.log("Login successful");
        } else {
          retryLogin(attempts);
        }
      });
    } else {
      cy.log("All login attempts failed");
    }
  }

  function retryLogin(attempts) {
    cy.log("Login failed, retrying...");
    cy.get("#email").clear().type(email);
    cy.get("#pass").clear().type(password);
    cy.get("#send2").click();
    checkLogin(attempts - 1);
  }

  checkLogin(3);
});

Cypress.Commands.add("logout", () => {
  cy.get("div.header").find("button.action.switch").click();
  cy.contains("Sign Out").click({force: true});
  cy.contains("You are signed out").should("be.visible");
});
Cypress.Commands.add("goToWishList", () => {
  cy.get("div.header").find("button.action.switch").click();
  cy.contains("My Wish List").click();
  cy.get("h1.page-title").should("contain", "My Wish List");
});
Cypress.Commands.add("goToAddToCopmare", () => {
  cy.get(".header.content a.action.compare").click();
  cy.get("h1.page-title").should("contain", "Compare Products");
});
Cypress.Commands.add("navMainMenu", (classMenu, firstLvl, secondLvl, thirdLvl) => {
  if (!firstLvl)
    throw new Error("Empty params: add first, second or third lvl params");
  cy.get(classMenu).contains(firstLvl).trigger("mouseover", { force: true });
  if (secondLvl) {
    cy.get(classMenu).contains(secondLvl).trigger("mouseover", { force: true });
    if (thirdLvl) {
      cy.get(classMenu).contains(thirdLvl).click({ force: true });
      return;
    };
    cy.get(classMenu).contains(secondLvl).click({ force: true });
    return;
  }
  cy.get(classMenu).contains(firstLvl).click({ force: true });
});
Cypress.Commands.add("filterShoppingOptionsText", (option, value) => {
  cy.waitPageLoad();
  cy.get("#narrow-by-list div div[aria-expanded='false']")
    .should("exist")
    .last();
  if (!option) throw new Error("Empty params: add option & value params");
  cy.get("#layered-filter-block").as("filterBlock");
  cy.get("@filterBlock").contains(option).should("be.visible").click();
  if (option === "Size" || option === "Color" || option === "Eco Collection" || option === "Performance Fabric" || option === "Price" || option === "Sale" || option === "Erin Recommends" || option === "New") 
    {
    cy.get("@filterBlock")
      .find(value)
      .should("be.visible")
      .click({ force: true });
  } else {
    cy.get("@filterBlock")
      .contains(value)
      .should("be.visible")
      .click({ force: true });
  }
});
Cypress.Commands.add("waitPageLoad", () => {
  cy.window().then((win) => {
    if (win.document.readyState === "complete") {
      return;
    }
    cy.wrap(
      new Cypress.Promise((resolve) => {
        win.addEventListener("load", resolve);
      })
    );
  });
});

Cypress.Commands.add("addFirstProductToCart", (maxAttempts = 10) => {
  const tryClickAddToCart = (attempt = 0) => {
    if (attempt >= maxAttempts) {
      throw new Error(`Failed to add to cart after ${maxAttempts} attempts`);
    }

    cy.get(".actions-primary .action.tocart.primary")
      .first()
      .click({ force: true });

    cy.get("body").then(($body) => {
      if ($body.text().includes("You added")) {
        return;
      }
      if ($body.text().includes("Invalid Form Key")) {
        cy.reload();
        tryClickAddToCart(attempt + 1, maxAttempts);
      } else {
        cy.log("Success Message not found. Retry");
        cy.wait(2000);
        tryClickAddToCart(attempt + 1, maxAttempts);
      }
    });
  };
  tryClickAddToCart();
});
Cypress.Commands.add('RemoveTestDataFromCart',() => {
    cy.get(".showcart").click();
    cy.get('.action.viewcart').click()
    cy.get('.cart .action-delete').click()
    cy.contains('You have no items in your shopping cart.').should("be.visible");

})
  
      
