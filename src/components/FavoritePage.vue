<template>
  <v-container fluid fill-height>
    <v-row v-if="quotes.length">
      <v-col>
        <h1>Favorite Quotes</h1>
      </v-col>
    </v-row>
    <v-row
      v-if="!quotes.length"
      align="center"
      justify="center"
      class="text-center"
    >
      <v-col cols="12" class="d-flex flex-column align-center">
        <v-icon x-large color="grey lighten-2">mdi-comment-quote</v-icon>
        <div class="mt-4">No favorite quotes available.</div>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col v-for="quote in quotes" :key="quote.id" cols="12" sm="6" md="4">
        <quote-card :quote="quote" data-cy="quote-card" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import axios from "@/plugins/axios"
  import QuoteCard from "./Card/QuoteCard"

  export default {
    name: "FavoritePage",
    components: {
      QuoteCard
    },
    data() {
      return {
        quotes: [],
        loading: true
      }
    },
    async created() {
      await this.fetchFavoriteQuotes()
    },
    methods: {
      async fetchFavoriteQuotes() {
        try {
          const response = await axios.get("/favorites")
          this.quotes = response.data.data
        } catch (error) {
          console.error("Error fetching favorite quotes:", error)
        } finally {
          this.loading = false
        }
      }
    }
  }
</script>
