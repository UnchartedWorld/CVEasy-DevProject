/// <reference types="cypress" />

// This section will handle the Hero elements and ensure they appear.

describe("Hero for landing page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/Home");
  });
  it("displays smaller header with short text", () => {
    cy.contains("CVEasy makes it, well, easy.");
  });
  it("displays the larger header with text", () => {
    cy.contains("Create resumes with the power of LaTeX!");
  });

  it("displays button that redirects to registration page", () => {
    cy.get('[data-testid="getStartedBtn"] > a');
  });

  it("displays image for hero section", () => {
    cy.get("img").should("have.attr", "src", "/assets/resume-Folder.svg");
  });

  it("redirects to the Registration page", () => {
    cy.get('[data-testid="getStartedBtn"] > a').click();
    cy.url().should("include", "/Register");
    cy.location().should((location) => {
      expect(location.pathname).to.equal("/Register");
    });
  });
});

// This section will handle the feature section, ensuring they all appear.

describe("Feature section for landing page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("displays header for feature cards", () => {
    cy.contains("What can this web app do? Well..");
  });
});

// This section handles the interested section, makes sure it appears.
// Furthermore, like the hero section, it makes sure the button works properly.

describe("Interested section for landing page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("displays header asking if user is interested", () => {
    cy.contains("Interested?");
  });

  it("displays the browse template button", () => {
    cy.get('[data-testid="browse-Template-Btn"]');
  });

  it("displays image for interested section", () => {
    cy.get('img[src="/assets/online-CV.svg"]');
  });

  it("redirects to Browse Template page", () => {
    cy.get('[data-testid="browse-Template-Btn"]').click();
    cy.url().should("include", "/Templates");
    cy.location().should((location) => {
      expect(location.pathname).to.equal("/Templates");
    });
  });
});
