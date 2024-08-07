import Vue from "vue";
import Router from "vue-router";
import HomePage from "@/components/HomePage.vue";
import CustomizeCategoriesPage from "@/components/CustomizeCategoriesPage.vue";
import LoginPage from "@/components/LoginPage.vue";
import RegisterPage from "@/components/RegisterPage.vue";
import FavioratePage from "@/components/FavioratePage.vue";
import MissedQuotesPage from "@/components/MissedQuotesPage.vue";

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
      path: "/customize-categories",
      name: "Customize Categories",
      component: CustomizeCategoriesPage
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
    },
    {
      path: "/favoriates",
      name: "Favorite Quotes",
      component: FavioratePage
    },
    {
      path: "/missed",
      name: "Missed Quotes",
      component: MissedQuotesPage
    }
  ]
});
