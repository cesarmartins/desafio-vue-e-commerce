<template>
  <div class="home-page">
    <!-- Conteúdo principal com layout em duas colunas -->
    <div class="main-content">
      
      <!-- Sidebar de categorias -->
      <aside class="sidebar">
        <h2 style="padding: 15px 0;border-bottom: 1px solid #ddd;">Categorias</h2>
        <ul>
          <li v-for="cat in categories" :key="cat.id" class="category-item">
            <RouterLink :to="`/category/${cat.name}`">{{ cat.name }}</RouterLink>
          </li>
        </ul>
      </aside>

      <!-- Produtos -->
      <section class="product-section">
        <div class="search-bar">
          <input
            v-model="search"
            placeholder="🔍 Buscar produtos por título..."
          />
        </div>

        <div v-if="loading">Carregando produtos...</div>
        <div v-else class="product-grid">
          <ProductCard
            v-for="product in paginatedProducts"
            :key="product.id"
            :product="product"
          />
        </div>

        <div v-if="!loading && filteredProducts.length" class="pagination">
          <button @click="prevPage" :disabled="currentPage === 1">⬅</button>
          <span>Página {{ currentPage }} de {{ totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage === totalPages">➡</button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import ProductCard from '../components/ProductCard.vue'
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

watch(search, () => {
  currentPage.value = 1
})

onMounted(async () => {
  try {
    const [productsRes, categoriesRes] = await Promise.all([
      axios.get('https://api.escuelajs.co/api/v1/products'),
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
.home-page {
  display: flex;
  flex-direction: column;
}

.main-content {
  display: flex;
  gap: 20px;
}

.sidebar {
  width: 200px;
  padding: 10px;
  background-color: var(--sidebar-bg);
  border-right: 1px solid #ddd;
}

.sidebar h2 {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.sidebar ul {
  list-style: none;
  padding-left: 0;
}

.sidebar li {
  margin-bottom: 8px;
}

.sidebar a {
  color: var(--text-color);
  text-decoration: none;
  font-weight: bold;
}

.product-section {
  flex: 1;
  padding: 20px;
}

.search-bar {
  margin-bottom: 20px;
  margin-right: 20px;
}

.search-bar input {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
}

.pagination button {
  padding: 5px 10px;
  border: none;
  background-color: var(--primary-color);
  color: #607d8b;
  border-radius: 4px;
  cursor: pointer;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.category-item{
  border-bottom: 1px solid #ddd;
  padding: 15px 0;
}

</style>
