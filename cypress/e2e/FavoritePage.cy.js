describe("FavoritePage", () => {
  beforeEach(() => {
    cy.request("POST", "http://127.0.0.1:8000/api/login", {
      email: "test@gmail.com",
      password: "password"
    }).then((response) => {
      localStorage.setItem("token", response.body.token)
    })

    cy.intercept("GET", "/api/favorites", (req) => {
      req.reply({ body: [] })
    }).as("getFavorites")

    cy.visit("/favorites")
    cy.wait(["@getFavorites"])
  })

  it("should display a message when no favorite quotes are available", () => {
    cy.get(".v-icon").should("have.class", "mdi-comment-quote")
    cy.contains("No favorite quotes available.").should("be.visible")
  })

  it("should display favorite quotes when available", () => {
    cy.intercept("GET", "/api/favorites", {
      body: {
        data: [
          {
            id: 2,
            quote:
              "If you respect yourself in stressful situations, it will help you see the positive… It will help you see the message in the mess.",
            author: "Steve Maraboli",
            length: 135,
            language: "en",
            tags: ["inspire", "self-respect", "stress"],
            permalink:
              "https://theysaidso.com/quote/steve-maraboli-if-you-respect-yourself-in-stressful-situations-it-will-help-you",
            title: "Inspiring Quote of the Day",
            background: "https://theysaidso.com/assets/images/qod/qod-love.jpg",
            date: "2024-08-08T00:00:00.000000Z",
            category_id: 1,
            api_id: "nwW3g7V0xszGDNIehz6yTgeF",
            created_at: null,
            updated_at: null
          },
          {
            id: 1,
            quote:
              "Do not worry if you have built your castles in the air. They are where they should be. Now put the foundations under them.",
            author: "Henry David Thoreau",
            length: 122,
            language: "en",
            tags: ["worry", "dreams", "inspire", "air"],
            permalink:
              "https://theysaidso.com/quote/henry-david-thoreau-do-not-worry-if-you-have-built-your-castles-in-the-air-they",
            title: "Inspiring Quote of the Day",
            background:
              "https://theysaidso.com/assets/images/qod/qod-inspire.jpg",
            date: "2024-08-04T00:00:00.000000Z",
            category_id: 1,
            api_id: "d6564d24-ba1a-48e6-9e8a-cf5cfb8e1f99",
            created_at: null,
            updated_at: null
          }
        ]
      }
    }).as("getFavoritesWithData")

    cy.reload()
    cy.wait("@getFavoritesWithData")
    cy.get("[data-cy=quote-card]").should("have.length", 2)
    cy.contains("Inspiring Quote of the Day").should("be.visible")
    cy.contains(
      "If you respect yourself in stressful situations, it will help you see the positive… It will help you see the message in the mess."
    ).should("be.visible")
    cy.contains("Steve Maraboli").should("be.visible")
  })
})
