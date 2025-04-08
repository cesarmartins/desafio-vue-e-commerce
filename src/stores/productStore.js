// src/stores/productStore.js
import { defineStore } from 'pinia'

export const useProductStore = defineStore('productStore', {
  state: () => ({
    favorites: [],
    lastVisited: []
  }),

  actions: {

    toggleFavorite(product) {
      const exists = this.favorites.find(p => p.id === product.id)

      if (exists) {
        // Remove o item
        this.favorites = this.favorites.filter(p => p.id !== product.id)
      } else {
        // Adiciona no topo e limita a 5 (se quiser)
        this.favorites = [
          product,
          ...this.favorites.filter(p => p.id !== product.id)
        ].slice(0, 5)
      }
    },

    addLastVisited(product) {
      this.lastVisited = [
        product,
        ...this.lastVisited.filter(p => p.id !== product.id)
      ].slice(0, 5)
    },

    isFavorite(id) {
      return this.favorites.some(p => p.id === id)
    }
  },

  persist: true
})
