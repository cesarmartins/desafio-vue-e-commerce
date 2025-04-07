<template>
  <div>
    <h1>❤️ Favoritos</h1>

    <div v-if="!favorites.length">Nenhum produto favoritado ainda.</div>

    <div v-else class="favorites-grid">
      <div v-for="product in favorites" :key="product.id" class="favorite-card">
        <RouterLink :to="`/product/${product.id}`">
          <img :src="product.images[0]" :alt="product.title" />
        </RouterLink>
        <h3>{{ product.title }}</h3>
        <p class="price">{{ product.price }}</p>
        <p class="category">{{ product.category.name }}</p>
        <button @click="toggleFavorite(product)">❌ Remover</button>
      </div>
    </div>
  </div>
</template>


<script setup>
import { useProductStore } from '../stores/productStore'
import { computed } from 'vue'

let favorites = null
let toggleFavorite = null

const store = useProductStore()

favorites = computed(() => store.favorites)
toggleFavorite = (product) => {
  store.toggleFavorite(product)
}
</script>
