<template>
  <LayoutWrapper>
    <div>
      <button @click="goBack" class="back-button">🔙 Voltar</button>
    </div>
    <div class="product-details" v-if="product">
      <img :src="product.images[0]" alt="Imagem do produto" />
      <div class="info">
        <h1>{{ product.title }}</h1>
        <p class="price">💵 {{ product.price }}</p>
        <p>{{ product.description }}</p>
        <p><strong>Categoria:</strong> {{ product.category.name }}</p>
        <button @click="store.toggleFavorite(product)">
          <span v-if="store.isFavorite(product.id)">💔 Remover dos favoritos</span>
          <span v-else>💖 Adicionar aos favoritos</span>
        </button>
      </div>
    </div>
    <div v-else>Carregando...</div>
  </LayoutWrapper>
</template>

<script setup>
import { useProductStore } from '../stores/productStore'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const store = useProductStore()
const route = useRoute()
const router = useRouter()
const product = ref(null)

function goBack() {
  router.back()
}

onMounted(async () => {
  const res = await axios.get(
    `https://api.escuelajs.co/api/v1/products/${route.params.id}`
  )
  product.value = res.data
  store.addLastVisited(res.data)
})
</script>
<style scoped>
.back-button {
  background-color: var(--primary-color, #eee);
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  margin-bottom: 1rem;
  transition: background-color 0.2s;
}

.back-button:hover {
  background-color: var(--primary-hover, #ccc);
}
</style>