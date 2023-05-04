/// <reference types="cypress" />

describe("Ensures fields appear on Account Details page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/Login");
    cy.get("#email")
      .type("testing@gmail.com")
      .should("have.value", "testing@gmail.com");
    cy.get("#password").type("testeight").should("have.value", "testeight");
    cy.get(".css-binzgt > .MuiBox-root > .MuiButton-root").click();
    cy.wait(700);
    cy.get(".css-2uchni").click();
    cy.get('.MuiList-root > [tabindex="0"] > a').click();
  });

  it("tests to make sure header labels appear", () => {
    cy.contains("Update/Enter user details")
    cy.contains("Enter first name:");
    cy.contains("Enter middle name(s):");
    cy.contains("Enter last name:");
    cy.contains("Enter phone number");
  });

  it("tests to make sure each entry field appears", () => {
    cy.get("#firstNameTextField");
    cy.get("#middleNameTextField");
    cy.get("#lastNameTextField");
    cy.get("#phoneNumberTextField");
  });

  it("tests to ensure submission button appears", () => {
    cy.get(".MuiGrid-container > :nth-child(6) > .MuiButtonBase-root");
  });
});

describe("Ensures each field can be entered into", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/Login");
    cy.get("#email")
      .type("testing@gmail.com")
      .should("have.value", "testing@gmail.com");
    cy.get("#password").type("testeight").should("have.value", "testeight");
    cy.get(".css-binzgt > .MuiBox-root > .MuiButton-root").click();
    cy.wait(700);
    cy.get(".css-2uchni").click();
    cy.get('.MuiList-root > [tabindex="0"] > a').click();
  });

  it("tests to make sure each field allows for text entry", () => {
    cy.get("#firstNameTextField")
      .clear({ force: true })
      .type("Fake First", { force: true })
      .should("have.value", "Fake First");
    cy.get("#middleNameTextField")
      .clear({ force: true })
      .type("Middle name", { force: true })
      .should("have.value", "Middle name");
    cy.get("#lastNameTextField")
      .clear({ force: true })
      .type("Last fake name", { force: true })
      .should("have.value", "Last fake name");
    cy.get("#phoneNumberTextField")
      .clear({ force: true })
      .type("0431411231", { force: true })
      .should("have.value", "0431411231");
  });

  it("tests to make sure the phone number field doesn't enter strings", () => {
    cy.get("#phoneNumberTextField")
      .clear({ force: true })
      .type("ahdsahdsadsadj", { force: true })
      .should("have.value", "");
  });
});
