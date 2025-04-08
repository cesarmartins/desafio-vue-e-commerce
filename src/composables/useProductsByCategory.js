// composables/useProductsByCategory.js
import { ref } from 'vue'
import { getProductsByCategoryId } from '../services/api'

export function useProductsByCategory() {
    const products = ref([])
    const loading = ref(false)
    const error = ref(null)

    async function fetchByCategoryId(id) {
        loading.value = true
        try {
            products.value = await getProductsByCategoryId(id)
        } catch (err) {
            error.value = err
        } finally {
            loading.value = false
        }
    }

    return { products, loading, error, fetchByCategoryId }
}
