describe("Category Selection Page", () => {
  beforeEach(() => {
    cy.request("POST", "http://127.0.0.1:8000/api/login", {
      email: "test@gmail.com",
      password: "password"
    }).then((response) => {
      localStorage.setItem("token", response.body.token)
    })

    cy.intercept("GET", "/api/categories", {
      fixture: "categories.json"
    }).as("getCategories")

    cy.intercept("GET", "/api/user/categories", {
      fixture: "userCategories.json"
    }).as("getUserCategories")

    cy.intercept("POST", "/api/user/categories", {
      statusCode: 200,
      body: { success: true }
    }).as("saveCategories")

    cy.visit("/customize-categories")
    cy.wait(["@getCategories", "@getUserCategories"])
  })

  it("should display the categories and allow selection", () => {
    cy.get("h1").should("contain", "Select Your Favorite Categories")
    cy.get("[data-cy=category-card]").should("have.length", 8)
    cy.get("[data-cy=category-card]").last().click()
    cy.get("[data-cy=category-card]")
      .last()
      .should("have.css", "border", "2px solid rgb(128, 128, 128)")
  })

  it("should allow deselecting categories", () => {
    cy.get("[data-cy=category-card]").first().click()
    cy.get("[data-cy=category-card]")
      .first()
      .should("not.have.css", "border", "2px solid grey")
  })

  it("should save the selected categories", () => {
    cy.get("[data-cy=category-card]").first().click()
    cy.get("[data-cy=save-button]").click()
    cy.wait(1000)
    cy.get(".v-snack__content").should("be.visible")
    cy.get(".v-snack__content").should(
      "contain",
      "Categories saved successfully!"
    )
  })
})
