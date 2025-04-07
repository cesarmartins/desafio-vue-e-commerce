<template>
    <div class="product-card">
      <RouterLink :to="`/product/${product.id}`">
        <img :src="product.images[0]" :alt="product.title" style="width: 100%; border-radius: 4px" />
        <p class="product-title">{{ product.title }}</p>
      </RouterLink>
      <p class="price">💰 ${{ product.price }}</p>
      <p class="category">{{ product.category.name }}</p>
      <button class="favorite-btn" @click="toggleFavorite(product)">
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
  