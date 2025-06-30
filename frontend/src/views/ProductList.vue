<template>
  <div class="max-w-4xl mx-auto p-4">
    <h1 class="text-2xl font-semibold mb-4">Products</h1>
    
    <table style="width: 100%; border-collapse: collapse; border: 1px solid #ccc;">
      <thead>
        <tr style="background-color: #f0f0f0;">
          <th style="border: 1px solid #ccc; padding: 8px;">No</th>
          <th style="border: 1px solid #ccc; padding: 8px;">Name</th>
          <th style="border: 1px solid #ccc; padding: 8px;">Quantity</th>
          <th style="border: 1px solid #ccc; padding: 8px;">SKU</th>
          <th style="border: 1px solid #ccc; padding: 8px;">Description</th>
          <th style="border: 1px solid #ccc; padding: 8px;">Category</th>
          <th style="border: 1px solid #ccc; padding: 8px;">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in products" :key="product.id">
          <td style="border: 1px solid #ccc; padding: 8px;">{{ index + 1 }}</td>
          <td style="border: 1px solid #ccc; padding: 8px;">
            <template v-if="editingId === product.id">
              <input v-model="editedProduct.name" />
            </template>
            <template v-else>
              {{ product.name }}
            </template>
          </td>
          <td style="border: 1px solid #ccc; padding: 8px;">
            <template v-if="editingId === product.id">
              <input type="number" v-model="editedProduct.quantity" />
            </template>
            <template v-else>
              {{ product.quantity }}
            </template>
          </td>
          <td style="border: 1px solid #ccc; padding: 8px;">
            <template v-if="editingId === product.id">
              <input v-model="editedProduct.sku" />
            </template>
            <template v-else>
              {{ product.sku }}
            </template>
          </td>
          <td style="border: 1px solid #ccc; padding: 8px;">
            <template v-if="editingId === product.id">
              <input v-model="editedProduct.description" />
            </template>
            <template v-else>
              {{ product.description }}
            </template>
          </td>
          <td style="border: 1px solid #ccc; padding: 8px;">
            <template v-if="editingId === product.id">
              <input v-model="editedProduct.category" />
            </template>
            <template v-else>
              {{ product.category }}
            </template>
          </td>
          <td style="border: 1px solid #ccc; padding: 8px;">
            <template v-if="editingId === product.id">
              <button @click="updateProduct(product.id)" style="color: green;">Save</button>
              <button @click="cancelEditing" style="color: gray;">Cancel</button>
            </template>
            <template v-else>
              <button @click="startEditing(product)" style="color: orange;">Edit</button>
              <button @click="deleteProduct(product.id)" style="color: red;">Delete</button>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const products = ref([]);
const editingId = ref(null); // ID of the product currently being edited
const editedProduct = ref({}); // Temp storage for edited fields

onMounted(async () => {
  const response = await axios.get('http://localhost:8000/api/products/');
  products.value = response.data;
});

function deleteProduct(id) {
  if (!confirm('Are you sure you want to delete this product?')) return;

  axios.delete(`http://localhost:8000/api/products/${id}/`)
    .then(() => {
      products.value = products.value.filter(product => product.id !== id);
      alert('Product deleted!');
    })
    .catch(error => {
      console.error('Delete error:', error.response?.data || error.message);
      alert('Failed to delete product.');
    });
}

function startEditing(product) {
  editingId.value = product.id;
  editedProduct.value = { ...product }; // clone the original product
}

function cancelEditing() {
  editingId.value = null;
  editedProduct.value = {};
}

function updateProduct(id) {
  axios.put(`http://localhost:8000/api/products/${id}/`, editedProduct.value)
    .then(response => {
      const index = products.value.findIndex(p => p.id === id);
      products.value[index] = response.data;
      editingId.value = null;
      editedProduct.value = {};
      alert('Product updated!');
    })
    .catch(error => {
      console.error('Update error:', error.response?.data || error.message);
      alert('Failed to update product.');
    });
}
</script>

