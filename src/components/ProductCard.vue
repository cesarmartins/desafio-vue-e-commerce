<template>
    <div class="product-card">
      <RouterLink :to="`/product/${product.id}`">
        <img :src="product.images[0]" :alt="product.title" class="card-image" />
        <h3 class="product-title">{{ product.title }}</h3>
        <p class="price">💰 {{ product.price }}</p>
        <small class="category">{{ product.category.name }}</small>
      </RouterLink>
      <button @click="toggleFavorite(product)" class="favorite-btn">
        <span v-if="isFavorite(product.id)">❤️</span>
        <span v-else>🤍</span>
      </button>
    </div>
  </template>
  
  <script setup>
  defineProps(['product'])
  import { useProductStore } from '../stores/productStore'
  const store = useProductStore()
  const { toggleFavorite, isFavorite } = store
  </script>
  