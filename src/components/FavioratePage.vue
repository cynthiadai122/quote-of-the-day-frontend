<template>
  <v-container fluid fill-height>
    <v-row>
      <v-col cols="12">
        <v-alert
          v-if="!quotes.length && !loading"
          type="info"
          border="left"
          colored-border
        >
          No favorite quotes available.
        </v-alert>
        <v-row v-else>
          <v-col
            v-for="quote in quotes"
            :key="quote.id"
            cols="12"
            sm="6"
            md="4"
          >
            <quote-card :quote="quote" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from '@/plugins/axios';
import QuoteCard from './Card/QuoteCard';

export default {
  name: 'FavoritePage',
  components: {
    QuoteCard,
  },
  data() {
    return {
      quotes: [],
      loading: true,
    };
  },
  async created() {
    await this.fetchFavoriteQuotes();
  },
  methods: {
    async fetchFavoriteQuotes() {
      try {
        const response = await axios.get('/favorites');
        this.quotes = response.data.data;
      } catch (error) {
        console.error('Error fetching favorite quotes:', error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
