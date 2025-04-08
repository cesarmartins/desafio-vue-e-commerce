<template>
  <h2 style="padding: 15px 0;border-bottom: 1px solid #ddd;">Categorias</h2>
  <ul>
    <li v-for="cat in categories" :key="cat.id" class="category-item" :class="{ active: route.params.name === cat.name }">
      <RouterLink :to="`/category/${cat.name}`">{{ cat.name }}</RouterLink>
    </li>
  </ul>
</template>

<script setup>
import {useCategories} from "../../composables/useCategories.js";
import {onMounted} from "vue";
import '../../assets/css/main.css'

import { useRoute } from 'vue-router'
const route = useRoute()

const { categories, fetchCategories } = useCategories()


onMounted(async () => {
  try {
    fetchCategories()
  } catch (err) {
    console.error('Erro ao buscar dados', err)
  } finally {
    loading.value = false
  }
})

</script>
<style scoped>

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
.category-item{
  border-bottom: 1px solid #ddd;
  padding: 15px 0;
}
.category-item {
  border-bottom: 1px solid #ddd;
  padding: 15px 0;
  transition: background-color 0.3s;
}

.category-item.active {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>