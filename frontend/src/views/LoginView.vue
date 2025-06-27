<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
    <h2 class="text-2xl font-bold mb-4 text-center">Login</h2>

    <form @submit.prevent="handleLogin">
      <div class="mb-4">
        <label for="username" class="block font-semibold mb-1">Username</label>
        <input v-model="username" id="username" class="w-full border rounded px-3 py-2" type="text" required />
      </div>

      <div class="mb-4">
        <label for="password" class="block font-semibold mb-1">Password</label>
        <input v-model="password" id="password" class="w-full border rounded px-3 py-2" type="password" required />
      </div>

      <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Login
      </button>
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
