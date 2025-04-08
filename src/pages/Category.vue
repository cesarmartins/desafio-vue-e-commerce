<template>
  <div class="page-layout">
    <h2>Categorias - {{ categoryName }}</h2>

    <section class="products">
      <div class="product-grid">
        <ProductCard
            v-for="product in products"
            :key="product.id"
            :product="product"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import ProductCard from '../components/ProductCard.vue'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getProductsByCategory, getAllCategories } from '../services/api'
import '../assets/css/main.css'

const route = useRoute()
const categoryName = ref(route.params.name)
const categoryId = ref(null)
const products = ref([])
const loading = ref(true)

async function fetchCategoryIdByName(name) {
  try {
    const categories = await getAllCategories()
    const found = categories.find(cat => cat.name.toLowerCase() === name.toLowerCase())
    if (!found) throw new Error('Categoria não encontrada')
    categoryId.value = found.id
  } catch (err) {
    console.error('Erro ao buscar categorias:', err)
  }
}

async function fetchProducts() {
  if (!categoryId.value) return
  loading.value = true
  try {
    const data = await getProductsByCategory(categoryId.value)
    products.value = data
  } catch (err) {
    console.error('Erro ao buscar produtos:', err)
  } finally {
    loading.value = false
  }
}

watch(() => route.params.name, async (newName) => {
  categoryName.value = newName
  await fetchCategoryIdByName(newName)
  await fetchProducts()
}, { immediate: true })
</script>
