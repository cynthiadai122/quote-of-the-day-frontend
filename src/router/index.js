import Vue from "vue";
import Router from "vue-router";
import HomePage from "@/components/HomePage.vue";
import CategorySelectionPage from "@/components/CategorySelectionPage.vue";
import LoginPage from "@/components/LoginPage.vue";
import RegisterPage from "@/components/RegisterPage.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomePage
    },
    {
      path: "/selectCategory",
      name: "Select Category",
      component: CategorySelectionPage
    },
    {
      path: "/login",
      name: "Login",
      component: LoginPage
    },
    {
      path: "/register",
      name: "Register",
      component: RegisterPage
    }
  ]
});
