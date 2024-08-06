<template>
    <v-container>
      <v-row>
        <v-col>
          <h1>About</h1>
          <v-btn color="primary" @click="$router.push('/')">Go to Home</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    name: 'AboutPage',
  };
  </script>
  
  <style scoped>
  </style>
  