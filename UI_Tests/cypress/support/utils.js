// Function to select size if it exists
function selectSizeIfExistInFirstProduct() {
  cy.get(".product-info-main").then(($productInfoMain) => {
    if (
      $productInfoMain.find('div[class="swatch-attribute size"]').length > 0
    ) {
      cy.wrap($productInfoMain)
        .find(".swatch-attribute.size .swatch-option")
        .first()
        .click();
    }
  });
}

export { selectSizeIfExistInFirstProduct };

// Function to select color if it exists
function selectColorIfExistInFirstProduct() {
  cy.get(".product-info-main").then(($productInfoMain) => {
    if (
      $productInfoMain.find('div[class="swatch-attribute color"]').length > 0
    ) {
      cy.wrap($productInfoMain)
        .find(".swatch-attribute.color .swatch-option")
        .first()
        .click();
    }
  });
}

export { selectColorIfExistInFirstProduct };

// Function to generate a random string of specified length
function generateRandomString(length) {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export { generateRandomString };

// Function to generate a random email
function generateRandomEmail() {
  const randomString = generateRandomString(8);
  return `${randomString}@example.com`;
}

export { generateRandomEmail };

// Function to generate a random
function generateRandomNickname() {
  const length = 8;
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let nickname = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    nickname += charset[randomIndex];
  }
  return nickname;
}

export { generateRandomNickname };

//Function to select Filter and option in filter
function selectFilterOption(filterText, optionText) {
  cy.contains("div.filter-options-item", filterText)
    .click()
    .find("li.item")
    .contains(optionText)
    .click();
}
export { selectFilterOption };

//Function for finding footer;
function checkFootervisibility(footerName) {
  cy.contains("footer ul li a", footerName).should("be.visible");
}
export { checkFootervisibility };

function clickOnFooterLink(footerName) {
  cy.contains("footer ul li a", footerName)
  .should("not.be.disabled")
  .click();
}
export { clickOnFooterLink };
