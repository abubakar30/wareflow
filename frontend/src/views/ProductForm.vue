<template>
  <div class="form-wrapper">
    <form @submit.prevent="handleSubmit" class="form-box">
      <h2 class="form-title">ADD PRODUCT</h2>

      <div class="form-group" v-for="(label, key) in labels" :key="key">
        <label :for="key">{{ label }}</label>
        <input
          v-if="key !== 'description'"
          v-model="form[key]"
          :id="key"
          type="text"
          class="input-field"
          required
        />
        <textarea
          v-else
          v-model="form.description"
          id="description"
          rows="3"
          class="input-field"
        />
      </div>

      <div class="form-actions">
        <button type="submit" class="submit-btn">Submit</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import axios from 'axios'

const form = reactive({
  name: '',
  sku: '',
  category: '',
  quantity: '',
  description: ''
})

const labels = {
  name: 'Product Name',
  sku: 'SKU',
  category: 'Category',
  quantity: 'Quantity',
  description: 'Description'
}

function handleSubmit() {
  axios.post('http://localhost:8000/api/products/', form)
    .then(res => {
      alert('Product submitted!')
      console.log(res.data)
    })
    .catch(err => {
      alert('Submission failed.')
      console.error(err)
    })
}
</script>

<style scoped>
.form-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}

.form-box {
  width: 100%;
  max-width: 800px;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 2rem;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 1rem;
}

.input-field {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #aaa;
  border-radius: 4px;
}

.form-actions {
  text-align: right;
}

.submit-btn {
  background-color: #007BFF;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #0056b3;
}
</style>