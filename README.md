# 🛒 Vue E-Commerce - Technical Challenge

![Vue](https://img.shields.io/badge/Vue-3-42b883?logo=vuedotjs)
![Vite](https://img.shields.io/badge/Vite-Bundler-646CFF?logo=vite)
![Pinia](https://img.shields.io/badge/Pinia-State_Management-FFD859?logo=pinia)
![Status](https://img.shields.io/badge/Status-Stable-2ECC71)

E-commerce project built with Vue 3, featuring product listings, favorites system, dark mode, and integration with the [Platzi Fake Store API](https://fakeapi.platzi.com).  

## 🚀 Key Features

- Product search and filtering
- Favorites system with LocalStorage persistence
- Recently viewed products
- Dark/Light theme toggle
- Paginated category pages
- Responsive design

## ⚙️ Technologies Used

- **Core Framework**: Vue 3 + Composition API
- **Build Tool**: Vite
- **State Management**: Pinia
- **Routing**: Vue Router
- **HTTP Client**: Axios
- **API Integration**: Platzi Fake Store API
- **Styling**: Pure CSS

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/vue-ecommerce.git
```
2. Navigate to the project directory:
```bash 
cd vue-ecommerce
```
3. Install dependencies:
```bash
npm install
```
4. Start the development server:
```bash
npm run dev
```

## ✨ Core Functionality

### 🏠 Home Page
- Product search by title
- Category listings
- Recently viewed products section
- Quick-access favorites

### 📂 Category Pages
- Paginated product listings
- Direct access from homepage
- Breadcrumb navigation

### 🛍️ Product Details
- Full product specifications
- High-resolution images
- Price tracking
- Favorite toggle

### ❤️ Favorites Page
- Persistent favorites storage
- Empty state handling
- Individual item removal

## ⚡ Bonus Features
- 🌓 Dark Mode with LocalStorage persistence
- ⏳ Loading states with spinners
- 🚨 Empty search/category handling

## 📁 Project Structure
```
src/
├── pages/          # Route components
├── components/     # Reusable components
├── stores/         # Pinia stores
│   └── productStore.js
├── composables/    # Composable logic
├── router/         # Vue Router configuration
└── assets/         # Static files 
``` 


Built with ❤️ by César Martins 