<template>
  <div>
    <v-btn
      v-if="!authStore.isAuthenticated"
      size="large"
      color="primary"
      block
      rounded="lg"
      elevation="2"
      height="56"
      class="text-white mb-8 btn-animate"
      prepend-icon="mdi-microsoft"
      :disabled="authStore.loading"
      @click="login"
    >
      Iniciar sesión
    </v-btn>

    <v-card v-else flat class="mb-8 pa-4 rounded-lg bg-grey-lighten-5 border-none">
      <v-row align="center" justify="center" no-gutters>
        <v-col cols="12" class="text-center mb-2">
          <v-avatar color="primary" size="48" class="mb-3">
            <span class="text-white">{{ authStore.userInitials }}</span>
          </v-avatar>

          <div class="text-subtitle-2 text-medium-emphasis mb-4">
            {{ authStore.userEmail }}
          </div>

          <v-btn
            @click="logout"
            :disabled="authStore.loading"
            variant="outlined"
            color="primary"
            rounded="lg"
            size="small"
            prepend-icon="mdi-logout"
            class="px-4"
          >
            Cerrar sesión
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
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
.btn-animate {
  transition: all 0.2s ease;
}

.btn-animate:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(4, 60, 92, 0.3) !important;
}
</style>
