<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Select Category</h1>
        <v-btn color="primary" @click="$router.push('/')">Go to Home</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="category in categories" :key="category.id" cols="12" md="4">
        <v-card>
          <v-card-title>{{ category.name }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from '@/plugins/axios';

export default {
  name: 'CategorySelectionPage',
  data() {
    return {
      categories: [],
    };
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get('/categories');
        this.categories = response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
  },
  created() {
    this.fetchData();
  },
};
</script>
