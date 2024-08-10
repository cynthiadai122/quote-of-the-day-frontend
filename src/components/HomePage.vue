<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <h1>Quote of the day</h1>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-alert
          v-if="errorMessage"
          type="error"
          border="left"
          colored-border
          class="mb-4"
        >
          {{ errorMessage }}
        </v-alert>
        <v-card v-if="quote" class="rounded-lg" data-cy="quote">
          <v-img
            :src="quote.background"
            height="200px"
            class="white--text align-end rounded-lg"
          >
            <v-card-title class="headline" data-cy="quote-title">{{
              quote.title
            }}</v-card-title>
          </v-img>
          <v-card-subtitle>
            <v-card-text data-cy="quote-text">{{ quote.quote }}</v-card-text>
            <v-card-subtitle class="text-right" data-cy="quote-author">
              {{ quote.author }}
            </v-card-subtitle>
          </v-card-subtitle>
          <v-card-actions>
            <v-spacer />
            <v-btn @click="toggleFavoriteQuote" icon data-cy="favorite-btn">
              <v-icon :color="isFavorite ? 'red' : 'grey'">
                {{ isFavorite ? "mdi-heart" : "mdi-heart-outline" }}
              </v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import axios from "@/plugins/axios"

  export default {
    name: "HomePage",
    data() {
      return {
        quote: null,
        isFavorite: false,
        errorMessage: ""
      }
    },
    async created() {
      await this.fetchQuoteOfTheDay()
      if (this.quote) {
        await this.checkIfFavorite()
      }
    },
    methods: {
      async fetchQuoteOfTheDay() {
        try {
          const response = await axios.get("/quote-of-the-day")
          this.quote = response.data
        } catch (error) {
          console.error("Error fetching quote of the day:", error)
          if (
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            this.errorMessage = error.response.data.error
          } else {
            this.errorMessage =
              "An error occurred while fetching the quote of the day."
          }
        }
      },
      async checkIfFavorite() {
        try {
          if (!this.quote || !this.quote.id) {
            throw new Error("Quote ID is not available")
          }
          const response = await axios.get(
            `/quote/${this.quote.id}/is-favorite`
          )
          this.isFavorite = response.data.is_favorite
        } catch (error) {
          console.error("Error checking favorite status:", error)
        }
      },
      async toggleFavoriteQuote() {
        try {
          if (!this.quote || !this.quote.id) {
            throw new Error("Quote ID is not available")
          }
          await axios.post("/favorite/toggle", { quote_id: this.quote.id })
          await this.checkIfFavorite()
        } catch (error) {
          console.error("Error toggling favorite status:", error)
        }
      }
    }
  }
</script>
