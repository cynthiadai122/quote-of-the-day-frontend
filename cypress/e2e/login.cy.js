describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("/login")
  })

  it("should display the login form", () => {
    cy.get("[data-cy=login-form]").should("exist")
    cy.get("[data-cy=email-field]").should("exist")
    cy.get("[data-cy=password-field]").should("exist")
  })

  it("should show an error message on invalid login", () => {
    cy.get("[data-cy=email-field]").type("invalid@example.com")
    cy.get("[data-cy=password-field]").type("wrongpassword")
    cy.get("[data-cy=submit-btn]").click()
    cy.get("[data-cy=login-alert]").should(
      "contain",
      "The provided credentials are incorrect."
    )
  })
})
