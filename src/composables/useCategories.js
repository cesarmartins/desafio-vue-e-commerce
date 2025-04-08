// composables/useCategories.js
import { ref } from 'vue'
import { getAllCategories } from '../services/api'

export function useCategories() {
    const categories = ref([])
    const loading = ref(false)
    const error = ref(null)

    async function fetchCategories() {
        loading.value = true
        try {
            categories.value = await getAllCategories()
        } catch (err) {
            error.value = err
        } finally {
            loading.value = false
        }
    }

    return { categories, loading, error, fetchCategories }
}
