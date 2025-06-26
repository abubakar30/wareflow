<template>
  <div>
    <h1>Products</h1>
    <ul v-if="products.length">
      <li v-for="product in products" :key="product.id">
        {{ product.name }} ({{ product.quantity }})
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../services/api.js';

const products = ref([]);

onMounted(async () => {
  const response = await api.get('products/');
  products.value = response.data;
});
</script>