<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Select Your Favorite Categories</h1>
        <p>
          Select the categories you want to see on your home page. If no
          categories are selected, they will be randomly chosen for you.
        </p>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="category in categories" :key="category.id" cols="12" md="4">
        <v-card
          class="rounded-lg"
          @click="toggleCategorySelection(category.id)"
          :style="{
            border: isSelected(category.id) ? '2px solid grey' : 'none',
            position: 'relative'
          }"
          tile
          data-cy="category-card"
        >
          <v-img :src="category.image" height="200px"></v-img>
          <v-card-title class="text-center">{{ category.name }}</v-card-title>
          <div v-if="isSelected(category.id)" class="overlay"></div>
        </v-card>
      </v-col>
    </v-row>

    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      multi-line
      data-cy="snackbar"
    >
      {{ snackbar.message }}
      <v-btn text @click="snackbar.show = false">Close</v-btn>
    </v-snackbar>

    <v-row class="justify-end">
      <v-col cols="auto">
        <v-btn
          color="success"
          @click="saveCategories"
          class="save-button"
          data-cy="save-button"
        >
          Save
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import axios from "@/plugins/axios"

  export default {
    name: "CategorySelectionPage",
    data() {
      return {
        categories: [],
        selectedCategories: [],
        snackbar: {
          show: false,
          message: "",
          color: ""
        }
      }
    },
    methods: {
      async fetchData() {
        try {
          const response = await axios.get("/categories")
          this.categories = response.data
          const userCategoriesResponse = await axios.get("/user/categories")
          this.selectedCategories = userCategoriesResponse.data.map(
            (cat) => cat.id
          )
        } catch (error) {
          console.error("Error fetching data:", error)
        }
      },
      isSelected(categoryId) {
        return this.selectedCategories.includes(categoryId)
      },
      toggleCategorySelection(categoryId) {
        if (this.isSelected(categoryId)) {
          this.selectedCategories = this.selectedCategories.filter(
            (id) => id !== categoryId
          )
        } else {
          this.selectedCategories.push(categoryId)
        }
      },
      async saveCategories() {
        try {
          await axios.post("/user/categories", {
            categories: this.selectedCategories
          })
          this.snackbar.message = "Categories saved successfully!"
          this.snackbar.color = "success"
        } catch (error) {
          console.error("Error saving categories:", error)
          this.snackbar.message = "Failed to save categories."
          this.snackbar.color = "error"
        } finally {
          this.snackbar.show = true
        }
      }
    },
    created() {
      this.fetchData()
    }
  }
</script>

<style>
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.7);
    z-index: 1;
  }
</style>
