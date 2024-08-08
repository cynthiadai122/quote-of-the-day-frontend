<template>
  <v-app>
    <v-navigation-drawer
      v-if="isLogin || currentUser"
      v-model="drawer"
      app
      clipped
      mini-variant
      expand-on-hover
      permanent
    >
      <v-list dense rounded nav>
        <v-list-item :to="{ name: 'homePage' }">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title> Home </v-list-item-title>
        </v-list-item>
        <v-list-item :to="{ name: 'customizeCategories' }">
          <v-list-item-icon>
            <v-icon>mdi-cogs</v-icon>
          </v-list-item-icon>
          <v-list-item-title> Customize Categories </v-list-item-title>
        </v-list-item>
        <v-list-item :to="{ name: 'missedQuotes' }">
          <v-list-item-icon>
            <v-icon>mdi-calendar-alert</v-icon>
          </v-list-item-icon>
          <v-list-item-title> View Missed Quotes </v-list-item-title>
        </v-list-item>
        <v-list-item :to="{ name: 'favoriteQuotes' }">
          <v-list-item-icon>
            <v-icon>mdi-heart</v-icon>
          </v-list-item-icon>
          <v-list-item-title> View Favorites </v-list-item-title>
        </v-list-item>
        <v-list-item @click="logout">
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
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'App',
  data() {
    return {
      drawer: true,
      currentUser:null
    };
  },
  computed: {
    ...mapGetters([
      'isLogin'
    ]),
  },
  async created(){
    await this.fetchCurrentUser();
  },
  methods: {
    ...mapActions(['setIsLogin']),
    logout() {
      localStorage.removeItem('token');
      this.currentUser = null
      this.setIsLogin(false)
      this.redirectToLogin();
    },
    redirectToLogin() {
      if (this.$route.name !== 'login') {
        this.$router.push({ name: 'login' });
      }
    },
    async fetchCurrentUser() {
      try {
        const response = await axios.get('/user');
        this.currentUser = response.data
      } catch (error) {
        console.error('Error fetching user information:', error);
        if (this.$route.name !== 'login') {
          this.$router.push({ name: 'login' });
        }
      }
    },
  },
};
</script>
