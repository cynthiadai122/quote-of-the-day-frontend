<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      mini-variant
      expand-on-hover
      permanent
    >
      <v-list dense rounded nav>
        <v-list-item :to="{name:'Home'}">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title> Home </v-list-item-title>
        </v-list-item>
        <v-list-item :to="{name:'customizeCategories'}">
          <v-list-item-icon>
            <v-icon>mdi-cogs</v-icon>
          </v-list-item-icon>
          <v-list-item-title> Customize Categories </v-list-item-title>
        </v-list-item>
        <v-list-item :to="{name:'missedQuotes'}">
          <v-list-item-icon>
            <v-icon>mdi-calendar-alert</v-icon>
          </v-list-item-icon>
          <v-list-item-title> View Missed Quotes </v-list-item-title>
        </v-list-item>
        <v-list-item :to="{name:'favoriteQuotes'}">
          <v-list-item-icon>
            <v-icon>mdi-heart</v-icon>
          </v-list-item-icon>
          <v-list-item-title> View Favoriates </v-list-item-title>
        </v-list-item>
        <v-list-item @click="navigateTo('logout')">
          <v-list-item-icon>
            <v-icon color="error">mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-title> Logout </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import axios from '@/plugins/axios';

export default {
  name: 'App',
  data() {
    return {
      drawer: false,
      currentUser: null,
    };
  },
  created(){
    this.fetchCurrentUser();
  },
  methods:{
    async fetchCurrentUser() {
      try {
        const response = await axios.get('/user');
        this.currentUser = response.data;
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    },
  }
};
</script>
