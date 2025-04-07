<template>
  <div>
    <h1>Produtos da Categoria: {{ categoryName }}</h1>

    <div v-if="loading">Carregando...</div>
    <div v-else-if="error">Erro: {{ error }}</div>
    
    <div v-else class="products">
      <div
        v-for="product in paginatedProducts"
        :key="product.id"
        class="product"
      >
        <RouterLink :to="`/product/${product.id}`">
          <img :src="product.images[0]" :alt="product.title" width="100" />
          <h3>{{ product.title }}</h3>
          <p>💲{{ product.price }}</p>
        </RouterLink>
      </div>
    </div>
  </div>
  <div v-if="!loading && products.length" class="pagination">
    <button @click="prevPage" :disabled="currentPage === 1">⬅ Anterior</button>
    <span>Página {{ currentPage }} de {{ totalPages }}</span>
    <button @click="nextPage" :disabled="currentPage === totalPages">Próxima ➡</button>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const categoryName = route.params.name

const products = ref([])
const loading = ref(true)
const error = ref(null)
const currentPage = ref(1)
const itemsPerPage = 10

// Paginação: produtos por página
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return products.value.slice(start, end)
})

const totalPages = computed(() => Math.ceil(products.value.length / itemsPerPage))

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

onMounted(async () => {
  try {
    const { data: categories } = await axios.get('https://api.escuelajs.co/api/v1/categories')
    const category = categories.find(cat => cat.name.toLowerCase() === categoryName.toLowerCase())

    if (!category) {
      throw new Error('Categoria não encontrada')
    }

    const { data } = await axios.get(`https://api.escuelajs.co/api/v1/products/?categoryId=${category.id}`)
    products.value = data
  } catch (err) {
    error.value = err.message
    console.error(err)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.products {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.product {
  border: 1px solid #ddd;
  padding: 10px;
  max-width: 200px;
}
.pagination {
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}
button[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
