<template>
  <v-container fluid fill-height>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-card-title class="headline">Login</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field
                v-model="email"
                label="Email"
                type="email"
                required
                :error-messages="emailErrors"
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                required
              ></v-text-field>
              <v-alert
                v-if="errorMessage"
                type="error"
                dismissible
                >{{ errorMessage }}</v-alert
              >
              <v-btn color="primary" type="submit" block>Login</v-btn>
            </v-form>
            <v-divider class="my-4"></v-divider>
            <v-btn text class="blue--text" @click="$router.push('/register')"
              >Don't have an account? Register</v-btn
            >
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from '@/plugins/axios';
import { mapActions } from 'vuex';

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
      emailErrors: [],
    };
  },
  methods: {
    ...mapActions(['setIsLogin']),
    async login() {
      try {
        const response = await axios.post('/login', {
          email: this.email,
          password: this.password,
        });
        const token = response.data.token;
        localStorage.setItem('token', token);
        this.setIsLogin(true);
        this.$router.push('/');
      } catch (error) {
        if (error.response && error.response.data) {
          this.errorMessage = error.response.data.message || 'Login failed';
          this.emailErrors = error.response.data.errors.email || [];
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again.';
        }
      }
    },
  },
};
</script>
