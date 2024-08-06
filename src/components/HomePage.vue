<template>
    <v-container>
      <v-row>
        <v-col>
          <h1>Home</h1>
          <v-btn color="primary" @click="$router.push('/about')">Go to About</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    name: 'HomePage',
  };
  </script>
  
  <style scoped>
  </style>
  