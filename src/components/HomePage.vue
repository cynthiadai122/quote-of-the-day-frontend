<template>
  <v-container fluid fill-height>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-img
            :src="quote.background"
            height="200px"
            class="white--text align-end"
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
            <v-btn color="primary" @click="customizeCategories"
              >Customize Categories</v-btn
            >
            <v-btn @click="viewMissedQuotes">View Missed Quotes</v-btn>
            <v-btn
              @click="toggleFavoriteQuote"
              :color="isFavorite ? 'pink' : 'grey'"
            >
              {{ isFavorite ? 'Unmark as Favorite' : 'Mark as Favorite' }}
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
        const response = await axios.get('/favorites');
        this.isFavorite = response.data.includes(this.quote?.id);
      } catch (error) {
        console.error('Error checking favorite status:', error);
      }
    },
    customizeCategories() {
      this.$router.push('/customize-categories');
    },
    viewMissedQuotes() {
      this.$router.push('/missed');
    },
    async toggleFavoriteQuote() {
      try {
        if (this.isFavorite) {
          await axios.delete(`/user/favorites/${this.quote.id}`);
        } else {
          await axios.post('/user/favorites', { quoteId: this.quote.id });
        }
        this.isFavorite = !this.isFavorite;
      } catch (error) {
        console.error('Error toggling favorite status:', error);
      }
    },
  },
};
</script>

<style scoped>
.v-card {
  padding: 20px;
}
.v-img {
  border-radius: 4px;
}
</style>
