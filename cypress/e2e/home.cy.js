describe("Home Page", () => {
  beforeEach(() => {
    cy.request("POST", "http://127.0.0.1:8000/api/login", {
      email: "test@gmail.com",
      password: "password"
    }).then((response) => {
      localStorage.setItem("token", response.body.token)
    })

    cy.visit("/")
  })

  it("should display the quote of the day", () => {
    cy.get("h1").should("contain", "Quote of the day")
    cy.get("[data-cy=quote]").should("exist")
    cy.get("[data-cy=quote-title]").should("exist")
    cy.get("[data-cy=quote-text]").should("exist")
    cy.get("[data-cy=quote-author]").should("exist")
  })

  it("should allow the user to toggle favorite status of the quote", () => {
    cy.get("[data-cy=quote]").should("exist")
    cy.get("[data-cy=favorite-btn]").click()
  })
})
