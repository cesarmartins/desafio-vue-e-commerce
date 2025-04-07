<template>
  <div v-if="loading">Carregando produto...</div>
  <div v-else-if="error">Erro: {{ error }}</div>
  <div v-else class="product-details">
    <img :src="product.images[0]" :alt="product.title" />
    <div class="info">
      <h1>{{ product.title }}</h1>
      <p class="price">💲{{ product.price }}</p>
      <p class="desc">{{ product.description }}</p>
      <p><strong>Categoria:</strong> {{ product.category.name }}</p>
    </div>
  </div>
</template>

<script setup>
import { useProductStore } from '../stores/productStore'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const productId = route.params.id

const product = ref(null)
const loading = ref(true)
const error = ref(null)
const store = useProductStore()

onMounted(async () => {
  try {
    const { data } = await axios.get(`https://api.escuelajs.co/api/v1/products/${productId}`)
    product.value = data
    store.addLastVisited(product.value)
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>