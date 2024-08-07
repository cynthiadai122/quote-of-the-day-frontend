<template>
  <v-container fluid fill-height>
    <v-row>
      <v-col cols="12">
        <v-alert v-if="!quotes.length" type="info" border="left" colored-border>
          No missed quotes available.
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
  name: 'MissedQuotesPage',
  components: {
    QuoteCard
  },
  data() {
    return {
      quotes: [],
      loading: true,
    };
  },
  async created() {
    await this.fetchMissedQuotes();
  },
  methods: {
    async fetchMissedQuotes() {
      try {
        const response = await axios.get('/missed-quotes');
        this.quotes = response.data;
      } catch (error) {
        console.error('Error fetching missed quotes:', error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.v-card {
  margin-bottom: 20px;
}
.v-img {
  border-radius: 4px 4px 0 0;
}
</style>
