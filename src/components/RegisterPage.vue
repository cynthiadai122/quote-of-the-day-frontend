<template>
  <v-container fluid fill-height>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="rounded-xl">
          <v-card-title class="headline">Register</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="register" data-cy="register-form">
              <v-alert
                v-if="errorMessages.length"
                type="error"
                dismissible
                class="mb-4"
                data-cy="register-alert"
              >
                <div v-for="(error, index) in errorMessages" :key="index">
                  {{ error }}
                </div>
              </v-alert>
              <v-text-field
                v-model="name"
                label="Name"
                type="text"
                required
                data-cy="name-field"
              ></v-text-field>
              <v-text-field
                v-model="email"
                label="Email"
                type="email"
                required
                :error-messages="emailErrors"
                data-cy="email-field"
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                required
                :error-messages="passwordErrors"
                data-cy="password-field"
              ></v-text-field>
              <v-text-field
                v-model="passwordConfirmation"
                label="Confirm Password"
                type="password"
                required
                data-cy="confirm-password-field"
              ></v-text-field>
              <v-btn color="primary" type="submit" block data-cy="register-btn">
                Register
              </v-btn>
            </v-form>
            <v-divider class="my-4"></v-divider>
            <v-btn
              text
              @click="$router.push('/login')"
              class="blue--text"
              data-cy="login-link"
            >
              Already have an account? Login
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import axios from "@/plugins/axios"

  export default {
    name: "RegisterPage",
    data() {
      return {
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        errorMessages: [],
        emailErrors: [],
        passwordErrors: []
      }
    },
    methods: {
      async register() {
        this.errorMessages = []
        this.emailErrors = []
        this.passwordErrors = []

        try {
          const response = await axios.post("/register", {
            name: this.name,
            email: this.email,
            password: this.password,
            password_confirmation: this.passwordConfirmation
          })
          const token = response.data.token
          localStorage.setItem("token", token)
          this.$router.push("/")
        } catch (error) {
          if (error.response && error.response.data.errors) {
            const errors = error.response.data.errors
            if (errors.email) {
              this.emailErrors = errors.email
            }
            if (errors.password) {
              this.passwordErrors = errors.password
            }
            if (error.response.data.message) {
              this.errorMessages.push(error.response.data.message)
            }
          } else {
            this.errorMessages.push("Registration failed. Please try again.")
          }
        }
      }
    }
  }
</script>
