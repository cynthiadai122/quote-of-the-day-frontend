<template>
  <v-container fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="rounded-xl">
          <v-img
            :src="quote.background"
            height="200px"
            class="white--text align-end rounded-lg"
          >
            <v-card-title class="headline">{{ quote.title }}</v-card-title>
          </v-img>
          <v-card-subtitle v-if="quote">
            <v-card-text>{{ quote.quote }}</v-card-text>
            <v-card-subtitle
              class="text-right"
              >{{ quote.author }}</v-card-subtitle
            >
          </v-card-subtitle>
          <v-card-actions>
            <v-spacer />
            <v-btn @click="toggleFavoriteQuote" icon>
              <v-icon :color="isFavorite ? 'red' : 'grey'">
                {{ isFavorite ? 'mdi-heart' : 'mdi-heart-outline' }}
              </v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from '@/plugins/axios';

export default {
  name: 'HomePage',
  data() {
    return {
      quote: null,
      isFavorite: false,
      currentUser: null,
    };
  },
  async created() {
    await this.fetchQuoteOfTheDay();
    await this.checkIfFavorite();
  },
  methods: {
    async fetchQuoteOfTheDay() {
      try {
        const response = await axios.get('/quote-of-the-day');
        this.quote = response.data;
      } catch (error) {
        console.error('Error fetching quote of the day:', error);
      }
    },
    async checkIfFavorite() {
      try {
        if (!this.quote || !this.quote.id) {
          throw new Error('Quote ID is not available');
        }
        const response = await axios.get(`/quote/${this.quote.id}/is-favorite`);
        this.isFavorite = response.data.is_favorite;
      } catch (error) {
        console.error('Error checking favorite status:', error);
      }
    },

    async toggleFavoriteQuote() {
      try {
        if (!this.quote || !this.quote.id) {
          throw new Error('Quote ID is not available');
        }
        await axios.post('/favorite/toggle', { "quote_id": this.quote.id });
        await this.checkIfFavorite();
      } catch (error) {
        console.error('Error toggling favorite status:', error);
      }
    },
  },
};
</script>
