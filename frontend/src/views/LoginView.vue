<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
    <h2 class="text-2xl font-bold mb-4 text-center">Login</h2>

    <form @submit.prevent="handleLogin">

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

      <div class="form-group">
        <label for="username">Username</label>
        <input v-model="username" id="username" class="input-field" required />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input v-model="password" id="password" class="input-field" type="password" required />
      </div>

      <div class="form-actions">
        <button type="submit" class="submit-btn">Login</button>
      </div>
    </form>

    <p v-if="error" class="text-red-500 mt-4">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const error = ref(null)

const router = useRouter()

const handleLogin = async () => {
  error.value = null
  try {
    const response = await axios.post('http://localhost:8000/api/token/', {
      username: username.value,
      password: password.value,
    })

    const token = response.data.access
    const refresh = response.data.refresh

    localStorage.setItem('token', token)
    localStorage.setItem('refreshToken', refresh)

    router.push('/view-product') // Redirect to protected route
  } catch (err) {
    error.value = 'Invalid credentials. Please try again.'
  }
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