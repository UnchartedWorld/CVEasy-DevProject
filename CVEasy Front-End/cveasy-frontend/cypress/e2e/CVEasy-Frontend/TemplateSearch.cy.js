/// <reference types="cypress" />

// This will just check if the default stuff appears i.e. headers and such

describe("Default search elements", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/Templates");
  });

  it("displays header with suggestion text", () => {
    cy.contains("Find a template that you like, and try it out:");
  });

  it("displays search bar", () => {
    cy.get("#templateSearchBar");
  });
});

// These will now run more dynamic tests - making sure the search bar works and so on.

describe("Search bar functionality", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/Templates");
  });

  it("displays media card results after typing valid search parameter - namely nothing", () => {
    cy.get("#templateSearchBar").type("{enter}");
    cy.get(".MuiCard-root").should("exist");
    cy.contains(
      "Sorry, it appears nothing was returned. Try searching for something else, or check your connection."
    ).should("not.exist");
  });

  it("displays h4 text that serves as a 'not found' placeholder", () => {
    cy.get("#templateSearchBar").type("abdsakjdsadhkjsahdjsahd{enter}");
    cy.get(".MuiCard-root").should("not.exist");
    cy.contains(
      "Sorry, it appears nothing was returned. Try searching for something else, or check your connection."
    ).should("exist");
  });
});

// Finally, these tests will make sure the media cards redirect correctly.

describe("Media card click functionality", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/Templates");
  });

  it("redirects user to TemplateView page after clicking media card", () => {
    cy.get("#templateSearchBar").type("{enter}");
    cy.get(".MuiCard-root").click();
    cy.url().should("include", "/TemplateView");
    cy.location().should((location) => {
      expect(location.pathname).to.equal("/TemplateView");
    });
  });
});
