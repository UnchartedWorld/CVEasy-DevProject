/// <reference types="cypress" />

describe("Navbar component, ensures it appears", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/Home");
  });

  it("displays navbar itself", () => {
    cy.get(".MuiToolbar-root").should("be.visible");
  });
  it("displays home button in desktop view", () => {
    cy.viewport(1200, 800);
    cy.get(".css-1t0e2o > :nth-child(1) > a").should("be.visible");
  });

  it("displays template button in desktop view", () => {
    cy.viewport(1200, 800);
    cy.get(":nth-child(2) > a").should("be.visible");
  });

  it("displays about button in desktop view", () => {
    cy.viewport(1200, 800);
    cy.get(":nth-child(3) > a").should("be.visible");
  });
});

describe("Navbar component, ensures buttons redirect correctly", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/Home");
  });

  // This gets around the multiple click issue, and lets me customise as needed.
  const navbarItems = ["Home", "Templates", "About"];

  it("checks if clicking each navbar item redirects correctly", () => {
    cy.viewport(1200, 800);
    navbarItems.forEach((item) => {
      cy.contains(item).click();
      cy.location("pathname").should("eq", `/${item}`);
    });
  });
});

describe("Navbar component, but after logging in", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/Login");
  });

  it("checks to make sure that the upload button appears and redirects", () => {
    cy.get("#email")
      .type("testing@gmail.com")
      .should("have.value", "testing@gmail.com");
    cy.get("#password").type("testeight").should("have.value", "testeight");
    cy.get(".css-binzgt > .MuiBox-root > .MuiButton-root").click();
    cy.wait(700);
    cy.contains("Upload").click();
    cy.location("pathname").should("eq", "/Upload");
  });

  it("attempts to log user out AFTER logging in", () => {
    cy.get("#email")
      .type("testing@gmail.com")
      .should("have.value", "testing@gmail.com");
    cy.get("#password").type("testeight").should("have.value", "testeight");
    cy.get(".css-binzgt > .MuiBox-root > .MuiButton-root").click();
    cy.wait(700);
    cy.get(".css-2uchni").click();
    cy.contains("Logout").click();
    cy.get('.css-1xs5ldx-MuiButtonBase-root-MuiButton-root').click();
  });
});
