/// <reference types="cypress" />

describe("Ensures each section appears, with relevant text in each", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/Login");
    cy.get("#email")
      .type("testing@gmail.com")
      .should("have.value", "testing@gmail.com");
    cy.get("#password").type("testeight").should("have.value", "testeight");
    cy.get(".css-binzgt > .MuiBox-root > .MuiButton-root").click();
    cy.wait(700);
    cy.contains("Upload").click();
  });

  it("checks that each section itself appears, regardless of text", () => {
    // This is the Upload Guidelines section.
    cy.get(".css-1ozi5bn-MuiGrid-root");
    // This is the LaTeX code advice section.
    cy.get(".css-d4x37r-MuiGrid-root");
    // This is the actual upload form
    cy.get(".css-7hyp0e-MuiGrid-root");
  });

  it("checks if the stuff in Upload Guidelines appears", () => {
    // This is the header
    cy.contains("Upload a theme");
    // This is the subheader
    cy.contains("Upload guidelines:");
    // These will contain the list
    cy.get(
      ".css-1ozi5bn-MuiGrid-root > :nth-child(3) > .MuiList-root > :nth-child(1)"
    );
    cy.get(
      ".css-1ozi5bn-MuiGrid-root > :nth-child(3) > .MuiList-root > :nth-child(2)"
    );
    cy.get(
      ".css-1ozi5bn-MuiGrid-root > :nth-child(3) > .MuiList-root > :nth-child(3)"
    );
    cy.get(".MuiList-root > :nth-child(4)");
    cy.get(".MuiList-root > :nth-child(5)");
  });

  it("checks if the stuff in LaTeX code advice appears", () => {
    cy.contains("What should my LaTeX code include?");
    cy.get(".css-d4x37r-MuiGrid-root > :nth-child(2) > .MuiTypography-root");
    cy.get(".css-d4x37r-MuiGrid-root > :nth-child(3) > .MuiTypography-root");
  });

  it("checks if the stuff in the Upload Form appears", () => {
    cy.contains("Ready to upload?");
    cy.get(".css-7hyp0e-MuiGrid-root > :nth-child(2) > .MuiTypography-root");
    cy.get(".css-7hyp0e-MuiGrid-root > :nth-child(3) > .MuiTypography-root");
    cy.get("#templateTitle");
    cy.get(":nth-child(4) > .MuiTypography-root");
    cy.get("#templateDescription");
    cy.get(":nth-child(5) > .MuiTypography-root");
    cy.get("#templateVersion");
    // This is the Upload button.
    cy.get(".MuiGrid-grid-xs-10 > .MuiButtonBase-root");
    // This is the submit button.
    cy.get(".MuiGrid-grid-xs-2 > .MuiButtonBase-root");
  });

  it("tests to make sure the text fields can have entries inside of them", () => {
    cy.get("#templateTitle").type("Test title").should("have.value", "Test title");
    cy.get("#templateDescription").type("Test description, haha real funny").should("have.value", "Test description, haha real funny");
    cy.get("#templateVersion").type("Version 1").should("have.value", "Version 1");
  });
});