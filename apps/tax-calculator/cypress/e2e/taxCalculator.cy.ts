describe("Basic flow", () => {
  beforeEach(() => {
    cy.intercept("http://localhost:5001/tax-calculator/tax-year/*", {
      fixture: "2019.json",
    }).as("2019");
  });

  it("should calculate the taxes for the year 2019 ", () => {
    cy.visit("http://localhost:5173");
    cy.get('[data-test="income-input"]').type("123456");
    cy.get('[data-test="form-submit-button"]').click();

    cy.wait("@2019");

    cy.get('[data-test="total-tax-payable"]').should(
      "have.text",
      "$24,239.665",
    );
  });

  it("should calculate the taxes for the year 2019 ", () => {
    cy.intercept("http://localhost:5001/tax-calculator/tax-year/*", {
      fixture: "error.json",
    }).as("error");

    cy.visit("http://localhost:5173");
    cy.get('[data-test="income-input"]').type("123456");
    cy.get('[data-test="form-submit-button"]').click();

    cy.wait("@error");
    cy.wait("@error");
    cy.wait("@error");

    cy.get('[data-test="error-message"]').should("exist");
  });
});
