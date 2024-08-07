<template>
  <v-card>
    <v-img :src="quote.background" height="200px"></v-img>
    <v-card-title>{{ quote.title }}</v-card-title>
    <v-card-subtitle class="text-right">
      {{ quote.author }}
    </v-card-subtitle>
    <v-card-text>
      <p>{{ quote.quote }}</p>
      <p>
        <strong>Date:</strong> {{ new Date(quote.date).toLocaleDateString() }}
      </p>
      <p><strong>Tags:</strong> {{ quote.tags.join(', ') }}</p>
    </v-card-text>
    <v-card-actions>
      <v-btn :href="quote.permalink" target="_blank" text color="primary">
        Read more
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'QuoteCard',
  props: {
    quote: {
      type: Object,
      required: true
    }
  }
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
