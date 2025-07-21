import { createRouter, createWebHistory } from "vue-router";

import Login from "../pages/Login.vue";
import DocumentDashboard from "../pages/DocumentDashboard.vue";
import Register from "../pages/Register.vue";
import MyDatasetsPage from "../pages/MyDatasetsPage.vue";

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/document-dashboard", component: DocumentDashboard },
  { path: "/my-datasets", component: MyDatasetsPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;