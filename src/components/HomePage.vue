<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Home</h1>
        <v-btn color="primary" @click="$router.push('/selectCategory')"
          >Select Category</v-btn
        >
        <v-btn color="secondary" @click="$router.push('/login')">Login</v-btn>
        <v-btn @click="fetchData">Fetch Data</v-btn>
        <div v-if="data">
          <p>Data: {{ data }}</p>
        </div>
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
      data: null,
    };
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get('/categories');
        this.data = response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
  },
};
</script>
