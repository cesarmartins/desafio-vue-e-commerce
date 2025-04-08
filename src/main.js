import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/css/main.css'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)

import { useThemeStore } from './stores/themeStore'
useThemeStore().init() // aplica o tema salvo

app.mount('#app')
