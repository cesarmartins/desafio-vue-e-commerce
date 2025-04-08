<template>
  <LayoutWrapper>
    <div class="favorites">
      <h1>❤️ Favoritos</h1>

      <div v-if="!favorites.length" class="empty-state">
        😿 Nenhum produto favoritado ainda.
      </div>

      <section class="products">
        <div class="product-grid">
        <ProductCard
          v-for="product in favorites"
          :key="product.id"
          :product="product"
        />
        </div>
      </section>
    </div>
  </LayoutWrapper>
</template>

<script setup>
import ProductCard from '../components/ProductCard.vue'
import { useProductStore } from '../stores/productStore'

const store = useProductStore()
const favorites = store.favorites
</script>