<template>
  <div :class="['app-layout', { 'no-sidebar': !isLoggedIn }]">
    <!-- Sidebar (visible only if logged in) -->
    <aside class="sidebar" v-if="isLoggedIn">
      <RouterLink to="/" class="nav-link">Wareflow</RouterLink>
      <RouterLink to="/add-product" class="nav-link">Add Inventory</RouterLink>
      <RouterLink to="/view-product" class="nav-link">List of Inventory</RouterLink>
      <button v-if="isLoggedIn" @click="logout" class="logout-btn">Logout</button>
    </aside>

    <!-- Main Content -->
    <div class="main-content">
      <!-- Main View -->
      <main class="content-area">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const router = useRouter()

const isLoggedIn = computed(() => !!localStorage.getItem('token'))

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('refreshToken')
  router.push('/login')
}
</script>

<style scoped>
/* Base layout with sidebar */
.app-layout {
  display: grid;
  grid-template-columns: 220px 1fr;
  grid-template-rows: 60px 1fr;
  grid-template-areas:
    "sidebar topbar"
    "sidebar content";
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

/* Layout without sidebar */
.app-layout.no-sidebar {
  grid-template-columns: 1fr;
  grid-template-areas:
    "topbar"
    "content";
}

/* Sidebar */
.sidebar {
  grid-area: sidebar;
  background-color: #f5f5f5;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #ddd;
}

/* Topbar */
.topbar {
  grid-area: topbar;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 1rem;
}

/* Main content */
.main-content {
  grid-area: content;
  display: flex;
  justify-content: center; /* center horizontally */
  align-items: center;     /* center vertically */
  padding: 2rem;
  overflow-y: auto;
}

/* Logout button */
.logout-btn {
  background: none;
  border: 1px solid red;
  color: red;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
}

.logout-btn:hover {
  background-color: #ffe6e6;
}
</style>
