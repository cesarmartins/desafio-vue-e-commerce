import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDark: false
  }),
  actions: {
    toggle() {
      this.isDark = !this.isDark
      document.documentElement.classList.toggle('dark', this.isDark)
      localStorage.setItem('isDark', this.isDark)
    },
    init() {
      const saved = localStorage.getItem('isDark')
      this.isDark = saved === 'true'
      document.documentElement.classList.toggle('dark', this.isDark)
    }
  }
})
