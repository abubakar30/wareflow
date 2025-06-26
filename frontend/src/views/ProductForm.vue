<template>
  <form @submit.prevent="handleSubmit" class="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-md space-y-4">
    <h2 class="text-2xl font-semibold text-gray-800">Add Product</h2>

    <!-- Name -->
    <div>
      <label for="name" class="block font-medium text-gray-700">Product Name</label>
      <input v-model="form.name" id="name" type="text" class="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
    </div>

    <!-- SKU -->
    <div>
      <label for="sku" class="block font-medium text-gray-700">SKU</label>
      <input v-model="form.sku" id="sku" type="text" class="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
    </div>

    <!-- Category -->
    <div>
      <label for="category" class="block font-medium text-gray-700">Category</label>
      <input v-model="form.category" id="category" type="text" class="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
    </div>

    <!-- Quantity -->
    <div>
      <label for="quantity" class="block font-medium text-gray-700">Quantity</label>
      <input v-model.number="form.quantity" id="quantity" type="number" min="0" class="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
    </div>

    <!-- Description -->
    <div>
      <label for="description" class="block font-medium text-gray-700">Description</label>
      <textarea v-model="form.description" id="description" rows="4" class="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"></textarea>
    </div>

    <!-- Submit Button -->
    <div class="pt-4">
      <button type="submit" class="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Submit</button>
    </div>
  </form>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  name: '',
  sku: '',
  category: '',
  quantity: 0,
  description: ''
})

function handleSubmit() {
  // Send form data to API or parent component
  console.log('Form submitted:', form)
  alert('Product submitted!')
}
</script>

<style scoped>
/* You can remove this if you're using Tailwind globally */
</style>
