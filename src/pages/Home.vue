<template>
  <div class="home">
    <h1>🏪 Vue E-Commerce</h1>

    <!-- Campo de busca -->
    <input
      v-model="search"
      placeholder="🔍 Buscar produtos por título..."
      class="search-input"
    />

    <!-- Lista de categorias -->
    <div class="categories">
      <h2>Categorias</h2>
      <ul>
        <li v-for="cat in categories" :key="cat.id">
          <RouterLink :to="`/category/${cat.name}`">{{ cat.name }}</RouterLink>
        </li>
      </ul>
    </div>

    <div v-if="loading">Carregando produtos...</div>
    <div v-else class="products">
      <div
        v-for="product in paginatedProducts"
        :key="product.id"
        class="product"
      >
        <router-link :to="`/product/${product.id}`">
          <img :src="product.images[0]" :alt="product.title" width="100" />
          <h3>{{ product.title }}</h3>
          <p>💲{{ product.price }}</p>
          <small>{{ product.category.name }}</small>
        </router-link>
        <button @click="toggleFavorite(product)">
          <span v-if="isFavorite(product.id)">❤️</span>
          <span v-else>🤍</span>
        </button>
      </div>
    </div>
  </div>
  <div v-if="!loading && filteredProducts.length" class="pagination">
    <button @click="prevPage" :disabled="currentPage === 1">⬅ Anterior</button>
    <span>Página {{ currentPage }} de {{ totalPages }}</span>
    <button @click="nextPage" :disabled="currentPage === totalPages">Próxima ➡</button>
  </div>
  <div v-if="store.lastVisited.length" class="visited">
  <h2>👀 Últimos Visitados</h2>
  <div class="products">
    <div v-for="product in store.lastVisited" :key="product.id" class="product">
      <router-link :to="`/product/${product.id}`">
        <img :src="product.images[0]" width="100" />
        <h4>{{ product.title }}</h4>
        <p>{{ product.price }}</p>
      </router-link>
    </div>
  </div>
</div>
</template>

<script setup>
import { useProductStore } from '../stores/productStore'
import { ref, onMounted, computed, watch } from 'vue'
import axios from 'axios'

const store = useProductStore()
const { toggleFavorite, isFavorite } = store

const products = ref([])
const loading = ref(true)
const search = ref('')
const categories = ref([])
const currentPage = ref(1)
const itemsPerPage = 10

const filteredProducts = computed(() =>
  products.value.filter(product =>
    product.title.toLowerCase().includes(search.value.toLowerCase())
  )
)

// Paginação dos resultados filtrados
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredProducts.value.slice(start, end)
})

const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage))

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++
}

function prevPage() {
  if (currentPage.value > 1) currentPage.value--
}

// Resetar página quando o filtro mudar
watch(search, () => {
  currentPage.value = 1
})

onMounted(async () => {
  try {
    const [productsRes, categoriesRes] = await Promise.all([
      axios.get('https://api.escuelajs.co/api/v1/products?offset=0&limit=50'),
      axios.get('https://api.escuelajs.co/api/v1/categories')
    ])
    products.value = productsRes.data
    categories.value = categoriesRes.data
  } catch (err) {
    console.error('Erro ao buscar dados', err)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.search-input {
  padding: 8px;
  margin: 10px 0;
  width: 100%;
  max-width: 400px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

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
.categories {
  margin-bottom: 20px;
}
.categories ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.categories li {
  background: #eee;
  padding: 6px 12px;
  border-radius: 6px;
}
.categories a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}
.categories a:hover {
  text-decoration: underline;
}
button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.4rem;
}
.visited {
  margin-top: 40px;
  border-top: 1px solid #ccc;
  padding-top: 20px;
}
</style>
