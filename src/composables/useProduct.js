// composables/useProduct.js
import { ref } from 'vue'
import { getProductById } from '../services/api'

export function useProduct() {
    const product = ref(null)
    const loading = ref(false)
    const error = ref(null)

    async function fetchProduct(id) {
        loading.value = true
        try {
            product.value = await getProductById(id)
        } catch (err) {
            error.value = err
        } finally {
            loading.value = false
        }
    }

    return { product, loading, error, fetchProduct }
}
