import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Persons from '../views/Persons.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/persons',
    name: 'Persons',
    component: Persons
  },
  {
    path: '/person/:personId',
    name: 'Person',
    component: () => import('@/views/Person.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
