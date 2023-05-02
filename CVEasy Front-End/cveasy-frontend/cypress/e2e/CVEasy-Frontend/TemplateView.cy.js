/// <reference types="cypress" />

describe("Assuming we select a valid theme, will check if all fields contain something", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/Templates");
    cy.get("#templateSearchBar").type("{enter}");
    cy.get(".MuiCard-root").click();
  });

  it("ensures all fields appear", () => {
    cy.get(".MuiGrid-container > :nth-child(1) > ");
    cy.get(".MuiGrid-container > :nth-child(2) > ");
    cy.get(".MuiGrid-container > :nth-child(3) > ");
    cy.get(".MuiGrid-container > :nth-child(4) > ");
    cy.get(".MuiGrid-container > :nth-child(5) > ");
    cy.get(".MuiGrid-container > :nth-child(6) > ");
    // This is the Use Template Button
    cy.get(".MuiGrid-grid-xs-8 > .MuiButtonBase-root");
    // This is the preview code button.
    cy.get(".MuiGrid-grid-xs-4 > .MuiButtonBase-root");
  });

  it("ensures clicking code preview does something", () => {
    cy.get(".MuiGrid-grid-xs-4 > .MuiButtonBase-root").click();
  });

  it("ensures clicking on use template redirects", () => {
    cy.get(".MuiGrid-grid-xs-8 > .MuiButtonBase-root").click();
    cy.url().should("include", "/ResumeCreation");
    cy.location().should((location) => {
      expect(location.pathname).to.equal("/ResumeCreation");
    });
  });
});
