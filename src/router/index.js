import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Category from '../pages/Category.vue'
import ProductDetails from '../pages/ProductDetails.vue'
import Favorites from '../pages/Favorites.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home',  component: Home },
    { path: '/category/:name',  component: Category },
    { path: '/product/:id',     component: ProductDetails },
    { path: '/favorites',       component: Favorites }
  ]
})
