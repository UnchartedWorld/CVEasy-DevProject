/// <reference types="cypress" />

describe("Login page components, ensures they appear", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/Login");
  });
  it("displays login components", () => {
    cy.get("#email");
    cy.get("#password");
    cy.get(".css-binzgt > .MuiBox-root > .MuiButton-root");
    cy.get(".MuiGrid-root > .MuiTypography-root");
  });
});

describe("Tests that ensure fields accept values, and ensures it logs in", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/Login");
  });
  it("fills in login fields", () => {
    cy.get("#email")
      .type("testInput@gmail.com")
      .should("have.value", "testInput@gmail.com");
    cy.get("#password")
      .type("fakeInputPass")
      .should("have.value", "fakeInputPass");
  });

  it("fills in login field, then correctly logs in", () => {
    cy.get("#email")
      .type("testing@gmail.com")
      .should("have.value", "testing@gmail.com");
    cy.get("#password").type("testeight").should("have.value", "testeight");
    cy.get(".css-binzgt > .MuiBox-root > .MuiButton-root").click();
  });
});
