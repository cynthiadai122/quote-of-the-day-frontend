describe("Register Page", () => {
  beforeEach(() => {
    cy.visit("/register")
  })

  it("should display the registration form", () => {
    cy.get("[data-cy=register-form]").should("exist")
    cy.get("[data-cy=name-field]").should("exist")
    cy.get("[data-cy=email-field]").should("exist")
    cy.get("[data-cy=password-field]").should("exist")
    cy.get("[data-cy=confirm-password-field]").should("exist")
  })

  it("should show an error message on invalid registration", () => {
    cy.get("[data-cy=email-field]").type("invalid-email")
    cy.get("[data-cy=password-field]").type("short")
    cy.get("[data-cy=confirm-password-field]").type("short")
    cy.get("[data-cy=register-btn]").click()
    cy.get("[data-cy=register-alert]").should("exist")
  })

  it("should register successfully with valid details", () => {
    cy.get("[data-cy=name-field]").type("Test User")
    cy.get("[data-cy=email-field]").type("test@gmail.com")
    cy.get("[data-cy=password-field]").type("password")
    cy.get("[data-cy=confirm-password-field]").type("password")
    cy.get("[data-cy=register-btn]").click()
    cy.url().should("include", "/")
  })
})
