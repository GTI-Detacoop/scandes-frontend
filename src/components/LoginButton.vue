<template>
  <div class="auth-container">
    <button
      v-if="!authStore.isAuthenticated"
      @click="login"
      :disabled="authStore.loading"
      class="login-button"
    >
      <span v-if="authStore.loading">Iniciando sesión...</span>
      <span v-else>Iniciar sesión con Microsoft</span>
    </button>

    <div v-else class="user-info">
      <div class="user-profile">
        <span class="user-name">{{ authStore.userName }}</span>
        <span class="user-email">{{ authStore.userEmail }}</span>
      </div>
      <button @click="logout" :disabled="authStore.loading" class="logout-button">
        Cerrar sesión
      </button>
    </div>

    <p v-if="authStore.error" class="error-message">
      {{ authStore.error.message }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { onMounted } from 'vue'

const authStore = useAuthStore()

const login = async () => {
  try {
    await authStore.loginRedirect()
  } catch (error) {
    console.error('Error de inicio de sesión:', error)
  }
}

const logout = async () => {
  try {
    await authStore.logoutRedirect()
  } catch (error) {
    console.error('Error de cierre de sesión:', error)
  }
}

onMounted(async () => {
  try {
    await authStore.initialize()
    await authStore.handleRedirectCallback()
  } catch (error) {
    console.error('Error al inicializar la autenticación:', error)
  }
})
</script>

<style scoped>
.auth-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem 0;
}

.login-button,
.logout-button {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition:
    background-color 0.2s,
    box-shadow 0.2s;
}

.login-button {
  background-color: #0078d4; /* Color de Microsoft */
  color: white;
  border: none;
}

.login-button:hover {
  background-color: #106ebe;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.logout-button {
  background-color: transparent;
  color: #333;
  border: 1px solid #ccc;
}

.logout-button:hover {
  background-color: #f5f5f5;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.user-profile {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: 500;
}

.user-email {
  font-size: 0.85rem;
  color: #666;
}

.error-message {
  color: #d32f2f;
  margin-top: 0.5rem;
  font-size: 0.85rem;
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
