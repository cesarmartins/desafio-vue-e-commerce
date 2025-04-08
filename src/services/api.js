// src/services/api.js
import axios from 'axios'

const API_BASE = 'https://api.escuelajs.co/api/v1'

export async function getProducts() {
    const { data } = await axios.get(`${API_BASE}/products?offset=0&limit=50`)
    return data
}

export async function getAllCategories() {
    const { data } = await axios.get(`${API_BASE}/categories`)
    return data
}

export async function getProductsByCategory(id) {
    const { data: products } = await axios.get(`${API_BASE}/products/?categoryId=${id}`)
    return products
}

export const getProductById = (id) =>
    axios.get(`${API_BASE}/products/${id}`)


