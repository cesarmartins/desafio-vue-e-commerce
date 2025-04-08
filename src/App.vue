<template>
  <div class="layout">
    <Header />
    <div class="main-content">
      <aside class="sidebar">
        <Categories />
      </aside>
      <main class="page-content">
        <RouterView />
      </main>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Header from './components/layout/Header.vue'
import Footer from './components/layout/Footer.vue'
import Categories from "./components/layout/Categories.vue";
</script>

<style>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  display: flex;
  flex: 1;
}

.sidebar {
  width: 240px;
  padding: 1rem;
  border-right: 1px solid #ddd;
}

.page-content {
  flex: 1;
  padding: 1rem;
}
</style>