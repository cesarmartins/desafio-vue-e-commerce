<template>
  <header class="site-header">
    <RouterLink to="/" class="logo">🛍️ Vue E-Commerce</RouterLink>
    <nav class="nav">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/favorites">Favoritos</RouterLink>
      <button @click="toggleDarkMode" class="dark-btn">
        {{ isDark ? '🌞' : '🌙' }}
      </button>
    </nav>
  </header>
</template>

<script setup>
import { useThemeStore } from '../../stores/themeStore'
const theme = useThemeStore()
const toggleDarkMode = () => theme.toggle()
const isDark = theme.isDark
console.log(isDark)
</script>

<style scoped>
.site-header {
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: var(--card-bg);
  position: sticky;
  top: 0;
  z-index: 1000;
  align-items: center;
}
.logo {
  font-weight: bold;
  font-size: 1.3rem;
  color: var(--primary);
}
.nav {
  display: flex;
  gap: 1.2rem;
  align-items: center;
}
.dark-btn {
  border: none;
  background: var(--bg);
  color: var(--text);
  font-size: 1.1rem;
  cursor: pointer;
}
</style>