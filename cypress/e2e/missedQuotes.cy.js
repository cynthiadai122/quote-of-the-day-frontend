describe("MissedQuotesPage", () => {
  beforeEach(() => {
    cy.request("POST", "http://127.0.0.1:8000/api/login", {
      email: "test@gmail.com",
      password: "password"
    }).then((response) => {
      localStorage.setItem("token", response.body.token)
    })

    cy.intercept("GET", "/api/missed-quotes", (req) => {
      req.reply({ body: [] })
    }).as("getMissedQuotes")

    cy.visit("/missed")
    cy.wait(["@getMissedQuotes"])
  })

  it("should display a message when no missed quotes are available", () => {
    cy.get(".v-icon").should("have.class", "mdi-comment-quote")
    cy.contains("No missed quotes available.").should("be.visible")
  })

  it("should display missed quotes when available", () => {
    cy.intercept("GET", "/api/missed-quotes", {
      body: [
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
          date: "2024-08-10T00:00:00.000000Z",
          category_id: 1,
          api_id: "dad16d4f-c273-4602-98c3-e5c647a926fa",
          created_at: null,
          updated_at: null,
          pivot: {
            user_id: 1,
            quote_id: 1
          }
        },
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
          date: "2024-08-10T00:00:00.000000Z",
          category_id: 1,
          api_id: "8412e248-1272-4076-a14e-70e3d25f5546",
          created_at: null,
          updated_at: null,
          pivot: {
            user_id: 1,
            quote_id: 2
          }
        },
        {
          id: 3,
          quote: "II spent a year in that town, one Sunday.",
          author: "George Burns",
          length: 40,
          language: "en",
          tags: ["funny"],
          permalink:
            "https://theysaidso.com/quote/steve-maraboli-if-you-respect-yourself-in-stressful-situations-it-will-help-you",
          title: "Funnt Quote of the Day",
          background: "https://theysaidso.com/assets/images/qod/qod-funny.jpg",
          date: "2024-08-10T00:00:00.000000Z",
          category_id: 6,
          api_id: "4f6cba34-8273-45aa-a8d6-6f1dd8dc8386",
          created_at: null,
          updated_at: null,
          pivot: {
            user_id: 1,
            quote_id: 3
          }
        }
      ]
    }).as("getMissedQuotesWithData")

    cy.reload()
    cy.wait("@getMissedQuotesWithData")
    cy.get("[data-cy=quote-card]").should("have.length", 3)
    cy.contains("Inspiring Quote of the Day").should("be.visible")
    cy.contains(
      "Do not worry if you have built your castles in the air. They are where they should be. Now put the foundations under them."
    ).should("be.visible")
    cy.contains("Henry David Thoreau").should("be.visible")
  })
})
