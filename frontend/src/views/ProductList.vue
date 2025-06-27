<template>
  <div class="max-w-4xl mx-auto p-4">
    <h1 class="text-2xl font-semibold mb-4">Products</h1>
    
    <table class="w-full table-auto border-collapse border border-gray-300">
      <thead>
        <tr class="bg-gray-100">
          <th class="border border-gray-300 px-4 py-2 text-left">Name</th>
          <th class="border border-gray-300 px-4 py-2 text-left">Quantity</th>
          <th class="border border-gray-300 px-4 py-2 text-left">SKU</th>
          <th class="border border-gray-300 px-4 py-2 text-left">Description</th>
          <th class="border border-gray-300 px-4 py-2 text-left">Category</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td class="border border-gray-300 px-4 py-2">{{ product.name }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ product.quantity }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ product.sku }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ product.description }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ product.category }}</td>
        </tr>
      </tbody>
    </table>
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
