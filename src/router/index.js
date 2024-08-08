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
      path: "",
      name: "homePage",
      component: HomePage
    },
    {
      path: "/customize-categories",
      name: "customizeCategories",
      component: CustomizeCategoriesPage
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage
    },
    {
      path: "/register",
      name: "register",
      component: RegisterPage
    },
    {
      path: "/favorites",
      name: "favoriteQuotes",
      component: FavioratePage
    },
    {
      path: "/missed",
      name: "missedQuotes",
      component: MissedQuotesPage
    }
  ]
});
