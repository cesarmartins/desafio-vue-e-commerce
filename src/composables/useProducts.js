import { ref } from 'vue'
import { getProducts } from '../services/api'

export function useProducts() {
    const products = ref([])
    const loading = ref(false)
    const error = ref(null)

    async function fetchAllProducts() {
        loading.value = true
        error.value = null

        try {
            const response = await getProducts()
            products.value = response
        } catch (err) {
            console.error('Erro ao buscar produtos:', err)
            error.value = err
        } finally {
            loading.value = false
        }
    }

    return {
        products,
        loading,
        error,
        fetchAllProducts
    }
}
