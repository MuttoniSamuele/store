import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import loginStore from "../stores/loginStore.js";

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import(/* webpackChunkName: "category" */ '../views/SignupView.vue')
  },
  {
    path: '/users',
    name: 'users',
    component: () => import(/* webpackChunkName: "users" */ '../views/UsersView.vue')
  },
  {
    path: '/products',
    name: 'products',
    component: () => import(/* webpackChunkName: "products" */ '../views/ProductsView.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import(/* webpackChunkName: "cart" */ '../views/CartView.vue')
  },
  {
    path: '/category/:category',
    name: 'category',
    component: () => import(/* webpackChunkName: "category" */ '../views/CategoryView.vue')
  },
  {
    path: '/employees',
    name: 'employees',
    component: () => import(/* webpackChunkName: "employees" */ '../views/EmployeesView.vue')
  },
  {
    path: '/secretroute',
    name: 'secretroute',
    component: () => import(/* webpackChunkName: "secretroute" */ '../views/SecretRouteView.vue'),
    meta: { requiresAuth: true }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, _from, next) => {
  if (to.meta.requiresAuth && !loginStore.getters.isLoggedIn) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router
