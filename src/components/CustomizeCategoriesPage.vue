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
        <v-card
          :color="isSelected(category.id) ? 'grey' : 'white'"
          @click="toggleCategorySelection(category.id)"
        >
          <v-card-title>{{ category.name }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn color="success" @click="saveCategories">Save</v-btn>
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
      selectedCategories: [],
    };
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get('/categories');
        this.categories = response.data;
        const userCategoriesResponse = await axios.get('/user/categories');
        this.selectedCategories = userCategoriesResponse.data.map(cat => cat.id);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    isSelected(categoryId) {
      return this.selectedCategories.includes(categoryId);
    },
    toggleCategorySelection(categoryId) {
      if (this.isSelected(categoryId)) {
        this.selectedCategories = this.selectedCategories.filter(id => id !== categoryId);
      } else {
        this.selectedCategories.push(categoryId);
      }
    },
    async saveCategories() {
      try {
        await axios.post('/user/categories', { categories: this.selectedCategories });
        alert('Categories saved successfully!');
      } catch (error) {
        console.error('Error saving categories:', error);
        alert('Failed to save categories.');
      }
    },
  },
  created() {
    this.fetchData();
  },
};
</script>
